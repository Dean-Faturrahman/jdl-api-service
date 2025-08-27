import { WebResponse } from 'src/model/web.model';
import { StoriesService } from './stories.service';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';
export declare class StoriesController {
    private readonly storiesService;
    constructor(storiesService: StoriesService);
    findAll(query: LanguageQueryDto, page?: number, limit?: number): Promise<WebResponse<any>>;
    findOne(query: LanguageQueryDto, id: number): Promise<WebResponse<any>>;
}
