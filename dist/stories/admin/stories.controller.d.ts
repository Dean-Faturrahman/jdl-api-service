import { AdminStoriesService } from './stories.service';
import { CreateStoryDto } from '../dto/create-story.dto';
import { WebResponse } from 'src/model/web.model';
export declare class AdminStoriesController {
    private readonly storiesService;
    constructor(storiesService: AdminStoriesService);
    create(createStoryDto: CreateStoryDto): Promise<WebResponse<any>>;
    findAll(page?: number, limit?: number): Promise<WebResponse<any>>;
    findOne(id: number): Promise<WebResponse<any>>;
    update(id: number, createStoryDto: CreateStoryDto): Promise<WebResponse<any>>;
    remove(id: number): Promise<WebResponse<any>>;
}
