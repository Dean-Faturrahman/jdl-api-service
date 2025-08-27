import { PrismaService } from 'src/common/prisma.service';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';
export declare class GalleriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: LanguageQueryDto, page?: number, limit?: number): Promise<{
        pagination: {
            total: number;
            page: number;
            limit: number;
        };
        data: {
            id: number;
            image_url: string;
            description: string;
            created_at: Date;
            updated_at: Date;
        }[];
    }>;
    findOne(query: LanguageQueryDto, id: number): Promise<{
        id: number;
        image_url: string;
        description: string;
        created_at: Date;
        updated_at: Date;
    }>;
}
