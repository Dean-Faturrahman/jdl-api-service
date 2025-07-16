import { Controller, Get, Post,  Body, Patch, Param, Delete, HttpStatus, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { WebResponse } from 'src/model/web.model';

@Controller('api/v1/admin/trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async create(@Body() createTripDto: CreateTripDto): Promise<WebResponse<any>> {
    const result = await this.tripsService.create(createTripDto);
    return {
      status_code: HttpStatus.CREATED,
      message: 'Successfully created a trip',
      data: result,
    };
  }

  @Get()
  async findAll(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ): Promise<WebResponse<any>> {
    const result = await this.tripsService.findAll(page, limit);

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved all trips',
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<any>> {
    const trip = await this.tripsService.findOne(id);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved trip',
      data: trip,
    };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto): Promise<WebResponse<any>> {
    const result = await this.tripsService.update(id, updateTripDto);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully updated trip',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<any>> {
    await this.tripsService.remove(id);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully removed trip',
    };
  }
}
