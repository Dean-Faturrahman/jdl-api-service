import { Logger } from "winston";
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { LoginUserRequest, RegisterUserRequest, UserResponse } from 'src/model/user.model';
export declare class AuthService {
    private prismaService;
    private jwtService;
    private validationService;
    private logger;
    constructor(prismaService: PrismaService, jwtService: JwtService, validationService: ValidationService, logger: Logger);
    register(request: RegisterUserRequest): Promise<UserResponse>;
    Login(request: LoginUserRequest): Promise<UserResponse>;
    logout(id: number): Promise<UserResponse>;
}
