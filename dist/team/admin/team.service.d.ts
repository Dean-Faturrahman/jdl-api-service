import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { PrismaService } from 'src/common/prisma.service';
export declare class AdminTeamService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTeamMemberDto: CreateTeamDto): Promise<{
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
    }>;
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
    findOne(id: number): Promise<{
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
    }>;
    update(id: number, updateTeamDto: UpdateTeamDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
}
