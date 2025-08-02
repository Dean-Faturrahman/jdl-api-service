import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { CreateStoryDto } from '../dto/create-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { WebResponse } from 'src/model/web.model';
import { StoriesService } from './stories.service';
import { Public } from 'src/auth/decorator/public.decorator';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';

@Controller('api/v1/stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) { }

  @Public()
  @Get()
  async findAll(
    @Query() query: LanguageQueryDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<WebResponse<any>> {
    const result = await this.storiesService.findAll(query, page, limit);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved all stories',
      data: result,
    };
  }

  @Public()
  @Get(':id')
  async findOne(
    @Query() query: LanguageQueryDto,
    @Param('id', ParseIntPipe) id: number
  ): Promise<WebResponse<any>> {
    const result = await this.storiesService.findOne(query, id);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved a story',
      data: result,
    };
  }
}
