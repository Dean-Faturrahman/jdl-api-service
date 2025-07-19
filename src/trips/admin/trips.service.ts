import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AdminTripsService {
  constructor(private prisma: PrismaService) { }

  async create(createTripDto: CreateTripDto) {
    const {
      latitude,
      longitude,
      price,
      discount,
      is_highlight,
      is_active,
      translations,
      images,
      facilities,
      itinerary,
      terms,
    } = createTripDto;

    return this.prisma.trip.create({
      data: {
        latitude,
        longitude,
        price,
        discount,
        is_highlight,
        is_active,
        translations: {
          create: translations,
        },

        images: {
          create: images?.map(image => ({
            url: image.url,
          })),
        },

        facilities: {
          create: facilities?.map(facility => ({
            translations: {
              create: facility.translations,
            },
          })),
        },

        itinerary: {
          create: itinerary?.map(item => ({
            time: item.time,
            translations: {
              create: item.translations,
            },
          })),
        },

        terms: {
          create: terms?.map(term => ({
            translations: {
              create: term.translations,
            },
          })),
        },
      },

      include: {
        translations: true,
        images: true,
        facilities: {
          include: { translations: true },
        },
        itinerary: {
          include: { translations: true },
        },
        terms: {
          include: { translations: true },
        },
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [trips, total] = await this.prisma.$transaction([
      this.prisma.trip.findMany({
        skip: skip,
        take: limit,
        include: {
          translations: true,
          images: {
            select: {
              url: true,
            },
            take: 1,
          },
        },
        orderBy: {
          id: 'desc',
        },
      }),
      this.prisma.trip.count(),
    ]);

    const formattedTrips = trips.map(trip => {
      const translation = trip.translations[0];

      return {
        id: trip.id,
        price: trip.price,
        discount: trip.discount,
        is_highlight: trip.is_highlight,
        is_active: trip.is_active,
        title: translation?.title || null,
        description: translation?.description || null,
        location: translation?.location || null,
        image: trip.images.length > 0 ? trip.images[0].url : null,
      };
    });

    return {
      pagination: {
        total: total,
        page: page,
        limit: limit,
      },
      data: formattedTrips,
    };
  }

  async findOne(id: number) {
    const bookUrl = await this.prisma.companyProfile.findFirst({
      select: {
      book_url: true,
      },
    });

    const bookUrlValue = bookUrl && bookUrl.book_url ? bookUrl.book_url : null;

    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: {
        translations: {
          select: {
            id: true,
            language_code: true,
            title: true,
            description: true,
            location: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
          },
        },
        facilities: {
          select: {
            id: true,
            translations: {
              select: {
                id: true,
                language_code: true,
                name: true,
              },
            },
          },
        },
        itinerary: {
          select: {
            id: true,
            time: true,
            translations: {
              select: {
                id: true,
                language_code: true,
                activity: true,
              },
            },
          },
        },
        terms: {
          select: {
            id: true,
            translations: {
              select: {
                id: true,
                language_code: true,
                description: true,
              },
            },
          },
        },
        testimonies: true,
      },
    });

    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }

    return {
      ...trip,
      bookUrl: bookUrlValue,
    };
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    const {
      latitude,
      longitude,
      price,
      discount,
      is_highlight,
      is_active,
      translations,
      images,
      facilities,
      itinerary,
      terms,
    } = updateTripDto;

    const tripExists = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (!tripExists) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.trip.update({
        where: { id },
        data: {
          latitude,
          longitude,
          price,
          discount,
          is_highlight,
          is_active,
        },
      });


      if (translations) {
        await tx.tripTranslation.deleteMany({ where: { trip_id: id } });
        await tx.trip.update({
          where: { id },
          data: { translations: { create: translations } },
        });
      }

      if (images) {
        await tx.tripImage.deleteMany({ where: { trip_id: id } });
        await tx.trip.update({
          where: { id },
          data: {
            images: {
              create: images.map(image => ({
                url: image.url
              })),
            },
          },
        });
      }

      if (facilities) {
        await tx.tripFacility.deleteMany({ where: { trip_id: id } });

        for (const facility of facilities) {
          await tx.tripFacility.create({
            data: {
              trip_id: id,
              translations: {
                create: facility.translations,
              },
            },
          });
        }
      }

      if (itinerary) {
        await tx.tripItineraryItem.deleteMany({ where: { trip_id: id } });

        for (const item of itinerary) {
          await tx.tripItineraryItem.create({
            data: {
              trip_id: id,
              time: item.time,
              translations: {
                create: item.translations,
              },
            },
          });
        }
      }

      if (terms) {
        await tx.tripTerm.deleteMany({ where: { trip_id: id } });

        for (const term of terms) {
          await tx.tripTerm.create({
            data: {
              trip_id: id,
              translations: {
                create: term.translations,
              },
            },
          });
        }
      }

      return tx.trip.findUnique({
        where: { id },
        include: {
          translations: true,
          images: true,
          facilities: { include: { translations: true } },
          itinerary: { include: { translations: true } },
          terms: { include: { translations: true } },
        },
      });
    });
  }

  async remove(id: number) {
    const tripExists = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (!tripExists) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    
    return this.prisma.trip.delete({
      where: { id },
    });
  }
}
