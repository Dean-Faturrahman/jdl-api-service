import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { AdminGalleriesService } from './galleries.service';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { WebResponse } from 'src/model/web.model';

@Controller('api/v1/admin/galleries')
export class AdminGalleriesController {
  constructor(private readonly galleriesService: AdminGalleriesService) { }

  @Post()
  async create(@Body() createGalleryDto: CreateGalleryDto): Promise<WebResponse<any>> {
    const result = await this.galleriesService.create(createGalleryDto);
    return {
      status_code: HttpStatus.CREATED,
      message: 'Successfully created a gallery',
      data: result,
    }
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<WebResponse<any>> {
    const result = await this.galleriesService.findAll(page, limit);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved all galleries',
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<any>> {
    const result = await this.galleriesService.findOne(id);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved a gallery',
      data: result,
    };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateGalleryDto: UpdateGalleryDto): Promise<WebResponse<any>> {
    const result = await this.galleriesService.update(id, updateGalleryDto);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully updated a gallery',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<any>> {
    const result = await this.galleriesService.remove(id);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully removed a gallery',
      data: null,
    };
  }
}
