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
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const prisma_service_1 = require("../../common/prisma.service");
let TripsService = class TripsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query, page = 1, limit = 10, is_highlight) {
        const lang = nestjs_i18n_1.I18nContext.current()?.lang;
        const skip = (page - 1) * limit;
        const whereClause = {};
        if (typeof is_highlight === 'boolean') {
            whereClause.is_highlight = is_highlight;
        }
        whereClause.is_active = true;
        const [trips, total] = await this.prisma.$transaction([
            this.prisma.trip.findMany({
                skip: skip,
                take: limit,
                include: {
                    translations: {
                        where: {
                            language_code: lang,
                        },
                    },
                    images: {
                        select: {
                            url: true,
                        },
                        take: 1,
                    },
                },
                where: whereClause,
                orderBy: {
                    id: 'desc',
                },
            }),
            this.prisma.trip.count(),
        ]);
        const formattedTrips = trips.map(trip => {
            const translation = trip.translations[0];
            return {
                id: trip.id,
                price: trip.price,
                discount: trip.discount,
                book_url: trip.book_url,
                is_highlight: trip.is_highlight,
                is_active: trip.is_active,
                title: translation?.title || null,
                description: translation?.description || null,
                location: translation?.location || null,
                image: trip.images.length > 0 ? trip.images[0].url : null,
            };
        });
        return {
            pagination: {
                total: total,
                page: page,
                limit: limit,
            },
            data: formattedTrips,
        };
    }
    async findOne(query, id) {
        const lang = nestjs_i18n_1.I18nContext.current()?.lang;
        const tripRaw = await this.prisma.trip.findUnique({
            where: { id },
            select: {
                id: true,
                price: true,
                discount: true,
                book_url: true,
                is_highlight: true,
                is_active: true,
                latitude: true,
                longitude: true,
                translations: {
                    select: {
                        title: true,
                        description: true,
                        location: true,
                    },
                    where: {
                        language_code: lang,
                    },
                },
                images: {
                    select: {
                        id: true,
                        url: true,
                    },
                },
                facilities: {
                    select: {
                        id: true,
                        translations: {
                            select: {
                                name: true,
                            },
                            where: {
                                language_code: lang,
                            },
                        },
                    },
                },
                itinerary: {
                    select: {
                        id: true,
                        time: true,
                        translations: {
                            select: {
                                activity: true,
                            },
                            where: {
                                language_code: lang,
                            },
                        },
                    },
                },
                terms: {
                    select: {
                        id: true,
                        translations: {
                            select: {
                                description: true,
                            },
                            where: {
                                language_code: lang,
                            },
                        },
                    },
                },
                testimonies: {
                    select: {
                        id: true,
                        token: true,
                        status: true,
                        expiresAt: true,
                        testimony: {
                            select: {
                                id: true,
                                author: true,
                                testimony: true,
                                is_shown: true,
                                created_at: true
                            }
                        }
                    }
                },
            },
        });
        if (!tripRaw) {
            throw new common_1.NotFoundException(`Trip with ID ${id} not found`);
        }
        if (tripRaw.is_active === false) {
            throw new common_1.NotFoundException(`Trip is no longer active`);
        }
        const trip = {
            id: tripRaw.id,
            title: tripRaw.translations?.[0]?.title ?? null,
            description: tripRaw.translations?.[0]?.description ?? null,
            price: tripRaw.price,
            discount: tripRaw.discount,
            book_url: tripRaw.book_url,
            location: tripRaw.translations?.[0]?.location ?? null,
            latitude: tripRaw.latitude,
            longitude: tripRaw.longitude,
            is_highlight: tripRaw.is_highlight,
            is_active: tripRaw.is_active,
            images: Array.isArray(tripRaw.images) ? tripRaw.images : [],
            facilities: Array.isArray(tripRaw.facilities)
                ? tripRaw.facilities.map(facility => ({
                    id: facility.id,
                    name: facility.translations?.[0]?.name ?? null,
                }))
                : [],
            itinerary: Array.isArray(tripRaw.itinerary)
                ? tripRaw.itinerary.map(item => ({
                    id: item.id,
                    time: item.time,
                    activity: item.translations?.[0]?.activity ?? null,
                }))
                : [],
            terms: Array.isArray(tripRaw.terms)
                ? tripRaw.terms.map(term => ({
                    id: term.id,
                    description: term.translations?.[0]?.description ?? null,
                }))
                : [],
            testimonies: Array.isArray(tripRaw.testimonies)
                ? tripRaw.testimonies
                    .filter(testimony => testimony?.testimony)
                    .map(testimony => ({
                    id: testimony.testimony.id,
                    testimony: testimony.testimony.testimony,
                    author: testimony.testimony.author,
                    created_at: testimony.testimony.created_at,
                }))
                : [],
        };
        return trip;
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TripsService);
//# sourceMappingURL=trips.service.js.map