import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { PrismaService } from 'src/common/prisma.service';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class AdminHeroService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createHeroDto: CreateHeroDto) {
    const { image_url, translations } = createHeroDto;

    const createdHero = await this.prisma.$transaction(async (tx) => {

      const newHero = await tx.hero.create({
        data: {
          image_url: image_url,
        },
      });

      const translationData = translations.map((translation) => ({
        ...translation,
        hero_id: newHero.id,
      }));

      await tx.heroTranslation.createMany({
        data: translationData,
      });

      return tx.hero.findUnique({
        where: { id: newHero.id },
        include: {
          translations: true, 
        },
      });
    });

    return createdHero;
  }

  async findAll() {
    const hero = await this.prisma.hero.findFirst({
      orderBy: {
        id: 'asc',
      },
      include: {
        translations: true,
      },
    });

    if (!hero) {
      throw new NotFoundException('Data Hero tidak ditemukan.');
    }

    return hero;
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

  async update(id: number, updateHeroDto: UpdateHeroDto) {
    const { image_url, translations } = updateHeroDto;

    const heroExists = await this.prisma.hero.findUnique({
      where: { id },
    });

    if (!heroExists) {
      throw new NotFoundException(`Hero dengan ID ${id} tidak ditemukan.`);
    }

    const updatedHero = await this.prisma.$transaction(async (tx) => {
      if (image_url) {
        await tx.hero.update({
          where: { id: id },
          data: { image_url: image_url },
        });
      }

      if (translations) {
        await tx.heroTranslation.deleteMany({
          where: { hero_id: id },
        });

        const translationData = translations.map((translation) => ({
          ...translation,
          hero_id: id,
        }));

        await tx.heroTranslation.createMany({
          data: translationData,
        });
      }

      return tx.hero.findUnique({
        where: { id },
        include: { translations: true },
      });
    });

    return updatedHero;
  }

  async remove(id: number) {
    const hero = await this.prisma.hero.findUnique({
      where: { id },
    });

    if (!hero) {
      throw new NotFoundException(`Hero dengan ID ${id} tidak ditemukan.`);
    }

    return this.prisma.hero.delete({
      where: { id },
    });
  }
}
