import { CreateQuoteDto } from '../dto/create-quote.dto';
import { UpdateQuoteDto } from '../dto/update-quote.dto';
import { PrismaService } from 'src/common/prisma.service';
export declare class AdminQuotesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createQuoteDto: CreateQuoteDto): Promise<{
        id: number;
        quotes: string;
        author: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
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
    findOne(id: number): Promise<{
        id: number;
        quotes: string;
        author: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: number, updateQuoteDto: UpdateQuoteDto): Promise<{
        id: number;
        quotes: string;
        author: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        quotes: string;
        author: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
}
