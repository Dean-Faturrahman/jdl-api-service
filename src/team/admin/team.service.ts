import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AdminTeamService {
  constructor(private prisma: PrismaService) { }

  async create(createTeamMemberDto: CreateTeamDto) {
    return this.prisma.teamMember.create({
      data: createTeamMemberDto,
    });
  }

  async findAll() {
    return this.prisma.teamMember.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const member = await this.prisma.teamMember.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }

    return member
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const existingMember = await this.prisma.teamMember.findUnique({
      where: { id },
    });

    if (!existingMember) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }

    return this.prisma.teamMember.update({
      where: { id },
      data: updateTeamDto,
    });
  }

  async remove(id: number) {
    const existingMember = await this.prisma.teamMember.findUnique({
      where: { id },
    });

    if (!existingMember) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }
    
    return this.prisma.teamMember.delete({
      where: { id },
    });
  }
}
