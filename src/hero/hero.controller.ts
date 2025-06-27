import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { LanguageQueryDto } from 'src/common/dto/language-query.dto';
import { WebResponse } from 'src/model/web.model';

@Controller('api/v1/heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) { }

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
  async findAll(@Query() query: LanguageQueryDto
  ): Promise<WebResponse<any[]>> {
    const result = await this.heroService.findAll(query);

    return {
      status_code: HttpStatus.CREATED,
      message: "Successfully retrieved all heroes",
      data: result,
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(+id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroService.remove(+id);
  }
}
