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
exports.GalleriesController = void 0;
const common_1 = require("@nestjs/common");
const galleries_service_1 = require("./galleries.service");
const public_decorator_1 = require("../../auth/decorator/public.decorator");
const language_query_dto_1 = require("../../common/dto/language-query.dto");
let GalleriesController = class GalleriesController {
    constructor(galleriesService) {
        this.galleriesService = galleriesService;
    }
    async findAll(query, page = 1, limit = 10) {
        const result = await this.galleriesService.findAll(query, page, limit);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved all galleries',
            data: result,
        };
    }
    async findOne(query, id) {
        const result = await this.galleriesService.findOne(query, id);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved a gallery',
            data: result,
        };
    }
};
exports.GalleriesController = GalleriesController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [language_query_dto_1.LanguageQueryDto, Number, Number]),
    __metadata("design:returntype", Promise)
], GalleriesController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [language_query_dto_1.LanguageQueryDto, Number]),
    __metadata("design:returntype", Promise)
], GalleriesController.prototype, "findOne", null);
exports.GalleriesController = GalleriesController = __decorate([
    (0, common_1.Controller)('api/v1/galleries'),
    __metadata("design:paramtypes", [galleries_service_1.GalleriesService])
], GalleriesController);
//# sourceMappingURL=galleries.controller.js.map