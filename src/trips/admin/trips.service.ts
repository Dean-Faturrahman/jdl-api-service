import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) { }

  async create(createTripDto: CreateTripDto) {
    const {
      latitude,
      longitude,
      price,
      discount,
      isHighlight,
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
        isHighlight,

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
        isHighlight: trip.isHighlight,
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

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    return `This action updates a #${id} trip`;
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }
}
