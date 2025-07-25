import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestimonyDto } from '../dto/create-testimony.dto';
import { UpdateTestimonyDto } from '../dto/update-testimony.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AdminTestimoniesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTestimonyDto: CreateTestimonyDto) {
    const { testimony, author, trip_id, is_shown } = createTestimonyDto;

    const newTestimony = await this.prisma.testimony.create({
      data: {
        testimony,
        author,
        is_shown: is_shown ?? false,
        trip: {
          connect: { id: trip_id },
        },
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
                language_code: true,
                title: true,
                location: true,
              }
            }
          },
        },
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
    }
  }

  async findOne(id: number) {
    const testimony = await this.prisma.testimony.findUnique({
      where: { id },
      select: {
        id: true,
        author: true,
        testimony: true,
        is_shown: true,
        trip: true
      }
    });

    if (!testimony) {
      throw new NotFoundException(`Testimony with ID ${id} not found`);
    }

    return testimony;
  }

  async update(id: number, updateTestimonyDto: UpdateTestimonyDto) {
    const { trip_id, testimony, author, is_shown } = updateTestimonyDto;

    const exitingTestimony = await this.prisma.testimony.findUnique({
      where: { id },
    });

    if (!exitingTestimony) {
      throw new NotFoundException(`Testimony with ID ${id} not found`);
    }

    if (trip_id) {
      const existingTrip = await this.prisma.trip.findUnique({
        where: { id: trip_id },
      });

      if (!existingTrip) {
        throw new NotFoundException(`Trip with ID ${trip_id} not found`);
      }
    }

    const updatedTestimony = await this.prisma.$transaction(async (tx) => {
      if (trip_id) {
        await tx.testimony.update({
          where: { id },
          data: {
            trip: {
              connect: { id: trip_id },
            },
          },
        });
      }

      if (is_shown !== undefined) {
        await tx.testimony.update({
          where: { id },
          data: { is_shown },
        });
      }

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
