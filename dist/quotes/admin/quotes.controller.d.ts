import { HttpStatus } from '@nestjs/common';
import { AdminQuotesService } from './quotes.service';
import { CreateQuoteDto } from '../dto/create-quote.dto';
import { UpdateQuoteDto } from '../dto/update-quote.dto';
import { WebResponse } from 'src/model/web.model';
export declare class AdminQuotesController {
    private readonly quotesService;
    constructor(quotesService: AdminQuotesService);
    create(createQuoteDto: CreateQuoteDto): Promise<WebResponse<any>>;
    findAll(page: number, limit: number): Promise<WebResponse<any>>;
    findOne(id: number): Promise<WebResponse<any>>;
    update(id: number, updateQuoteDto: UpdateQuoteDto): Promise<WebResponse<any>>;
    remove(id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
    }>;
}
