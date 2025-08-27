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
exports.TestimoniesService = void 0;
const prisma_service_1 = require("../../common/prisma.service");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
let TestimoniesService = class TestimoniesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page = 1, limit = 10) {
        const lang = nestjs_i18n_1.I18nContext.current()?.lang;
        const skip = (page - 1) * limit;
        const testimonies = await this.prisma.testimony.findMany({
            skip: skip,
            take: limit,
            select: {
                id: true,
                author: true,
                testimony: true,
                is_shown: true,
                request: {
                    select: {
                        trip: {
                            select: {
                                id: true,
                                translations: {
                                    select: {
                                        title: true,
                                        location: true,
                                    },
                                    where: {
                                        language_code: lang,
                                    },
                                },
                            },
                        },
                    }
                }
            },
            where: {
                is_shown: true,
            },
            orderBy: {
                id: 'asc',
            },
        });
        const total = await this.prisma.testimony.count();
        return {
            pagination: {
                total: total,
                page: page,
                limit: limit,
            },
            testimonies: testimonies.map(t => ({
                id: t.id,
                testimony: t.testimony,
                author: t.author,
                trip: t.request?.trip
                    ? {
                        id: t.request.trip.id,
                        translations: t.request.trip.translations
                    }
                    : null,
            })),
        };
    }
    async verify(query, token) {
        const lang = nestjs_i18n_1.I18nContext.current()?.lang;
        const request = await this.prisma.testimonialRequest.findUnique({
            where: { token },
            include: {
                trip: {
                    include: {
                        translations: { where: { language_code: lang } },
                    },
                },
            },
        });
        if (!request) {
            throw new common_1.NotFoundException('Testimonial link not found');
        }
        if (request.status !== 'PENDING') {
            throw new common_1.BadRequestException('Testimonial link has already been used');
        }
        if (new Date() > request.expiresAt) {
            throw new common_1.BadRequestException('Testimonial link has expired');
        }
        return {
            is_valid: true,
            trip_title: request.trip.translations[0]?.title || 'this trip',
        };
    }
    async submitTestimony(submitDto) {
        const { token, author, testimony } = submitDto;
        return this.prisma.$transaction(async (tx) => {
            const request = await tx.testimonialRequest.findUnique({
                where: { token },
            });
            if (!request)
                throw new common_1.NotFoundException('Link is not valid');
            if (request.status !== 'PENDING')
                throw new common_1.BadRequestException('Link has already been used');
            if (new Date() > request.expiresAt)
                throw new common_1.BadRequestException('Link has expired');
            const newTestimony = await tx.testimony.create({
                data: {
                    author,
                    testimony,
                    is_shown: false,
                    request_id: request.id,
                },
            });
            await tx.testimonialRequest.update({
                where: { id: request.id },
                data: { status: 'COMPLETED' },
            });
            return { message: 'Thank you, your testimony has been submitted!' };
        });
    }
};
exports.TestimoniesService = TestimoniesService;
exports.TestimoniesService = TestimoniesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TestimoniesService);
//# sourceMappingURL=testomonies.service.js.map