import { PrismaService } from 'src/common/prisma.service';
export declare class QuotesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page?: number, limit?: number): Promise<{
        pagination: {
            total: number;
            page: number;
            limit: number;
        };
        quotes: {
            id: number;
            quotes: string;
            author: string | null;
            created_at: Date;
            updated_at: Date;
        }[];
    }>;
}
