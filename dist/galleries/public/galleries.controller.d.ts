import { GalleriesService } from './galleries.service';
import { WebResponse } from 'src/model/web.model';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';
export declare class GalleriesController {
    private readonly galleriesService;
    constructor(galleriesService: GalleriesService);
    findAll(query: LanguageQueryDto, page?: number, limit?: number): Promise<WebResponse<any>>;
    findOne(query: LanguageQueryDto, id: number): Promise<WebResponse<any>>;
}
