import { HttpStatus } from '@nestjs/common';
import { AdminCompanyService } from './company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { WebResponse } from 'src/model/web.model';
export declare class AdminCompanyController {
    private readonly companyService;
    constructor(companyService: AdminCompanyService);
    create(createCompanyDto: CreateCompanyDto): Promise<WebResponse<any>>;
    find(): Promise<WebResponse<any>>;
    update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<{
        status_code: HttpStatus;
        message: string;
        data: {
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
        };
    }>;
    remove(id: number): Promise<{
        status_code: HttpStatus;
        message: string;
    }>;
}
