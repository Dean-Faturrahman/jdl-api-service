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
exports.TestimoniesController = void 0;
const common_1 = require("@nestjs/common");
const testomonies_service_1 = require("./testomonies.service");
const public_decorator_1 = require("../../auth/decorator/public.decorator");
const language_query_dto_1 = require("../../common/dto/language-query.dto");
const submit_testimony_dto_1 = require("../dto/submit-testimony.dto");
let TestimoniesController = class TestimoniesController {
    constructor(testimoniesService) {
        this.testimoniesService = testimoniesService;
    }
    async findAll(page = 1, limit = 10) {
        const result = await this.testimoniesService.findAll(page, limit);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved all testimonies',
            data: result,
        };
    }
    async verify(query, token) {
        const result = await this.testimoniesService.verify(query, token);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully verified token',
            data: result,
        };
    }
    async submitTestimony(submitDto) {
        const result = await this.testimoniesService.submitTestimony(submitDto);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully submitted a testimony',
            data: result,
        };
    }
};
exports.TestimoniesController = TestimoniesController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TestimoniesController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('verify/:token'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [language_query_dto_1.LanguageQueryDto, String]),
    __metadata("design:returntype", Promise)
], TestimoniesController.prototype, "verify", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('submit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submit_testimony_dto_1.SubmitTestimonyDto]),
    __metadata("design:returntype", Promise)
], TestimoniesController.prototype, "submitTestimony", null);
exports.TestimoniesController = TestimoniesController = __decorate([
    (0, common_1.Controller)('api/v1/testimonies'),
    __metadata("design:paramtypes", [testomonies_service_1.TestimoniesService])
], TestimoniesController);
//# sourceMappingURL=testimonies.controller.js.map