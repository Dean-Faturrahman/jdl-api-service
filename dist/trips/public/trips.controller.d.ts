import { TripsService } from "./trips.service";
import { WebResponse } from "src/model/web.model";
import { LanguageQueryDto } from "src/common/dto/language-query.dto";
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    findAll(query: LanguageQueryDto, page: number, limit: number, is_highlight?: boolean): Promise<WebResponse<any>>;
    findOne(query: LanguageQueryDto, id: number): Promise<WebResponse<any>>;
}
