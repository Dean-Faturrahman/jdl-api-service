import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, DefaultValuePipe, Query } from '@nestjs/common';
import { AdminStoriesService } from './stories.service';
import { CreateStoryDto } from '../dto/create-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { WebResponse } from 'src/model/web.model';

@Controller('api/v1/admin/stories')
export class AdminStoriesController {
  constructor(private readonly storiesService: AdminStoriesService) { }

  @Post()
  async create(@Body() createStoryDto: CreateStoryDto): Promise<WebResponse<any>> {
    const result = await this.storiesService.create(createStoryDto);
    return {
      status_code: HttpStatus.CREATED,
      message: 'Successfully created a story',
      data: result,
    }
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<WebResponse<any>> {
    const result = await this.storiesService.findAll(page, limit);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved all stories',
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<any>> {
    const result = await this.storiesService.findOne(id);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved a story',
      data: result,
    };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() createStoryDto: CreateStoryDto): Promise<WebResponse<any>> {
    const result = await this.storiesService.update(id, createStoryDto);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully updated a story',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<any>> {
    const result = await this.storiesService.remove(id);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully removed a story',
      data: null,
    };
  }
}
