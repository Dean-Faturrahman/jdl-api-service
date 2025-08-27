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
exports.AdminHeroController = void 0;
const common_1 = require("@nestjs/common");
const hero_service_1 = require("./hero.service");
const create_hero_dto_1 = require("../dto/create-hero.dto");
const update_hero_dto_1 = require("../dto/update-hero.dto");
let AdminHeroController = class AdminHeroController {
    constructor(heroService) {
        this.heroService = heroService;
    }
    async create(createHeroDto) {
        const result = await this.heroService.create(createHeroDto);
        return {
            status_code: common_1.HttpStatus.CREATED,
            message: "Successfully created a new hero",
            data: result,
        };
    }
    async findAll() {
        const result = await this.heroService.findAll();
        return {
            status_code: common_1.HttpStatus.OK,
            message: "Successfully retrieved all heroes",
            data: result,
        };
    }
    async update(id, updateHeroDto) {
        const result = await this.heroService.update(id, updateHeroDto);
        return {
            status_code: common_1.HttpStatus.OK,
            message: "Successfully updated a hero",
            data: result,
        };
    }
    async remove(id) {
        const result = await this.heroService.remove(id);
        return {
            status_code: common_1.HttpStatus.NO_CONTENT,
            message: "Successfully deleted a hero",
            data: null,
        };
    }
};
exports.AdminHeroController = AdminHeroController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hero_dto_1.CreateHeroDto]),
    __metadata("design:returntype", Promise)
], AdminHeroController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminHeroController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_hero_dto_1.UpdateHeroDto]),
    __metadata("design:returntype", Promise)
], AdminHeroController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminHeroController.prototype, "remove", null);
exports.AdminHeroController = AdminHeroController = __decorate([
    (0, common_1.Controller)('api/v1/admin/heroes'),
    __metadata("design:paramtypes", [hero_service_1.AdminHeroService])
], AdminHeroController);
//# sourceMappingURL=hero.controller.js.map