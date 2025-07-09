import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { AdminQuotesService } from './quotes.service';
import { CreateQuoteDto } from '../dto/create-quote.dto';
import { UpdateQuoteDto } from '../dto/update-quote.dto';
import { WebResponse } from 'src/model/web.model';

@Controller('api/v1/admin/quotes')
export class AdminQuotesController {
  constructor(private readonly quotesService: AdminQuotesService) { }

  @Post()
  async create(@Body() createQuoteDto: CreateQuoteDto): Promise<WebResponse<any>> {
    const result = await this.quotesService.create(createQuoteDto);
    
    return {
      status_code: HttpStatus.CREATED,
      message: 'Successfully created a quote',
      data: result,
    };
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<WebResponse<any>> {
    const result = await this.quotesService.findAll(page, limit);

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved all quotes',
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<any>> {
    const result = await this.quotesService.findOne(id);

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved a quote',
      data: result,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuoteDto: UpdateQuoteDto
  ): Promise<WebResponse<any>> {
    const result = await this.quotesService.update(id, updateQuoteDto);
    
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully updated a quote',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.quotesService.remove(id);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully deleted a quote',
      data: null,
    };
  }
}
