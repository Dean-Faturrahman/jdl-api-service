import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoryDto } from '../dto/create-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AdminStoriesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createStoryDto: CreateStoryDto) {
    const { image_url, translations } = createStoryDto;

    const createdStory = await this.prisma.$transaction(async (tx) => {

      const newStory = await tx.story.create({
        data: {
          image_url: image_url
        },
      });

      const translationData = translations.map((translation) => ({
        ...translation,
        story_id: newStory.id
      }));

      await tx.storyTranslation.createMany({
        data: translationData,
      });

      return tx.story.findUnique({
        where: { id: newStory.id },
        include: {
          translations: true
        },
      });
    });

    return createdStory;
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const stories = await this.prisma.story.findMany({
      skip: skip,
      take: limit,
      include: {
        translations: {
          select: {
            language_code: true,
            title: true,
            content: true
          }
        }
      },
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
      data: stories,
    }
  }

  async findOne(id: number) {
    const story = await this.prisma.story.findUnique({
      include: {
       translations: {
          select: {
            language_code: true,
            title: true,
            content: true
          }
        }
      },
      where: { id },
    });

    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }

    return story
  }

  async update(id: number, updateStoryDto: UpdateStoryDto) {
    const { image_url, translations } = updateStoryDto;

    const existingStory = await this.prisma.story.findUnique({
      where: { id },
    });

    if (!existingStory) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }

    const updatedStory = await this.prisma.$transaction(async (tx) => {

      await this.prisma.story.update({
        where: { id },
        data: {
          image_url: image_url
        },
      });

      if (translations) {
        await tx.storyTranslation.deleteMany({
          where: { story_id: id },
        });

        const translationData = translations.map((translation) => ({
          ...translation,
          story_id: id,
        }));

        await tx.storyTranslation.createMany({
          data: translationData,
        });
      }

      return tx.story.findUnique({
        where: { id },
        include: {
          translations: true,
        },
      });
    });

    return updatedStory;
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
