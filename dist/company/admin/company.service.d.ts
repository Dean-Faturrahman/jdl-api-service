import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { PrismaService } from 'src/common/prisma.service';
export declare class AdminCompanyService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCompanyDto: CreateCompanyDto): Promise<{
        translations: {
            id: number;
            language_code: string;
            philosophy: string | null;
            values: string | null;
            background: string | null;
            vision: string | null;
            mission: string | null;
            profile_id: number;
        }[];
        images: {
            id: number;
            url: string;
            profile_id: number;
        }[];
    } & {
        id: number;
        company_name: string;
        address: string | null;
        phone: string | null;
        email: string | null;
        latitude: string | null;
        longitude: string | null;
        facebook_url: string | null;
        instagram_url: string | null;
        tiktok_url: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    find(): Promise<{
        id: number;
        email: string;
        translations: {
            id: number;
            values: string;
            language_code: string;
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
    update(id: number, updateCompanyProfileDto: UpdateCompanyDto): Promise<{
        translations: {
            id: number;
            language_code: string;
            philosophy: string | null;
            values: string | null;
            background: string | null;
            vision: string | null;
            mission: string | null;
            profile_id: number;
        }[];
        images: {
            id: number;
            url: string;
            profile_id: number;
        }[];
    } & {
        id: number;
        company_name: string;
        address: string | null;
        phone: string | null;
        email: string | null;
        latitude: string | null;
        longitude: string | null;
        facebook_url: string | null;
        instagram_url: string | null;
        tiktok_url: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        company_name: string;
        address: string | null;
        phone: string | null;
        email: string | null;
        latitude: string | null;
        longitude: string | null;
        facebook_url: string | null;
        instagram_url: string | null;
        tiktok_url: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
