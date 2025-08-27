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
exports.AdminCompanyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
let AdminCompanyService = class AdminCompanyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCompanyDto) {
        const { company_name, address, phone, email, latitude, longitude, facebook_url, instagram_url, tiktok_url, translations, images, } = createCompanyDto;
        return this.prisma.companyProfile.create({
            data: {
                company_name,
                address,
                phone,
                email,
                latitude,
                longitude,
                facebook_url,
                instagram_url,
                tiktok_url,
                translations: {
                    create: translations,
                },
                images: {
                    create: images,
                },
            },
            include: {
                translations: true,
                images: true,
            },
        });
    }
    async find() {
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
                        language_code: true,
                        background: true,
                        philosophy: true,
                        vision: true,
                        mission: true,
                        values: true,
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
    async update(id, updateCompanyProfileDto) {
        const { company_name, address, phone, email, latitude, longitude, facebook_url, instagram_url, tiktok_url, translations, images, } = updateCompanyProfileDto;
        return this.prisma.$transaction(async (tx) => {
            await tx.companyProfile.update({
                where: { id },
                data: {
                    company_name,
                    address,
                    phone,
                    email,
                    latitude,
                    longitude,
                    facebook_url,
                    instagram_url,
                    tiktok_url,
                },
            });
            if (translations) {
                await tx.companyProfileTranslation.deleteMany({
                    where: { profile_id: id },
                });
                const translationData = translations.map((translation) => ({
                    ...translation,
                    profile_id: id,
                }));
                await tx.companyProfileTranslation.createMany({
                    data: translationData,
                });
            }
            if (images) {
                await tx.companyImage.deleteMany({
                    where: { profile_id: id },
                });
                const imageData = images.map((image) => ({
                    ...image,
                    profile_id: id,
                }));
                await tx.companyImage.createMany({
                    data: imageData,
                });
            }
            const updatedProfile = await tx.companyProfile.findUnique({
                where: { id },
                include: {
                    translations: true,
                    images: true,
                },
            });
            if (!updatedProfile) {
                throw new common_1.NotFoundException(`Company Profile with ID ${id} not found`);
            }
            return updatedProfile;
        });
    }
    async remove(id) {
        const companyExists = await this.prisma.companyProfile.findUnique({
            where: { id },
        });
        if (!companyExists) {
            throw new common_1.NotFoundException(`Company Profile with ID ${id} not found`);
        }
        return await this.prisma.companyProfile.delete({
            where: { id },
        });
    }
};
exports.AdminCompanyService = AdminCompanyService;
exports.AdminCompanyService = AdminCompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminCompanyService);
//# sourceMappingURL=company.service.js.map