import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, ParseIntPipe, HttpCode } from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';
import { WebResponse } from 'src/model/web.model';
import { Public } from 'src/auth/decorator/public.decorator';

@Public()
@Controller('api/v1/heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) { }

  @Get()
  async findAll(
    @Query() query: LanguageQueryDto
  ): Promise<WebResponse<any>> {
    const result = await this.heroService.findAll(query);

    return {
      status_code: HttpStatus.OK,
      message: "Successfully retrieved all heroes",
      data: result,
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number, 
    @Query() query: LanguageQueryDto,
  ) {
    const result = await this.heroService.findOne(id, query);

    return {
      status_code: HttpStatus.OK,
      message: "Successfully retrieved a hero",
      data: result,
    }
  }
}
