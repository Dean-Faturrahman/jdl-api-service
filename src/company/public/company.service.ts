import { Injectable } from "@nestjs/common";
import { I18nContext } from "nestjs-i18n";
import { LanguageQueryDto } from "src/common/dto/language-query.dto";
import { PrismaService } from "src/common/prisma.service";

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService) { }

    async find(query: LanguageQueryDto) {
        const lang = I18nContext.current()?.lang;

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
                book_url: true,
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
        })
    }
}