import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AdminGalleriesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createGalleryDto: CreateGalleryDto) {
    const { image_url, translations } = createGalleryDto;

    const createdGallery = await this.prisma.$transaction(async (tx) => {

      const newGallery = await tx.gallery.create({
        data: {
          image_url: image_url
        },
      });

      const translationData = translations.map((translation) => ({
        ...translation,
        gallery_id: newGallery.id
      }));

      await tx.galleryTranslation.createMany({
        data: translationData,
      });

      return tx.gallery.findUnique({
        where: { id: newGallery.id },
        include: {
          translations: true
        },
      });
    });

    return createdGallery;
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const galleries = await this.prisma.gallery.findMany({
      skip: skip,
      take: limit,
      include: {
        translations: {
          select: {
            language_code: true,
            description: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    })

    const total = await this.prisma.gallery.count()

    return {
      pagination: {
        total: total,
        page: page,
        limit: limit,
      },
      data: galleries,
    }
  }

  async findOne(id: number) {
    const gallery = await this.prisma.gallery.findUnique({
      include: {
        translations: {
          select: {
            language_code: true,
            description: true
          }
        }
      },
      where: { id },
    });

    if (!gallery) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }

    return gallery
  }

  async update(id: number, updateGalleryDto: UpdateGalleryDto) {
    const { image_url, translations } = updateGalleryDto;

    const existingGallery = await this.prisma.gallery.findUnique({
      where: { id },
    });

    if (!existingGallery) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }

    const updatedGallery = await this.prisma.$transaction(async (tx) => {

      await this.prisma.gallery.update({
        where: { id },
        data: {
          image_url: image_url
        },
      });

      if (translations) {
        await tx.galleryTranslation.deleteMany({
          where: { gallery_id: id },
        });

        const translationData = translations.map((translation) => ({
          ...translation,
          gallery_id: id,
        }));

        await tx.galleryTranslation.createMany({
          data: translationData,
        });
      }

      return tx.gallery.findUnique({
        where: { id },
        include: {
          translations: true,
        },
      });
    });

    return updatedGallery;
  }

  async remove(id: number) {
    const existingGallery = await this.prisma.gallery.findUnique({
      where: { id },
    });

    if (!existingGallery) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }

    return this.prisma.gallery.delete({
      where: { id },
    });
  }
}
