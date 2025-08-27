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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const prisma_service_1 = require("../../common/prisma.service");
let CompanyService = class CompanyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async find(query) {
        const lang = nestjs_i18n_1.I18nContext.current()?.lang;
        return this.prisma.companyProfile.findFirstOrThrow({
            select: {
                id: true,
                company_name: true,
                address: true,
                phone: true,
                email: true,
                latitude: true,
                longitude: true,
                facebook_url: true,
                instagram_url: true,
                tiktok_url: true,
                translations: {
                    select: {
                        id: true,
                        background: true,
                        philosophy: true,
                        vision: true,
                        mission: true,
                        values: true,
                    },
                    where: {
                        language_code: lang,
                    },
                },
                images: {
                    select: {
                        id: true,
                        url: true,
                    },
                },
            },
            orderBy: {
                id: 'desc',
            },
        });
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompanyService);
//# sourceMappingURL=company.service.js.map