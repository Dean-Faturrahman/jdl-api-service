import { Logger } from "winston";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
export declare class UserService {
    private validationService;
    private logger;
    private prismaService;
    constructor(validationService: ValidationService, logger: Logger, prismaService: PrismaService);
}
