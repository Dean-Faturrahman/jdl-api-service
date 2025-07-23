import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { AdminTeamService } from './team.service';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { WebResponse } from 'src/model/web.model';

@Controller('api/v1/admin/teams')
export class AdminTeamController {
  constructor(private readonly teamService: AdminTeamService) { }

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto): Promise<WebResponse<any>> {
    const result = await this.teamService.create(createTeamDto);
    return {
      status_code: HttpStatus.CREATED,
      message: 'Successfully created a team member',
      data: result,
    };
  }

  @Get()
  async findAll(): Promise<WebResponse<any>> {
    const result = await this.teamService.findAll();
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved all team members',
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<any>> {
    const result = await this.teamService.findOne(+id);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved team member',
      data: result,
    };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTeamDto: UpdateTeamDto): Promise<WebResponse<any>> {
    const result = await this.teamService.update(+id, updateTeamDto);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully updated team member',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<any>> {
    const result = await this.teamService.remove(+id);
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully removed team member',
      data: null,
    };
  }
}
