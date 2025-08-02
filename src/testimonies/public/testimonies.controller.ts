import { Body, Controller, DefaultValuePipe, Get, HttpStatus, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { TestimoniesService } from "./testomonies.service";
import { WebResponse } from "src/model/web.model";
import { Public } from "src/auth/decorator/public.decorator";
import { LanguageQueryDto } from "src/common/dto/language-query.dto";
import { SubmitTestimonyDto } from "../dto/submit-testimony.dto";

@Controller('api/v1/testimonies')
export class TestimoniesController {
  constructor(private readonly testimoniesService: TestimoniesService) { }

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

  @Public()
  @Get('verify/:token')
  async verify(
    @Query() query: LanguageQueryDto,
    @Param('token') token: string): Promise<WebResponse<any>> {
    const result = await this.testimoniesService.verify(query, token);

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully verified token',
      data: result,
    };
  }

  @Public()
  @Post('submit')
  async submitTestimony(@Body() submitDto: SubmitTestimonyDto): Promise<WebResponse<any>> {
    const result = await this.testimoniesService.submitTestimony(submitDto);
    
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully submitted a testimony',
      data: result,
    };
  }
} 