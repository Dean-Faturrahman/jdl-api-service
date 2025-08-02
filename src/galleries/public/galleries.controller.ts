import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { WebResponse } from 'src/model/web.model';
import { Public } from 'src/auth/decorator/public.decorator';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';

@Controller('api/v1/galleries')
export class GalleriesController {
  constructor(private readonly galleriesService: GalleriesService) { }

  @Public()
  @Get()
  async findAll(
    @Query() query: LanguageQueryDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<WebResponse<any>> {
    const result = await this.galleriesService.findAll(query, page, limit);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved all galleries',
      data: result,
    };
  }

  @Public()
  @Get(':id')
  async findOne(
    @Query() query: LanguageQueryDto,
    @Param('id', ParseIntPipe) id: number): Promise<WebResponse<any>> {
    const result = await this.galleriesService.findOne(query, id);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved a gallery',
      data: result,
    };
  }
}
