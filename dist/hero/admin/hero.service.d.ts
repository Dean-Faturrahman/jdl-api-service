import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { PrismaService } from 'src/common/prisma.service';
export declare class AdminHeroService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createHeroDto: CreateHeroDto): Promise<{
        translations: {
            id: number;
            hero_id: number;
            language_code: string;
            title: string;
            description: string;
            created_at: Date;
            updated_at: Date;
        }[];
        images: {
            id: number;
            url: string;
            hero_id: number;
        }[];
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(): Promise<{
        translations: {
            id: number;
            hero_id: number;
            language_code: string;
            title: string;
            description: string;
            created_at: Date;
            updated_at: Date;
        }[];
        images: {
            id: number;
            url: string;
        }[];
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: number, updateHeroDto: UpdateHeroDto): Promise<{
        translations: {
            id: number;
            hero_id: number;
            language_code: string;
            title: string;
            description: string;
            created_at: Date;
            updated_at: Date;
        }[];
        images: {
            id: number;
            url: string;
            hero_id: number;
        }[];
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
    }>;
}
