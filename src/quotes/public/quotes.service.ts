import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class QuotesService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const quotes = await this.prisma.quote.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        id: 'asc',
      },
    });

    const total = await this.prisma.quote.count();

    return {
      pagination: {
        total: total,
        page: page,
        limit: limit,
      },
      quotes,
    };
  }
}
