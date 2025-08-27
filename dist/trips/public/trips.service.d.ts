import { LanguageQueryDto } from "src/common/dto/language-query.dto";
import { PrismaService } from "src/common/prisma.service";
export declare class TripsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: LanguageQueryDto, page: number, limit: number, is_highlight: boolean): Promise<{
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
    findOne(query: LanguageQueryDto, id: number): Promise<{
        id: number;
        title: string;
        description: string;
        price: number;
        discount: number;
        book_url: string;
        location: string;
        latitude: string;
        longitude: string;
        is_highlight: boolean;
        is_active: true;
        images: {
            id: number;
            url: string;
        }[];
        facilities: {
            id: number;
            name: string;
        }[];
        itinerary: {
            id: number;
            time: string;
            activity: string;
        }[];
        terms: {
            id: number;
            description: string;
        }[];
        testimonies: {
            id: number;
            testimony: string;
            author: string;
            created_at: Date;
        }[];
    }>;
}
