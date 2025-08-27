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
exports.AdminTripsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
let AdminTripsService = class AdminTripsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTripDto) {
        const { latitude, longitude, price, discount, book_url, is_highlight, is_active, translations, images, facilities, itinerary, terms, } = createTripDto;
        return this.prisma.trip.create({
            data: {
                latitude,
                longitude,
                price,
                discount,
                book_url,
                is_highlight,
                is_active,
                translations: {
                    create: translations,
                },
                images: {
                    create: images?.map(image => ({
                        url: image.url,
                    })),
                },
                facilities: {
                    create: facilities?.map(facility => ({
                        translations: {
                            create: facility.translations,
                        },
                    })),
                },
                itinerary: {
                    create: itinerary?.map(item => ({
                        time: item.time,
                        translations: {
                            create: item.translations,
                        },
                    })),
                },
                terms: {
                    create: terms?.map(term => ({
                        translations: {
                            create: term.translations,
                        },
                    })),
                },
            },
            include: {
                translations: true,
                images: true,
                facilities: {
                    include: { translations: true },
                },
                itinerary: {
                    include: { translations: true },
                },
                terms: {
                    include: { translations: true },
                },
            },
        });
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [trips, total] = await this.prisma.$transaction([
            this.prisma.trip.findMany({
                skip: skip,
                take: limit,
                include: {
                    translations: true,
                    images: {
                        select: {
                            url: true,
                        },
                        take: 1,
                    },
                },
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
    async findOne(id) {
        const trip = await this.prisma.trip.findUnique({
            where: { id },
            include: {
                translations: {
                    select: {
                        id: true,
                        language_code: true,
                        title: true,
                        description: true,
                        location: true,
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
                                id: true,
                                language_code: true,
                                name: true,
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
                                id: true,
                                language_code: true,
                                activity: true,
                            },
                        },
                    },
                },
                terms: {
                    select: {
                        id: true,
                        translations: {
                            select: {
                                id: true,
                                language_code: true,
                                description: true,
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
        if (!trip) {
            throw new common_1.NotFoundException(`Trip with ID ${id} not found`);
        }
        return {
            ...trip,
        };
    }
    async update(id, updateTripDto) {
        const { latitude, longitude, price, discount, book_url, is_highlight, is_active, translations, images, facilities, itinerary, terms, } = updateTripDto;
        const tripExists = await this.prisma.trip.findUnique({
            where: { id },
        });
        if (!tripExists) {
            throw new common_1.NotFoundException(`Trip with ID ${id} not found`);
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.trip.update({
                where: { id },
                data: {
                    latitude,
                    longitude,
                    price,
                    discount,
                    book_url,
                    is_highlight,
                    is_active,
                },
            });
            if (translations) {
                await tx.tripTranslation.deleteMany({ where: { trip_id: id } });
                await tx.trip.update({
                    where: { id },
                    data: { translations: { create: translations } },
                });
            }
            if (images) {
                await tx.tripImage.deleteMany({ where: { trip_id: id } });
                await tx.trip.update({
                    where: { id },
                    data: {
                        images: {
                            create: images.map(image => ({
                                url: image.url
                            })),
                        },
                    },
                });
            }
            if (facilities) {
                await tx.tripFacility.deleteMany({ where: { trip_id: id } });
                for (const facility of facilities) {
                    await tx.tripFacility.create({
                        data: {
                            trip_id: id,
                            translations: {
                                create: facility.translations,
                            },
                        },
                    });
                }
            }
            if (itinerary) {
                await tx.tripItineraryItem.deleteMany({ where: { trip_id: id } });
                for (const item of itinerary) {
                    await tx.tripItineraryItem.create({
                        data: {
                            trip_id: id,
                            time: item.time,
                            translations: {
                                create: item.translations,
                            },
                        },
                    });
                }
            }
            if (terms) {
                await tx.tripTerm.deleteMany({ where: { trip_id: id } });
                for (const term of terms) {
                    await tx.tripTerm.create({
                        data: {
                            trip_id: id,
                            translations: {
                                create: term.translations,
                            },
                        },
                    });
                }
            }
            return tx.trip.findUnique({
                where: { id },
                include: {
                    translations: true,
                    images: true,
                    facilities: { include: { translations: true } },
                    itinerary: { include: { translations: true } },
                    terms: { include: { translations: true } },
                },
            });
        });
    }
    async remove(id) {
        const tripExists = await this.prisma.trip.findUnique({
            where: { id },
        });
        if (!tripExists) {
            throw new common_1.NotFoundException(`Trip with ID ${id} not found`);
        }
        return this.prisma.trip.delete({
            where: { id },
        });
    }
};
exports.AdminTripsService = AdminTripsService;
exports.AdminTripsService = AdminTripsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminTripsService);
//# sourceMappingURL=trips.service.js.map