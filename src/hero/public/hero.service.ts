import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { PrismaService } from 'src/common/prisma.service';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class HeroService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(query: LanguageQueryDto) {
    const lang = I18nContext.current()?.lang;

    const hero = await this.prisma.hero.findFirst({
      orderBy: {
        id: 'desc',
      },
      include: {
        images: true,
        translations: {
          where: {
            language_code: lang,
          },
        },
      },
    });

    if (!hero) {
      return [];
    }

    const translation = hero.translations[0];

    const data = [{
      id: hero.id,
      images: hero.images.map(img => ({
        id: img.id,
        url: img.url,
      })),
      title: translation?.title || null,
      description: translation?.description || null,
    }];

    return data;
  }

  // async findOne(id: number, query: LanguageQueryDto) {
  //   const lang = I18nContext.current()?.lang;

  //   const hero = await this.prisma.hero.findUnique({
  //     where: { id },
  //     include: {
  //       translations: {
  //         where: {
  //           language_code: lang,
  //         },
  //       },
  //     },
  //   });

  //   if (!hero) {
  //     throw new NotFoundException(`Hero dengan ID ${id} tidak ditemukan.`);
  //   }

  //   const translation = hero.translations[0];

  //   return {
  //     id: hero.id,
  //     image_url: hero.image_url,
  //     title: translation?.title || null,
  //     description: translation?.description || null,
  //   };
  // }
}
