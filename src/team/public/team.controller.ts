import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { WebResponse } from 'src/model/web.model';
import { TeamService } from './team.service';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('api/v1/teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @Public()
  @Get()
  async findAll(): Promise<WebResponse<any>> {
    const result = await this.teamService.findAll();
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully retrieved all team members',
      data: result,
    };
  }
}
