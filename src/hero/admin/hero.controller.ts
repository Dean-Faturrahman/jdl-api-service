import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, ParseIntPipe, HttpCode } from '@nestjs/common';
import { AdminHeroService } from './hero.service';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';
import { WebResponse } from 'src/model/web.model';

@Controller('api/v1/admin/heroes')
export class AdminHeroController {
  constructor(private readonly heroService: AdminHeroService) { }

  @Post()
  async create(@Body() createHeroDto: CreateHeroDto
  ): Promise<WebResponse<any>> {
    const result = await this.heroService.create(createHeroDto);

    return {
      status_code: HttpStatus.CREATED,
      message: "Successfully created a new hero",
      data: result,
    }
  }

  @Get()
  async findAll(): Promise<WebResponse<any>> {
    const result = await this.heroService.findAll();

    return {
      status_code: HttpStatus.OK,
      message: "Successfully retrieved all heroes",
      data: result,
    }
  }

  // @Get(':id')
  // async findOne(
  //   @Param('id', ParseIntPipe) id: number, 
  //   @Query() query: LanguageQueryDto,
  // ) {
  //   const result = await this.heroService.findOne(id, query);

  //   return {
  //     status_code: HttpStatus.OK,
  //     message: "Successfully retrieved a hero",
  //     data: result,
  //   }
  // }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHeroDto: UpdateHeroDto,
  ) {
    const result = await this.heroService.update(id, updateHeroDto);

    return {
      status_code: HttpStatus.OK,
      message: "Successfully updated a hero",
      data: result,
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.heroService.remove(id);

    return {
      status_code: HttpStatus.NO_CONTENT,
      message: "Successfully deleted a hero",
      data: null,
    };
  }
}
