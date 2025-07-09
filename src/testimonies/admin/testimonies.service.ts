import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestimonyDto } from '../dto/create-testimony.dto';
import { UpdateTestimonyDto } from '../dto/update-testimony.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AdminTestimoniesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTestimonyDto: CreateTestimonyDto) {
    const { testimony, author } = createTestimonyDto;

    const newTestimony = await this.prisma.testimony.create({
      data: {
        testimony,
        author,
      },
    });

    return this.prisma.testimony.findUnique({
      where: { id: newTestimony.id },
    });
  }

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

  async findOne(id: number) {
    const testimony = await this.prisma.testimony.findUnique({
      where: { id },
    });

    if (!testimony) {
      throw new NotFoundException(`Testimony with ID ${id} not found`);
    }

    return testimony;
  }

  async update(id: number, updateTestimonyDto: UpdateTestimonyDto) {
    const { testimony, author } = updateTestimonyDto;

    const exitingTestimony = await this.prisma.testimony.findUnique({
      where: { id },
    });

    if (!exitingTestimony) {
      throw new NotFoundException(`Testimony with ID ${id} not found`);
    }

    const updatedTestimony = await this.prisma.$transaction(async (tx) => {
      if (testimony) {
        await tx.testimony.update({
          where: { id },
          data: { testimony },
        });
      }

      if (author) {
        await tx.testimony.update({
          where: { id },
          data: { author },
        });
      }

      return tx.testimony.findUnique({
        where: { id },
      });
    });

    return updatedTestimony;
  }

  async remove(id: number) {
    const testimony = await this.prisma.testimony.findUnique({
      where: { id },
    });

    if (!testimony) {
      throw new NotFoundException(`Testimony with ID ${id} not found`);
    }

    return this.prisma.testimony.delete({
      where: { id },
    });;
  }
}
