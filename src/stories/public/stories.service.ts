import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoryDto } from '../dto/create-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { PrismaService } from 'src/common/prisma.service';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class StoriesService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const stories = await this.prisma.story.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        id: 'desc'
      }
    })

    const total = await this.prisma.story.count()

    return {
      pagination: {
        total: total,
        page: page,
        limit: limit,
      },
      stories,
    }
  }

  async findOne(id: number) {
    const story = await this.prisma.story.findUnique({
      where: { id },
    });

    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }

    return story
  }
}
