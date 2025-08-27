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
exports.AdminStoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
let AdminStoriesService = class AdminStoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createStoryDto) {
        const { image_url, translations } = createStoryDto;
        const createdStory = await this.prisma.$transaction(async (tx) => {
            const newStory = await tx.story.create({
                data: {
                    image_url: image_url
                },
            });
            const translationData = translations.map((translation) => ({
                ...translation,
                story_id: newStory.id
            }));
            await tx.storyTranslation.createMany({
                data: translationData,
            });
            return tx.story.findUnique({
                where: { id: newStory.id },
                include: {
                    translations: true
                },
            });
        });
        return createdStory;
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const stories = await this.prisma.story.findMany({
            skip: skip,
            take: limit,
            include: {
                translations: {
                    select: {
                        language_code: true,
                        title: true,
                        content: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        });
        const total = await this.prisma.story.count();
        return {
            pagination: {
                total: total,
                page: page,
                limit: limit,
            },
            data: stories,
        };
    }
    async findOne(id) {
        const story = await this.prisma.story.findUnique({
            include: {
                translations: {
                    select: {
                        language_code: true,
                        title: true,
                        content: true
                    }
                }
            },
            where: { id },
        });
        if (!story) {
            throw new common_1.NotFoundException(`Story with ID ${id} not found`);
        }
        return story;
    }
    async update(id, updateStoryDto) {
        const { image_url, translations } = updateStoryDto;
        const existingStory = await this.prisma.story.findUnique({
            where: { id },
        });
        if (!existingStory) {
            throw new common_1.NotFoundException(`Story with ID ${id} not found`);
        }
        const updatedStory = await this.prisma.$transaction(async (tx) => {
            await this.prisma.story.update({
                where: { id },
                data: {
                    image_url: image_url
                },
            });
            if (translations) {
                await tx.storyTranslation.deleteMany({
                    where: { story_id: id },
                });
                const translationData = translations.map((translation) => ({
                    ...translation,
                    story_id: id,
                }));
                await tx.storyTranslation.createMany({
                    data: translationData,
                });
            }
            return tx.story.findUnique({
                where: { id },
                include: {
                    translations: true,
                },
            });
        });
        return updatedStory;
    }
    async remove(id) {
        const existingStory = await this.prisma.story.findUnique({
            where: { id },
        });
        if (!existingStory) {
            throw new common_1.NotFoundException(`Story with ID ${id} not found`);
        }
        return this.prisma.story.delete({
            where: { id },
        });
    }
};
exports.AdminStoriesService = AdminStoriesService;
exports.AdminStoriesService = AdminStoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminStoriesService);
//# sourceMappingURL=stories.service.js.map