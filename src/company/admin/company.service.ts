import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AdminCompanyService {
  constructor(private prisma: PrismaService) { }

  async create(createCompanyDto: CreateCompanyDto) {
    const {
      company_name,
      address,
      phone,
      email,
      latitude,
      longitude,
      facebook_url,
      instagram_url,
      tiktok_url,
      translations,
      images,
    } = createCompanyDto;

    return this.prisma.companyProfile.create({
      data: {
        company_name,
        address,
        phone,
        email,
        latitude,
        longitude,
        facebook_url,
        instagram_url,
        tiktok_url,
        translations: {
          create: translations,
        },
        images: {
          create: images,
        },
      },
      include: {
        translations: true,
        images: true,
      },
    });
  }

  async find() {
    return this.prisma.companyProfile.findFirstOrThrow({
      select: {
        id: true,
        company_name: true,
        address: true,
        phone: true,
        email: true,
        latitude: true,
        longitude: true,
        facebook_url: true,
        instagram_url: true,
        tiktok_url: true,
        translations: {
          select: {
            id: true,
            language_code: true,
            background: true,
            philosophy: true,
            vision: true,
            mission: true,
            values: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    })
  }

  async update(id: number, updateCompanyProfileDto: UpdateCompanyDto) {
    const {
      company_name,
      address,
      phone,
      email,
      latitude,
      longitude,
      facebook_url,
      instagram_url,
      tiktok_url,
      translations,
      images,
    } = updateCompanyProfileDto;

    return this.prisma.$transaction(async (tx) => {
      await tx.companyProfile.update({
        where: { id },
        data: {
          company_name,
          address,
          phone,
          email,
          latitude,
          longitude,
          facebook_url,
          instagram_url,
          tiktok_url,
        },
      });

      if (translations) {
        await tx.companyProfileTranslation.deleteMany({
          where: { profile_id: id },
        });

        const translationData = translations.map((translation) => ({
          ...translation,
          profile_id: id,
        }));

        await tx.companyProfileTranslation.createMany({
          data: translationData,
        });
      }

      if (images) {
        await tx.companyImage.deleteMany({
          where: { profile_id: id },
        });

        const imageData = images.map((image) => ({
          ...image,
          profile_id: id,
        }));

        await tx.companyImage.createMany({
          data: imageData,
        });
      }

      const updatedProfile = await tx.companyProfile.findUnique({
        where: { id },
        include: {
          translations: true,
          images: true,
        },
      });

      if (!updatedProfile) {
        throw new NotFoundException(`Company Profile with ID ${id} not found`);
      }

      return updatedProfile;
    });
  }

  async remove(id: number) {
    const companyExists = await this.prisma.companyProfile.findUnique({
      where: { id },
    });

    if (!companyExists) {
      throw new NotFoundException(`Company Profile with ID ${id} not found`);
    }

    return await this.prisma.companyProfile.delete({
      where: { id },
    });
  }
}
