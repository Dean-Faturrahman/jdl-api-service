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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTeamController = void 0;
const common_1 = require("@nestjs/common");
const team_service_1 = require("./team.service");
const create_team_dto_1 = require("../dto/create-team.dto");
const update_team_dto_1 = require("../dto/update-team.dto");
let AdminTeamController = class AdminTeamController {
    constructor(teamService) {
        this.teamService = teamService;
    }
    async create(createTeamDto) {
        const result = await this.teamService.create(createTeamDto);
        return {
            status_code: common_1.HttpStatus.CREATED,
            message: 'Successfully created a team member',
            data: result,
        };
    }
    async findAll() {
        const result = await this.teamService.findAll();
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved all team members',
            data: result,
        };
    }
    async findOne(id) {
        const result = await this.teamService.findOne(+id);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved team member',
            data: result,
        };
    }
    async update(id, updateTeamDto) {
        const result = await this.teamService.update(+id, updateTeamDto);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully updated team member',
            data: result,
        };
    }
    async remove(id) {
        const result = await this.teamService.remove(+id);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully removed team member',
            data: null,
        };
    }
};
exports.AdminTeamController = AdminTeamController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_team_dto_1.CreateTeamDto]),
    __metadata("design:returntype", Promise)
], AdminTeamController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminTeamController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminTeamController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_team_dto_1.UpdateTeamDto]),
    __metadata("design:returntype", Promise)
], AdminTeamController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminTeamController.prototype, "remove", null);
exports.AdminTeamController = AdminTeamController = __decorate([
    (0, common_1.Controller)('api/v1/admin/teams'),
    __metadata("design:paramtypes", [team_service_1.AdminTeamService])
], AdminTeamController);
//# sourceMappingURL=team.controller.js.map