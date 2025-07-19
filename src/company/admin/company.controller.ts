import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { AdminCompanyService } from './company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { WebResponse } from 'src/model/web.model';

@Controller('api/v1/admin/company')
export class AdminCompanyController {
  constructor(private readonly companyService: AdminCompanyService) { }

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<WebResponse<any>> {

    const result = await this.companyService.create(createCompanyDto);
    return {
      status_code: HttpStatus.CREATED,
      message: 'Successfully created a company',
      data: result,
    }
  }

  @Get()
  async find(): Promise<WebResponse<any>> {
    const result = await this.companyService.find();
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved companies',
      data: result,
    };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    const result = await this.companyService.update(id, updateCompanyDto);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully updated a company',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.companyService.remove(id);

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully removed a company'
    };
  }
}
