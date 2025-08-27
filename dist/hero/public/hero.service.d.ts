import { PrismaService } from 'src/common/prisma.service';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';
export declare class HeroService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: LanguageQueryDto): Promise<{
        id: number;
        images: {
            id: number;
            url: string;
        }[];
        title: string;
        description: string;
    }[]>;
}
