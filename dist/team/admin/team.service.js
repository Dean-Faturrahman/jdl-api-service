"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTeamService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
let AdminTeamService = class AdminTeamService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTeamMemberDto) {
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
    async findOne(id) {
        const member = await this.prisma.teamMember.findUnique({
            where: { id },
        });
        if (!member) {
            throw new common_1.NotFoundException(`Team member with ID ${id} not found`);
        }
        return member;
    }
    async update(id, updateTeamDto) {
        const existingMember = await this.prisma.teamMember.findUnique({
            where: { id },
        });
        if (!existingMember) {
            throw new common_1.NotFoundException(`Team member with ID ${id} not found`);
        }
        return this.prisma.teamMember.update({
            where: { id },
            data: updateTeamDto,
        });
    }
    async remove(id) {
        const existingMember = await this.prisma.teamMember.findUnique({
            where: { id },
        });
        if (!existingMember) {
            throw new common_1.NotFoundException(`Team member with ID ${id} not found`);
        }
        return this.prisma.teamMember.delete({
            where: { id },
        });
    }
};
exports.AdminTeamService = AdminTeamService;
exports.AdminTeamService = AdminTeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminTeamService);
//# sourceMappingURL=team.service.js.map