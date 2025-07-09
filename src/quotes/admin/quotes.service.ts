import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from '../dto/create-quote.dto';
import { UpdateQuoteDto } from '../dto/update-quote.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AdminQuotesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createQuoteDto: CreateQuoteDto) {
    const { quotes, author } = createQuoteDto;

    const newQuote = await this.prisma.quote.create({
      data: {
        quotes,
        author,
      },
    });

    return this.prisma.quote.findUnique({
      where: { id: newQuote.id },
    });
  }

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

  async findOne(id: number) {
    const quote = await this.prisma.quote.findUnique({
      where: { id },
    });

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    return quote;
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto) {
    const { quotes, author } = updateQuoteDto;

    const quoteExists = await this.prisma.quote.findUnique({
      where: { id },
    });

    if (!quoteExists) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    const updatedQuote = await this.prisma.$transaction(async (tx) => {
      if (quotes) {
        await tx.quote.update({
          where: { id: id },
          data: { quotes: quotes },
        });
      }

      if (author) {
        await tx.quote.update({
          where: { id: id },
          data: { author: author },
        });
      }

      return tx.quote.findUnique({
        where: { id: id },
      });
    });

    return updatedQuote;
  }

  async remove(id: number) {
    const quote = await this.prisma.quote.findUnique({
      where: { id },
    });

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    return this.prisma.quote.delete({
      where: { id },
    });
  }
}
