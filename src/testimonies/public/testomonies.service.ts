import { PrismaService } from "src/common/prisma.service";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { I18nContext } from "nestjs-i18n";
import { LanguageQueryDto } from "src/common/dto/language-query.dto";
import { SubmitTestimonyDto } from "../dto/submit-testimony.dto";

@Injectable()
export class TestimoniesService {
   constructor(private readonly prisma: PrismaService) { }

   async findAll(page: number = 1, limit: number = 10) {
      const lang = I18nContext.current()?.lang;
      const skip = (page - 1) * limit;

      const testimonies = await this.prisma.testimony.findMany({
         skip: skip,
         take: limit,
         select: {
            id: true,
            author: true,
            testimony: true,
            is_shown: true,
            request: {
               select: {
                  trip: {
                     select: {
                        id: true,
                        translations: {
                           select: {
                              title: true,
                              location: true,
                           },
                           where: {
                              language_code: lang,
                           },
                        },
                     },
                  },
               }
            }
         },
         where: {
            is_shown: true,
         },
         orderBy: {
            id: 'asc',
         },
      });

      const total = await this.prisma.testimony.count();

      return {
         pagination: {
            total: total,
            page: page,
            limit: limit,
         },
         testimonies: testimonies.map(t => ({
            id: t.id,
            testimony: t.testimony,
            author: t.author,
            trip: t.request?.trip
               ? {
                  id: t.request.trip.id,
                  translations: t.request.trip.translations
               }
               : null,
         })),
      };
   }

   async verify(query: LanguageQueryDto, token: string) {
      const lang = I18nContext.current()?.lang;

      const request = await this.prisma.testimonialRequest.findUnique({
         where: { token },
         include: {
            trip: {
               include: {
                  translations: { where: { language_code: lang } },
               },
            },
         },
      });

      if (!request) {
         throw new NotFoundException('Testimonial link not found');
      }
      if (request.status !== 'PENDING') {
         throw new BadRequestException('Testimonial link has already been used');
      }
      if (new Date() > request.expiresAt) {
         throw new BadRequestException('Testimonial link has expired');
      }

      return {
         is_valid: true,
         trip_title: request.trip.translations[0]?.title || 'this trip',
      };
   }

   async submitTestimony(submitDto: SubmitTestimonyDto) {
      const { token, author, testimony } = submitDto;

      return this.prisma.$transaction(async (tx) => {
         const request = await tx.testimonialRequest.findUnique({
            where: { token },
         });

         if (!request) throw new NotFoundException('Link is not valid');
         if (request.status !== 'PENDING') throw new BadRequestException('Link has already been used');
         if (new Date() > request.expiresAt) throw new BadRequestException('Link has expired');

         const newTestimony = await tx.testimony.create({
            data: {
               author,
               testimony,
               is_shown: false,
               request_id: request.id,
            },
         });

         await tx.testimonialRequest.update({
            where: { id: request.id },
            data: { status: 'COMPLETED' },
         });

         return { message: 'Thank you, your testimony has been submitted!' };
      });
   }
}
