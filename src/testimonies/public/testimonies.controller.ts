import { Controller, DefaultValuePipe, Get, HttpStatus, ParseIntPipe, Query } from "@nestjs/common";
import { TestimoniesService } from "./testomonies.service";
import { WebResponse } from "src/model/web.model";
import { Public } from "src/auth/decorator/public.decorator";

@Controller('api/v1/testimonies')
export class TestimoniesController {
  constructor(private readonly testimoniesService: TestimoniesService) {}

  @Public()
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<WebResponse<any>> {
    const result = await this.testimoniesService.findAll(page, limit);

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved all testimonies',
      data: result,
    };
  }
} 