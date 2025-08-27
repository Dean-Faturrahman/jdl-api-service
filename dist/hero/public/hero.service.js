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
exports.HeroService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
const nestjs_i18n_1 = require("nestjs-i18n");
let HeroService = class HeroService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const lang = nestjs_i18n_1.I18nContext.current()?.lang;
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
};
exports.HeroService = HeroService;
exports.HeroService = HeroService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HeroService);
//# sourceMappingURL=hero.service.js.map