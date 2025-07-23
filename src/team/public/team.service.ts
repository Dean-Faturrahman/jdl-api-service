import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.teamMember.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }
}
