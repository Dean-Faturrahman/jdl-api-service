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
exports.AdminQuotesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
let AdminQuotesService = class AdminQuotesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createQuoteDto) {
        const { quotes, author } = createQuoteDto;
        const newQuote = await this.prisma.quote.create({
            data: {
                quotes,
                author,
            },
        });
        return this.prisma.quote.findUnique({
            where: { id: newQuote.id },
        });
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const quotes = await this.prisma.quote.findMany({
            skip: skip,
            take: limit,
            orderBy: {
                id: 'asc',
            },
        });
        const total = await this.prisma.quote.count();
        return {
            pagination: {
                total: total,
                page: page,
                limit: limit,
            },
            quotes,
        };
    }
    async findOne(id) {
        const quote = await this.prisma.quote.findUnique({
            where: { id },
        });
        if (!quote) {
            throw new common_1.NotFoundException(`Quote with ID ${id} not found`);
        }
        return quote;
    }
    async update(id, updateQuoteDto) {
        const { quotes, author } = updateQuoteDto;
        const quoteExists = await this.prisma.quote.findUnique({
            where: { id },
        });
        if (!quoteExists) {
            throw new common_1.NotFoundException(`Quote with ID ${id} not found`);
        }
        const updatedQuote = await this.prisma.$transaction(async (tx) => {
            if (quotes) {
                await tx.quote.update({
                    where: { id: id },
                    data: { quotes: quotes },
                });
            }
            if (author !== undefined) {
                await tx.quote.update({
                    where: { id: id },
                    data: { author: author },
                });
            }
            return tx.quote.findUnique({
                where: { id: id },
            });
        });
        return updatedQuote;
    }
    async remove(id) {
        const quote = await this.prisma.quote.findUnique({
            where: { id },
        });
        if (!quote) {
            throw new common_1.NotFoundException(`Quote with ID ${id} not found`);
        }
        return this.prisma.quote.delete({
            where: { id },
        });
    }
};
exports.AdminQuotesService = AdminQuotesService;
exports.AdminQuotesService = AdminQuotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminQuotesService);
//# sourceMappingURL=quotes.service.js.map