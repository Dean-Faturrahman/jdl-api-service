import { TestimoniesService } from "./testomonies.service";
import { WebResponse } from "src/model/web.model";
import { LanguageQueryDto } from "src/common/dto/language-query.dto";
import { SubmitTestimonyDto } from "../dto/submit-testimony.dto";
export declare class TestimoniesController {
    private readonly testimoniesService;
    constructor(testimoniesService: TestimoniesService);
    findAll(page?: number, limit?: number): Promise<WebResponse<any>>;
    verify(query: LanguageQueryDto, token: string): Promise<WebResponse<any>>;
    submitTestimony(submitDto: SubmitTestimonyDto): Promise<WebResponse<any>>;
}
