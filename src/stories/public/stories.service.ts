import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { I18nContext } from 'nestjs-i18n';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';

@Injectable()
export class StoriesService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(query: LanguageQueryDto, page: number = 1, limit: number = 10) {
    const lang = I18nContext.current()?.lang;
    const skip = (page - 1) * limit;

    const [stories, total] = await this.prisma.$transaction([

      this.prisma.story.findMany({
        skip: skip,
        take: limit,
        include: {
          translations: {
            where: {
              language_code: lang,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      }),
      this.prisma.story.count(),
    ]);

    const formattedStories = stories.map(story => {
      const translation = story.translations[0];
      const content = translation?.content || null;
      // Truncate content to 200 characters if available
      const shortContent = content
        ? content.length > 200
          ? content.substring(0, 200) + '...'
          : content
        : null;

      return {
        id: story.id,
        image_url: story.image_url,
        title: translation?.title || null,
        content: shortContent,
        created_at: story.createdAt,
        updated_at: story.updatedAt
      };
    });

    return {
      pagination: {
        total: total,
        page: page,
        limit: limit,
      },
      data: formattedStories,
    };
  }

  async findOne(query: LanguageQueryDto, id: number) {
    const lang = I18nContext.current()?.lang;

    const storyRaw = await this.prisma.story.findUnique({
      include: {
        translations: {
          select: {
            language_code: true,
            title: true,
            content: true
          },
          where: {
            language_code: lang
          }
        }
      },
      where: { id },
    });

    if (!storyRaw) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }

    const story = {
      id: storyRaw.id,
      image_url: storyRaw.image_url,
      title: storyRaw.translations[0]?.title || null,
      content: storyRaw.translations[0]?.content || null,
      created_at: storyRaw.createdAt,
      updated_at: storyRaw.updatedAt
    }

    return story
  }
}
