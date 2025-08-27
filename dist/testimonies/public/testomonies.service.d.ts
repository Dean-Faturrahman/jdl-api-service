import { PrismaService } from "src/common/prisma.service";
import { LanguageQueryDto } from "src/common/dto/language-query.dto";
import { SubmitTestimonyDto } from "../dto/submit-testimony.dto";
export declare class TestimoniesService {
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
            trip: {
                id: number;
                translations: {
                    title: string;
                    location: string;
                }[];
            };
        }[];
    }>;
    verify(query: LanguageQueryDto, token: string): Promise<{
        is_valid: boolean;
        trip_title: string;
    }>;
    submitTestimony(submitDto: SubmitTestimonyDto): Promise<{
        message: string;
    }>;
}
