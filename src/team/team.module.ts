import { Module } from '@nestjs/common';
import { AdminTeamService } from './admin/team.service';
import { AdminTeamController } from './admin/team.controller';
import { TeamController } from './public/team.controller';
import { TeamService } from './public/team.service';

@Module({
  controllers: [AdminTeamController, TeamController],
  providers: [AdminTeamService, TeamService],
})
export class TeamModule {}
