import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { AdminHighlightsService } from './highlights.service';
import { CreateHighlightDto } from '../dto/create-highlight.dto';
import { UpdateHighlightDto } from '../dto/update-highlight.dto';
import { WebResponse } from 'src/model/web.model';

@Controller('api/v1/admin/highlights')
export class AdminHighlightsController {
  constructor(private readonly highlightsService: AdminHighlightsService) { }

  @Post()
  async create(@Body() createHighlightDto: CreateHighlightDto): Promise<WebResponse<any>> {
    const result = await this.highlightsService.create(createHighlightDto);

    return {
      status_code: HttpStatus.CREATED,
      message: 'Successfully created a highlight',
      data: result,
    };
  }

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

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<any>> {
    const result = await this.highlightsService.findOne(id);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved a highlight',
      data: result,
    };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateHighlightDto: UpdateHighlightDto): Promise<WebResponse<any>> {
    const result = await this.highlightsService.update(id, updateHighlightDto);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully updated a highlight',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.highlightsService.remove(id);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully deleted a highlight',
      data: null,
    };
  }
}
