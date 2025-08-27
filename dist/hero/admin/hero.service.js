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
exports.AdminHeroService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
let AdminHeroService = class AdminHeroService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createHeroDto) {
        const { image_url, translations } = createHeroDto;
        const createdHero = await this.prisma.$transaction(async (tx) => {
            const newHero = await tx.hero.create({
                data: {
                    images: {
                        create: image_url.map((img) => ({ url: img.url })),
                    },
                },
            });
            const translationData = translations.map((translation) => ({
                ...translation,
                hero_id: newHero.id
            }));
            await tx.heroTranslation.createMany({
                data: translationData,
            });
            return tx.hero.findUnique({
                where: { id: newHero.id },
                include: {
                    images: true,
                    translations: true,
                },
            });
        });
        return createdHero;
    }
    async findAll() {
        const hero = await this.prisma.hero.findFirst({
            orderBy: {
                id: 'desc',
            },
            include: {
                images: {
                    select: {
                        id: true,
                        url: true,
                    },
                },
                translations: true,
            },
        });
        if (!hero) {
            throw new common_1.NotFoundException('Data Hero tidak ditemukan.');
        }
        return hero;
    }
    async update(id, updateHeroDto) {
        const { image_url, translations } = updateHeroDto;
        const heroExists = await this.prisma.hero.findUnique({
            where: { id },
        });
        if (!heroExists) {
            throw new common_1.NotFoundException(`Hero dengan ID ${id} tidak ditemukan.`);
        }
        const updatedHero = await this.prisma.$transaction(async (tx) => {
            if (image_url) {
                await tx.heroImage.deleteMany({
                    where: { hero_id: id },
                });
                await tx.heroImage.createMany({
                    data: image_url.map((img) => ({
                        url: img.url,
                        hero_id: id,
                    })),
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
                include: {
                    images: true,
                    translations: true,
                },
            });
        });
        return updatedHero;
    }
    async remove(id) {
        const hero = await this.prisma.hero.findUnique({
            where: { id },
        });
        if (!hero) {
            throw new common_1.NotFoundException(`Hero dengan ID ${id} tidak ditemukan.`);
        }
        return this.prisma.hero.delete({
            where: { id },
        });
    }
};
exports.AdminHeroService = AdminHeroService;
exports.AdminHeroService = AdminHeroService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminHeroService);
//# sourceMappingURL=hero.service.js.map