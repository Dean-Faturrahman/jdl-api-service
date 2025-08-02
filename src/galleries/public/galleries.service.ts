import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class GalleriesService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(query: LanguageQueryDto, page: number = 1, limit: number = 10) {
    const lang = I18nContext.current()?.lang;
    const skip = (page - 1) * limit;

     const [galleries, total] = await this.prisma.$transaction([

      this.prisma.gallery.findMany({
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
      this.prisma.gallery.count(),
    ]);

    const formattedGalleries = galleries.map(gallery => {
      const translation = gallery.translations[0];

      return {
        id: gallery.id,
        image_url: gallery.image_url,
        description: translation?.description || null,
        created_at: gallery.createdAt,
        updated_at: gallery.updatedAt
      };
    });

    return {
      pagination: {
        total: total,
        page: page,
        limit: limit,
      },
      data: formattedGalleries,
    }
  }

  async findOne(query: LanguageQueryDto, id: number) {
    const lang = I18nContext.current()?.lang;

    const galleryRaw = await this.prisma.gallery.findUnique({
      include: {
        translations: {
          select: {
            language_code: true,
            description: true
          },
          where: {
            language_code: lang
          }
        }
      },
      where: { id },
    });

    if (!galleryRaw) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }

    const gallery = {
      id: galleryRaw.id,
      image_url: galleryRaw.image_url,
      description: galleryRaw.translations[0]?.description || null,
      created_at: galleryRaw.createdAt,
      updated_at: galleryRaw.updatedAt
    }

    return gallery
  }
}
