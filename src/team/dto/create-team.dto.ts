import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateTeamDto {
    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty' })
    name: string;

    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    photo_url?: string;

    @IsOptional()
    facebook_url?: string;

    @IsOptional()
    instagram_url?: string;

    @IsOptional()
    tiktok_url?: string;

    @IsOptional()
    linkedin_url?: string;
}
