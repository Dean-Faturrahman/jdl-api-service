import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";

@Injectable()
export class HighlightsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const highlights = await this.prisma.highlight.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        id: 'asc',
      },
    });

    const total = await this.prisma.highlight.count();

    return {
      pagination: {
        total: total,
        page: page,
        limit: limit,
      },
      highlights,
    };
  }
}