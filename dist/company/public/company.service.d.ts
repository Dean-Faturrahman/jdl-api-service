import { LanguageQueryDto } from "src/common/dto/language-query.dto";
import { PrismaService } from "src/common/prisma.service";
export declare class CompanyService {
    private prisma;
    constructor(prisma: PrismaService);
    find(query: LanguageQueryDto): Promise<{
        id: number;
        email: string;
        translations: {
            id: number;
            values: string;
            philosophy: string;
            background: string;
            vision: string;
            mission: string;
        }[];
        images: {
            id: number;
            url: string;
        }[];
        latitude: string;
        longitude: string;
        company_name: string;
        address: string;
        phone: string;
        facebook_url: string;
        instagram_url: string;
        tiktok_url: string;
    }>;
}
