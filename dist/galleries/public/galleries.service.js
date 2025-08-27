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
exports.GalleriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
const nestjs_i18n_1 = require("nestjs-i18n");
let GalleriesService = class GalleriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query, page = 1, limit = 10) {
        const lang = nestjs_i18n_1.I18nContext.current()?.lang;
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
        };
    }
    async findOne(query, id) {
        const lang = nestjs_i18n_1.I18nContext.current()?.lang;
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
            throw new common_1.NotFoundException(`Gallery with ID ${id} not found`);
        }
        const gallery = {
            id: galleryRaw.id,
            image_url: galleryRaw.image_url,
            description: galleryRaw.translations[0]?.description || null,
            created_at: galleryRaw.createdAt,
            updated_at: galleryRaw.updatedAt
        };
        return gallery;
    }
};
exports.GalleriesService = GalleriesService;
exports.GalleriesService = GalleriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GalleriesService);
//# sourceMappingURL=galleries.service.js.map