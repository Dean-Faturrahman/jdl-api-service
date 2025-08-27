import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { PrismaService } from 'src/common/prisma.service';
export declare class AdminGalleriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createGalleryDto: CreateGalleryDto): Promise<{
        translations: {
            id: number;
            language_code: string;
            description: string;
            gallery_id: number;
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
                description: string;
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
            description: string;
        }[];
    } & {
        id: number;
        image_url: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateGalleryDto: UpdateGalleryDto): Promise<{
        translations: {
            id: number;
            language_code: string;
            description: string;
            gallery_id: number;
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
