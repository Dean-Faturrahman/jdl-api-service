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
exports.AdminTestimoniesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
const crypto_1 = require("crypto");
let AdminTestimoniesService = class AdminTestimoniesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page = 1, limit = 10) {
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
                                        language_code: 'id'
                                    }
                                }
                            },
                        },
                    }
                }
            },
            orderBy: {
                id: 'asc',
            },
        });
        const total = await this.prisma.testimony.count();
        return {
            pagination: {
                total,
                page,
                limit,
            },
            testimonies: testimonies.map(t => ({
                id: t.id,
                testimony: t.testimony,
                author: t.author,
                is_shown: t.is_shown,
                trip: t.request?.trip
                    ? {
                        id: t.request.trip.id,
                        title: t.request.trip.translations[0].title,
                        location: t.request.trip.translations[0].location,
                    }
                    : null,
            })),
        };
    }
    async findOne(id) {
        const testimony = await this.prisma.testimony.findUnique({
            where: { id },
            select: {
                id: true,
                author: true,
                testimony: true,
                is_shown: true,
                request: {
                    include: {
                        trip: true
                    }
                }
            }
        });
        if (!testimony) {
            throw new common_1.NotFoundException(`Testimony with ID ${id} not found`);
        }
        return testimony;
    }
    async update(id, updateTestimonyDto) {
        const { is_shown } = updateTestimonyDto;
        const exitingTestimony = await this.prisma.testimony.findUnique({
            where: { id },
        });
        if (!exitingTestimony) {
            throw new common_1.NotFoundException(`Testimony with ID ${id} not found`);
        }
        const updatedTestimony = await this.prisma.$transaction(async (tx) => {
            if (is_shown !== undefined) {
                await tx.testimony.update({
                    where: { id },
                    data: { is_shown },
                });
            }
            return tx.testimony.findUnique({
                where: { id },
            });
        });
        return updatedTestimony;
    }
    async remove(id) {
        const testimony = await this.prisma.testimony.findUnique({
            where: { id },
        });
        if (!testimony) {
            throw new common_1.NotFoundException(`Testimony with ID ${id} not found`);
        }
        return this.prisma.testimony.delete({
            where: { id },
        });
        ;
    }
    async generateLink(createDto) {
        const trip = await this.prisma.trip.findUnique({
            where: { id: createDto.trip_id },
        });
        if (!trip) {
            throw new common_1.NotFoundException(`Trip with ID ${createDto.trip_id} not found`);
        }
        const token = (0, crypto_1.randomBytes)(20).toString('hex');
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const request = await this.prisma.testimonialRequest.create({
            data: {
                token,
                expiresAt,
                trip_id: createDto.trip_id,
            },
        });
        const url = `https://jejakdualangkah.com/testimoni/${request.token}`;
        return { url };
    }
};
exports.AdminTestimoniesService = AdminTestimoniesService;
exports.AdminTestimoniesService = AdminTestimoniesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminTestimoniesService);
//# sourceMappingURL=testimonies.service.js.map