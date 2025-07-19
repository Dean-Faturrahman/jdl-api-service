import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { WebResponse } from "src/model/web.model";
import { Public } from "src/auth/decorator/public.decorator";
import { LanguageQueryDto } from "src/common/dto/language-query.dto";

@Controller('api/v1/company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }
    
    @Public()
    @Get()
      async find(
        @Query() query: LanguageQueryDto,
      ): Promise<WebResponse<any>> {
        const result = await this.companyService.find(query);
        return {
          status_code: HttpStatus.OK,
          message: 'Successfully retrieved companies',
          data: result,
        };
      }
}