import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';

@Global()
@Module({
    imports: [
        WinstonModule.forRoot({
            format: winston.format.json(),
            transports: [new winston.transports.Console()]
        }),
        ConfigModule.forRoot({
            isGlobal: true
        }),
        I18nModule.forRoot({
            fallbackLanguage: 'id',
            loaderOptions: {
                path: path.join(__dirname, '../i18n/'),
                watch: true,
            },
            resolvers: [
                { use: QueryResolver, options: ['lang'] },
                AcceptLanguageResolver,
            ],
        }),
    ],
    providers: [PrismaService, ValidationService, {
        provide: APP_FILTER,
        useClass: ErrorFilter
    }],
    exports: [PrismaService, ValidationService],
})
export class CommonModule { }
