import { PrismaService } from "src/common/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TestimoniesService {
   constructor(private readonly prisma: PrismaService) { }

   async findAll(page: number = 1, limit: number = 10) {
      const skip = (page - 1) * limit;

      const testimonies = await this.prisma.testimony.findMany({
         skip: skip,
         take: limit,
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
