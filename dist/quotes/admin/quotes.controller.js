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
exports.AdminQuotesController = void 0;
const common_1 = require("@nestjs/common");
const quotes_service_1 = require("./quotes.service");
const create_quote_dto_1 = require("../dto/create-quote.dto");
const update_quote_dto_1 = require("../dto/update-quote.dto");
let AdminQuotesController = class AdminQuotesController {
    constructor(quotesService) {
        this.quotesService = quotesService;
    }
    async create(createQuoteDto) {
        const result = await this.quotesService.create(createQuoteDto);
        return {
            status_code: common_1.HttpStatus.CREATED,
            message: 'Successfully created a quote',
            data: result,
        };
    }
    async findAll(page, limit) {
        const result = await this.quotesService.findAll(page, limit);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved all quotes',
            data: result,
        };
    }
    async findOne(id) {
        const result = await this.quotesService.findOne(id);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved a quote',
            data: result,
        };
    }
    async update(id, updateQuoteDto) {
        const result = await this.quotesService.update(id, updateQuoteDto);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully updated a quote',
            data: result,
        };
    }
    async remove(id) {
        const result = await this.quotesService.remove(id);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully deleted a quote',
            data: null,
        };
    }
};
exports.AdminQuotesController = AdminQuotesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quote_dto_1.CreateQuoteDto]),
    __metadata("design:returntype", Promise)
], AdminQuotesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminQuotesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminQuotesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_quote_dto_1.UpdateQuoteDto]),
    __metadata("design:returntype", Promise)
], AdminQuotesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminQuotesController.prototype, "remove", null);
exports.AdminQuotesController = AdminQuotesController = __decorate([
    (0, common_1.Controller)('api/v1/admin/quotes'),
    __metadata("design:paramtypes", [quotes_service_1.AdminQuotesService])
], AdminQuotesController);
//# sourceMappingURL=quotes.controller.js.map