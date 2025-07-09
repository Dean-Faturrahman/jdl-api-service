import { Public } from "src/auth/decorator/public.decorator";
import { HighlightsService } from "./highlights.service";
import { Controller, DefaultValuePipe, Get, HttpStatus, ParseIntPipe, Query } from "@nestjs/common";
import { WebResponse } from "src/model/web.model";

@Controller('api/v1/highlights')
export class HighlightsController {
  constructor(private readonly highlightsService: HighlightsService) {}

  @Public()
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<WebResponse<any>> {
    const result = await this.highlightsService.findAll(page, limit);

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved all highlights',
      data: result,
    };
  }
}