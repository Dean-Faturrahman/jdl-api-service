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
exports.AdminStoriesController = void 0;
const common_1 = require("@nestjs/common");
const stories_service_1 = require("./stories.service");
const create_story_dto_1 = require("../dto/create-story.dto");
let AdminStoriesController = class AdminStoriesController {
    constructor(storiesService) {
        this.storiesService = storiesService;
    }
    async create(createStoryDto) {
        const result = await this.storiesService.create(createStoryDto);
        return {
            status_code: common_1.HttpStatus.CREATED,
            message: 'Successfully created a story',
            data: result,
        };
    }
    async findAll(page = 1, limit = 10) {
        const result = await this.storiesService.findAll(page, limit);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved all stories',
            data: result,
        };
    }
    async findOne(id) {
        const result = await this.storiesService.findOne(id);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved a story',
            data: result,
        };
    }
    async update(id, createStoryDto) {
        const result = await this.storiesService.update(id, createStoryDto);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully updated a story',
            data: result,
        };
    }
    async remove(id) {
        const result = await this.storiesService.remove(id);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully removed a story',
            data: null,
        };
    }
};
exports.AdminStoriesController = AdminStoriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_story_dto_1.CreateStoryDto]),
    __metadata("design:returntype", Promise)
], AdminStoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminStoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminStoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_story_dto_1.CreateStoryDto]),
    __metadata("design:returntype", Promise)
], AdminStoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminStoriesController.prototype, "remove", null);
exports.AdminStoriesController = AdminStoriesController = __decorate([
    (0, common_1.Controller)('api/v1/admin/stories'),
    __metadata("design:paramtypes", [stories_service_1.AdminStoriesService])
], AdminStoriesController);
//# sourceMappingURL=stories.controller.js.map