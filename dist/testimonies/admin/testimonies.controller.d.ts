import { HttpStatus } from '@nestjs/common';
import { AdminTestimoniesService } from './testimonies.service';
import { UpdateTestimonyDto } from '../dto/update-testimony.dto';
import { WebResponse } from 'src/model/web.model';
import { CreateTestimonialRequestDto } from '../dto/create-testimonial-request.dto';
export declare class AdminTestimoniesController {
    private readonly testimoniesService;
    constructor(testimoniesService: AdminTestimoniesService);
    generateLink(createDto: CreateTestimonialRequestDto): Promise<WebResponse<any>>;
    findAll(page: number, limit: number): Promise<WebResponse<any>>;
    findOne(id: number): Promise<WebResponse<any>>;
    update(id: number, updateTestimonyDto: UpdateTestimonyDto): Promise<WebResponse<any>>;
    remove(id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
    }>;
}
