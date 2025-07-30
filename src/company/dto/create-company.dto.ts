import { Type } from 'class-transformer';
import {
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    ValidateNested,
} from 'class-validator';
import { CreateCompanyTranslationDto } from './company-translation.dto';
import { CreateCompanyImageDto } from './compnay-image.dto';

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    company_name: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    latitude?: string;

    @IsOptional()
    @IsString()
    longitude?: string;

    @IsOptional()
    @IsUrl()
    facebook_url?: string;

    @IsOptional()
    @IsUrl()
    instagram_url?: string;

    @IsOptional()
    @IsUrl()
    tiktok_url?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCompanyTranslationDto)
    translations?: CreateCompanyTranslationDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCompanyImageDto)
    images?: CreateCompanyImageDto[];
}