import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoryDto } from '../dto/create-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class StoriesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createStoryDto: CreateStoryDto) {
    return await this.prisma.story.create({
      data: createStoryDto
    })
  }

  async findAll() {
    return await this.prisma.story.findMany({
      orderBy: {
        id: 'desc'
      }
    })
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

  async update(id: number, updateStoryDto: UpdateStoryDto) {
    const existingStory = await this.prisma.story.findUnique({
      where: { id },
    });

    if (!existingStory) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }

    return this.prisma.story.update({
      where: { id },
      data: updateStoryDto,
    });
  }

  async remove(id: number) {
    const existingStory = await this.prisma.story.findUnique({
      where: { id },
    });

    if (!existingStory) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }
    
    return this.prisma.story.delete({
      where: { id },
    });
  }
}
