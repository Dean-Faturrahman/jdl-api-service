import { UpdateTestimonyDto } from '../dto/update-testimony.dto';
import { PrismaService } from 'src/common/prisma.service';
import { CreateTestimonialRequestDto } from '../dto/create-testimonial-request.dto';
export declare class AdminTestimoniesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page?: number, limit?: number): Promise<{
        pagination: {
            total: number;
            page: number;
            limit: number;
        };
        testimonies: {
            id: number;
            testimony: string;
            author: string;
            is_shown: boolean;
            trip: {
                id: number;
                title: string;
                location: string;
            };
        }[];
    }>;
    findOne(id: number): Promise<{
        testimony: string;
        id: number;
        author: string;
        is_shown: boolean;
        request: {
            trip: {
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
            };
        } & {
            id: number;
            token: string;
            status: import(".prisma/client").$Enums.RequestStatus;
            expiresAt: Date;
            trip_id: number;
            createdAt: Date;
        };
    }>;
    update(id: number, updateTestimonyDto: UpdateTestimonyDto): Promise<{
        id: number;
        testimony: string;
        author: string | null;
        is_shown: boolean;
        created_at: Date;
        updated_at: Date;
        request_id: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        testimony: string;
        author: string | null;
        is_shown: boolean;
        created_at: Date;
        updated_at: Date;
        request_id: number | null;
    }>;
    generateLink(createDto: CreateTestimonialRequestDto): Promise<{
        url: string;
    }>;
}
