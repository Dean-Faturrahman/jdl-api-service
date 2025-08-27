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
exports.AdminGalleriesController = void 0;
const common_1 = require("@nestjs/common");
const galleries_service_1 = require("./galleries.service");
const create_gallery_dto_1 = require("../dto/create-gallery.dto");
const update_gallery_dto_1 = require("../dto/update-gallery.dto");
let AdminGalleriesController = class AdminGalleriesController {
    constructor(galleriesService) {
        this.galleriesService = galleriesService;
    }
    async create(createGalleryDto) {
        const result = await this.galleriesService.create(createGalleryDto);
        return {
            status_code: common_1.HttpStatus.CREATED,
            message: 'Successfully created a gallery',
            data: result,
        };
    }
    async findAll(page = 1, limit = 10) {
        const result = await this.galleriesService.findAll(page, limit);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved all galleries',
            data: result,
        };
    }
    async findOne(id) {
        const result = await this.galleriesService.findOne(id);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved a gallery',
            data: result,
        };
    }
    async update(id, updateGalleryDto) {
        const result = await this.galleriesService.update(id, updateGalleryDto);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully updated a gallery',
            data: result,
        };
    }
    async remove(id) {
        const result = await this.galleriesService.remove(id);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully removed a gallery',
            data: null,
        };
    }
};
exports.AdminGalleriesController = AdminGalleriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gallery_dto_1.CreateGalleryDto]),
    __metadata("design:returntype", Promise)
], AdminGalleriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminGalleriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminGalleriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_gallery_dto_1.UpdateGalleryDto]),
    __metadata("design:returntype", Promise)
], AdminGalleriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminGalleriesController.prototype, "remove", null);
exports.AdminGalleriesController = AdminGalleriesController = __decorate([
    (0, common_1.Controller)('api/v1/admin/galleries'),
    __metadata("design:paramtypes", [galleries_service_1.AdminGalleriesService])
], AdminGalleriesController);
//# sourceMappingURL=galleries.controller.js.map