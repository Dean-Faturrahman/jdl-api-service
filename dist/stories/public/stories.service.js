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
exports.StoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
const nestjs_i18n_1 = require("nestjs-i18n");
let StoriesService = class StoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query, page = 1, limit = 10) {
        const lang = nestjs_i18n_1.I18nContext.current()?.lang;
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
    async findOne(query, id) {
        const lang = nestjs_i18n_1.I18nContext.current()?.lang;
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
            throw new common_1.NotFoundException(`Story with ID ${id} not found`);
        }
        const story = {
            id: storyRaw.id,
            image_url: storyRaw.image_url,
            title: storyRaw.translations[0]?.title || null,
            content: storyRaw.translations[0]?.content || null,
            created_at: storyRaw.createdAt,
            updated_at: storyRaw.updatedAt
        };
        return story;
    }
};
exports.StoriesService = StoriesService;
exports.StoriesService = StoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StoriesService);
//# sourceMappingURL=stories.service.js.map