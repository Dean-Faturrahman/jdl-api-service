import { PrismaService } from "src/common/prisma.service";
import { Injectable } from "@nestjs/common";
import { I18nContext } from "nestjs-i18n";

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
         testimonies,
      };
   }
}
