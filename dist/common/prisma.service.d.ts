import { OnModuleInit } from "@nestjs/common";
import { Logger } from 'winston';
import { Prisma, PrismaClient } from "@prisma/client";
export declare class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, string> implements OnModuleInit {
    private readonly logger;
    constructor(logger: Logger);
    onModuleInit(): void;
}
