import { CompanyService } from "./company.service";
import { WebResponse } from "src/model/web.model";
import { LanguageQueryDto } from "src/common/dto/language-query.dto";
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    find(query: LanguageQueryDto): Promise<WebResponse<any>>;
}
