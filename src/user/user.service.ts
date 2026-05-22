import { HttpException, Inject, Injectable } from "@nestjs/common";
import { Logger } from "winston";
import { RegisterUserRequest, UserResponse } from "src/model/user.model";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { UserValidation } from "./user.validation";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService
    ) {

    }

    async getCurrentUser(userId: number): Promise<UserResponse> {
        this.logger.debug(`UserService.getCurrentUser(${userId})`);

        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        return {
            email: user.email,
            name: user.name,
            role: user.role
        };
    }
}