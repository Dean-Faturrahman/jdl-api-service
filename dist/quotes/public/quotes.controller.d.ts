import { WebResponse } from 'src/model/web.model';
import { QuotesService } from './quotes.service';
export declare class QuotesController {
    private readonly quotesService;
    constructor(quotesService: QuotesService);
    findAll(page: number, limit: number): Promise<WebResponse<any>>;
}
