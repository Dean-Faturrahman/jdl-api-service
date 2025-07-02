import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { CreateQuoteDto } from '../dto/create-quote.dto';
import { UpdateQuoteDto } from '../dto/update-quote.dto';
import { WebResponse } from 'src/model/web.model';
import { QuotesService } from './quotes.service';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('api/v1/quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) { }

  @Public()
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<WebResponse<any>> {
    const result = await this.quotesService.findAll();

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved all quotes',
      data: result,
    };
  }
}
