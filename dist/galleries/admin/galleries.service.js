"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGalleriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
let AdminGalleriesService = class AdminGalleriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createGalleryDto) {
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
    async findAll(page = 1, limit = 10) {
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
        });
        const total = await this.prisma.gallery.count();
        return {
            pagination: {
                total: total,
                page: page,
                limit: limit,
            },
            data: galleries,
        };
    }
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Gallery with ID ${id} not found`);
        }
        return gallery;
    }
    async update(id, updateGalleryDto) {
        const { image_url, translations } = updateGalleryDto;
        const existingGallery = await this.prisma.gallery.findUnique({
            where: { id },
        });
        if (!existingGallery) {
            throw new common_1.NotFoundException(`Gallery with ID ${id} not found`);
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
    async remove(id) {
        const existingGallery = await this.prisma.gallery.findUnique({
            where: { id },
        });
        if (!existingGallery) {
            throw new common_1.NotFoundException(`Gallery with ID ${id} not found`);
        }
        return this.prisma.gallery.delete({
            where: { id },
        });
    }
};
exports.AdminGalleriesService = AdminGalleriesService;
exports.AdminGalleriesService = AdminGalleriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminGalleriesService);
//# sourceMappingURL=galleries.service.js.map