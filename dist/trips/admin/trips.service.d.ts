import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { PrismaService } from 'src/common/prisma.service';
export declare class AdminTripsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTripDto: CreateTripDto): Promise<{
        translations: {
            id: number;
            language_code: string;
            title: string;
            description: string;
            location: string;
            trip_id: number;
        }[];
        images: {
            id: number;
            url: string;
            trip_id: number;
        }[];
        facilities: ({
            translations: {
                id: number;
                language_code: string;
                name: string;
                facility_id: number;
            }[];
        } & {
            id: number;
            trip_id: number;
        })[];
        itinerary: ({
            translations: {
                id: number;
                language_code: string;
                activity: string;
                itinerary_item_id: number;
            }[];
        } & {
            id: number;
            time: string | null;
            trip_id: number;
        })[];
        terms: ({
            translations: {
                id: number;
                language_code: string;
                description: string;
                term_id: number;
            }[];
        } & {
            id: number;
            trip_id: number;
        })[];
    } & {
        id: number;
        latitude: string | null;
        longitude: string | null;
        price: number | null;
        discount: number | null;
        book_url: string | null;
        is_active: boolean;
        is_highlight: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        pagination: {
            total: number;
            page: number;
            limit: number;
        };
        data: {
            id: number;
            price: number;
            discount: number;
            book_url: string;
            is_highlight: boolean;
            is_active: boolean;
            title: string;
            description: string;
            location: string;
            image: string;
        }[];
    }>;
    findOne(id: number): Promise<{
        translations: {
            id: number;
            language_code: string;
            title: string;
            description: string;
            location: string;
        }[];
        images: {
            id: number;
            url: string;
        }[];
        facilities: {
            id: number;
            translations: {
                id: number;
                name: string;
                language_code: string;
            }[];
        }[];
        itinerary: {
            id: number;
            translations: {
                id: number;
                language_code: string;
                activity: string;
            }[];
            time: string;
        }[];
        terms: {
            id: number;
            translations: {
                id: number;
                language_code: string;
                description: string;
            }[];
        }[];
        testimonies: {
            testimony: {
                testimony: string;
                created_at: Date;
                author: string;
                is_shown: boolean;
            };
            id: number;
            status: import(".prisma/client").$Enums.RequestStatus;
            token: string;
            expiresAt: Date;
        }[];
        id: number;
        latitude: string | null;
        longitude: string | null;
        price: number | null;
        discount: number | null;
        book_url: string | null;
        is_active: boolean;
        is_highlight: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateTripDto: UpdateTripDto): Promise<{
        translations: {
            id: number;
            language_code: string;
            title: string;
            description: string;
            location: string;
            trip_id: number;
        }[];
        images: {
            id: number;
            url: string;
            trip_id: number;
        }[];
        facilities: ({
            translations: {
                id: number;
                language_code: string;
                name: string;
                facility_id: number;
            }[];
        } & {
            id: number;
            trip_id: number;
        })[];
        itinerary: ({
            translations: {
                id: number;
                language_code: string;
                activity: string;
                itinerary_item_id: number;
            }[];
        } & {
            id: number;
            time: string | null;
            trip_id: number;
        })[];
        terms: ({
            translations: {
                id: number;
                language_code: string;
                description: string;
                term_id: number;
            }[];
        } & {
            id: number;
            trip_id: number;
        })[];
    } & {
        id: number;
        latitude: string | null;
        longitude: string | null;
        price: number | null;
        discount: number | null;
        book_url: string | null;
        is_active: boolean;
        is_highlight: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        latitude: string | null;
        longitude: string | null;
        price: number | null;
        discount: number | null;
        book_url: string | null;
        is_active: boolean;
        is_highlight: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
