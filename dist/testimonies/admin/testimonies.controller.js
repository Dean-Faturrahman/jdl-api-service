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
exports.AdminTestimoniesController = void 0;
const common_1 = require("@nestjs/common");
const testimonies_service_1 = require("./testimonies.service");
const update_testimony_dto_1 = require("../dto/update-testimony.dto");
const create_testimonial_request_dto_1 = require("../dto/create-testimonial-request.dto");
let AdminTestimoniesController = class AdminTestimoniesController {
    constructor(testimoniesService) {
        this.testimoniesService = testimoniesService;
    }
    async generateLink(createDto) {
        const result = await this.testimoniesService.generateLink(createDto);
        return {
            status_code: common_1.HttpStatus.CREATED,
            message: 'Successfully generated a link',
            data: result,
        };
    }
    async findAll(page, limit) {
        const result = await this.testimoniesService.findAll(page, limit);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved all testimonies',
            data: result,
        };
    }
    async findOne(id) {
        const result = await this.testimoniesService.findOne(id);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved a testimony',
            data: result,
        };
    }
    async update(id, updateTestimonyDto) {
        const result = await this.testimoniesService.update(id, updateTestimonyDto);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully updated a testimony',
            data: result,
        };
    }
    async remove(id) {
        await this.testimoniesService.remove(id);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully deleted a testimony',
            data: null,
        };
    }
};
exports.AdminTestimoniesController = AdminTestimoniesController;
__decorate([
    (0, common_1.Post)('request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_testimonial_request_dto_1.CreateTestimonialRequestDto]),
    __metadata("design:returntype", Promise)
], AdminTestimoniesController.prototype, "generateLink", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminTestimoniesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminTestimoniesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_testimony_dto_1.UpdateTestimonyDto]),
    __metadata("design:returntype", Promise)
], AdminTestimoniesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminTestimoniesController.prototype, "remove", null);
exports.AdminTestimoniesController = AdminTestimoniesController = __decorate([
    (0, common_1.Controller)('api/v1/admin/testimonies'),
    __metadata("design:paramtypes", [testimonies_service_1.AdminTestimoniesService])
], AdminTestimoniesController);
//# sourceMappingURL=testimonies.controller.js.map