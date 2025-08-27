import { PrismaService } from 'src/common/prisma.service';
export declare class TeamService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        name: string;
        role: string | null;
        photo_url: string | null;
        facebook_url: string | null;
        instagram_url: string | null;
        tiktok_url: string | null;
        linkedin_url: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
