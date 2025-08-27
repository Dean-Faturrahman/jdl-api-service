import { CreateCompanyTranslationDto } from './company-translation.dto';
import { CreateCompanyImageDto } from './compnay-image.dto';
export declare class CreateCompanyDto {
    company_name: string;
    address?: string;
    phone?: string;
    email?: string;
    latitude?: string;
    longitude?: string;
    facebook_url?: string;
    instagram_url?: string;
    tiktok_url?: string;
    translations?: CreateCompanyTranslationDto[];
    images?: CreateCompanyImageDto[];
}
