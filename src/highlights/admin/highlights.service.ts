import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHighlightDto } from '../dto/create-highlight.dto';
import { UpdateHighlightDto } from '../dto/update-highlight.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AdminHighlightsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createHighlightDto: CreateHighlightDto) {
    const { title, description, image_url } = createHighlightDto;

    const newHighlight = await this.prisma.highlight.create({
      data: {
        title,
        description,
        image_url,
      },
    });

    return newHighlight;
  }

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

  async findOne(id: number) {
    const highlight = await this.prisma.highlight.findUnique({
      where: { id },
    });

    if (!highlight) {
      throw new NotFoundException(`Highlight with ID ${id} not found`);
    }

    return highlight;
  }

  async update(id: number, updateHighlightDto: UpdateHighlightDto) {
    const { title, description, image_url } = updateHighlightDto;

    const existingHighlight = await this.prisma.highlight.findUnique({
      where: { id },
    });
    if (!existingHighlight) {
      throw new NotFoundException(`Highlight with ID ${id} not found`);
    }

    const updatedHighlight = await this.prisma.$transaction(async (tx) => {
      if (title) {
        await tx.highlight.update({
          where: { id: id },
          data: { title: title },
        });
      }

      if (description) {
        await tx.highlight.update({
          where: { id: id },
          data: { description: description },
        });
      }

      if (image_url) {
        await tx.highlight.update({
          where: { id: id },
          data: { image_url: image_url },
        });
      }

      return tx.highlight.findUnique({
        where: { id: id },
      });
    });

    return updatedHighlight;
  }

  async remove(id: number) {
    const highlight = await this.prisma.highlight.findUnique({
      where: { id },
    });

    if (!highlight) {
      throw new NotFoundException(`Highlight with ID ${id} not found`);
    }
    
    return await this.prisma.highlight.delete({
      where: { id },
    });
  }
}
