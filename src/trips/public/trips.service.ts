import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { I18nContext } from "nestjs-i18n";
import { title } from "process";
import { LanguageQueryDto } from "src/common/dto/language-query.dto";
import { PrismaService } from "src/common/prisma.service";

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) { }

  async findAll(query: LanguageQueryDto, page: number = 1, limit: number = 10, is_highlight: boolean) {
    const lang = I18nContext.current()?.lang;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.TripWhereInput = {};

    if (typeof is_highlight === 'boolean') {
      whereClause.is_highlight = is_highlight;
    }
    whereClause.is_active = true
    
    const [trips, total] = await this.prisma.$transaction([

      this.prisma.trip.findMany({
        skip: skip,
        take: limit,
        include: {
          translations: {
            where: {
              language_code: lang,
            },
          },
          images: {
            select: {
              url: true,
            },
            take: 1,
          },
        },
        where: whereClause,
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
        book_url: trip.book_url,
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

  async findOne(query: LanguageQueryDto, id: number) {
    const lang = I18nContext.current()?.lang;

    const tripRaw = await this.prisma.trip.findUnique({
      where: { id },
      select: {
        id: true,
        price: true,
        discount: true,
        book_url: true,
        is_highlight: true,
        is_active: true,
        latitude: true,
        longitude: true,
        translations: {
          select: {
            title: true,
            description: true,
            location: true,
          },
          where: {
            language_code: lang,
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
                name: true,
              },
              where: {
                language_code: lang,
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
                activity: true,
              },
              where: {
                language_code: lang,
              },
            },
          },
        },
        terms: {
          select: {
            id: true,
            translations: {
              select: {
                description: true,
              },
              where: {
                language_code: lang,
              },
            },
          },
        },
        testimonies: {
          select: {
            id: true,
            author: true,
            testimony: true,
          },
        },
      },
    });

    if (!tripRaw) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }

    if (tripRaw.is_active === false) {
      throw new NotFoundException(`Trip is no longer active`);
    }

    const trip = {
      id: tripRaw.id,
      title: tripRaw.translations[0]?.title || null,
      description: tripRaw.translations[0]?.description || null,
      price: tripRaw.price,
      discount: tripRaw.discount,
      book_url: tripRaw.book_url,
      location: tripRaw.translations[0]?.location || null,
      latitude: tripRaw.latitude,
      longitude: tripRaw.longitude,
      is_highlight: tripRaw.is_highlight,
      is_active: tripRaw.is_active,
      images: tripRaw.images,
      facilities: tripRaw.facilities.map(facility => ({
        id: facility.id,
        name: facility.translations[0]?.name || null,
      })),
      itinerary: tripRaw.itinerary.map(item => ({
        id: item.id,
        time: item.time,
        activity: item.translations[0]?.activity || null,
      })),
      terms: tripRaw.terms.map(term => ({
        id: term.id,
        description: term.translations[0]?.description || null,
      })),
      testimonies: tripRaw.testimonies,
    };

    return trip;
  }
}
