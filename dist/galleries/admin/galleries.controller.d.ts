import { AdminGalleriesService } from './galleries.service';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { WebResponse } from 'src/model/web.model';
export declare class AdminGalleriesController {
    private readonly galleriesService;
    constructor(galleriesService: AdminGalleriesService);
    create(createGalleryDto: CreateGalleryDto): Promise<WebResponse<any>>;
    findAll(page?: number, limit?: number): Promise<WebResponse<any>>;
    findOne(id: number): Promise<WebResponse<any>>;
    update(id: number, updateGalleryDto: UpdateGalleryDto): Promise<WebResponse<any>>;
    remove(id: number): Promise<WebResponse<any>>;
}
