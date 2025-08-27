import { CreateStoryDto } from '../dto/create-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { PrismaService } from 'src/common/prisma.service';
export declare class AdminStoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createStoryDto: CreateStoryDto): Promise<{
        translations: {
            id: number;
            language_code: string;
            title: string;
            content: string;
            story_id: number;
        }[];
    } & {
        id: number;
        image_url: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        pagination: {
            total: number;
            page: number;
            limit: number;
        };
        data: ({
            translations: {
                language_code: string;
                title: string;
                content: string;
            }[];
        } & {
            id: number;
            image_url: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
    findOne(id: number): Promise<{
        translations: {
            language_code: string;
            title: string;
            content: string;
        }[];
    } & {
        id: number;
        image_url: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateStoryDto: UpdateStoryDto): Promise<{
        translations: {
            id: number;
            language_code: string;
            title: string;
            content: string;
            story_id: number;
        }[];
    } & {
        id: number;
        image_url: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        image_url: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
