import { HttpStatus } from '@nestjs/common';
import { AdminHeroService } from './hero.service';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { WebResponse } from 'src/model/web.model';
export declare class AdminHeroController {
    private readonly heroService;
    constructor(heroService: AdminHeroService);
    create(createHeroDto: CreateHeroDto): Promise<WebResponse<any>>;
    findAll(): Promise<WebResponse<any>>;
    update(id: number, updateHeroDto: UpdateHeroDto): Promise<{
        status_code: HttpStatus;
        message: string;
        data: {
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
        };
    }>;
    remove(id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
    }>;
}
