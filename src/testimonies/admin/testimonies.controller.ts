import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { AdminTestimoniesService } from './testimonies.service';
import { CreateTestimonyDto } from '../dto/create-testimony.dto';
import { UpdateTestimonyDto } from '../dto/update-testimony.dto';
import { WebResponse } from 'src/model/web.model';

@Controller('api/v1/admin/testimonies')
export class AdminTestimoniesController {
  constructor(private readonly testimoniesService: AdminTestimoniesService) { }

  @Post()
  async create(@Body() createTestimonyDto: CreateTestimonyDto): Promise<WebResponse<any>> {
    const result = await this.testimoniesService.create(createTestimonyDto);

    return {
      status_code: HttpStatus.CREATED,
      message: 'Successfully created a testimony',
      data: result,
    };
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<WebResponse<any>> {
    const result = await this.testimoniesService.findAll(page, limit);

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved all testimonies',
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<any>> {
    const result = await this.testimoniesService.findOne(id);

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved a testimony',
      data: result,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTestimonyDto: UpdateTestimonyDto
  ): Promise<WebResponse<any>> {
    const result = await this.testimoniesService.update(id, updateTestimonyDto);

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully updated a testimony',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.testimoniesService.remove(id);

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully deleted a testimony',
      data: null,
    };
  }
}
