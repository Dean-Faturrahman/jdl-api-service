import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Logger } from "winston";
import { JwtService } from '@nestjs/jwt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { LoginUserRequest, RegisterUserRequest, UserResponse } from 'src/model/user.model';
import { UserValidation } from 'src/user/user.validation';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        // private usersService: UserService,
        private jwtService: JwtService,
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    ) { }

    async register(request: RegisterUserRequest): Promise<UserResponse> {
        this.logger.debug(`Register new user ${JSON.stringify(request)}`)
        const registerRequest: RegisterUserRequest = this.validationService.validate(UserValidation.REGISTER, request)

        const totalUserWithSameEmail = await this.prismaService.user.count({
            where: {
                email: registerRequest.email
            }
        })

        if (totalUserWithSameEmail != 0) {
            throw new HttpException('Email already exists', 400)
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        const user = await this.prismaService.user.create({
            data: {
                email: registerRequest.email,
                name: registerRequest.name,
                password: registerRequest.password
            }
        })

        return {
            email: user.email,
            name: user.name,
        }
    }

    async Login(request: LoginUserRequest): Promise<UserResponse> {
        this.logger.debug(`UserService.login(${JSON.stringify(request)})`)

        const loginRequest: LoginUserRequest = this.validationService.validate(UserValidation.LOGIN, request)

        let user = await this.prismaService.user.findUnique({
            where: {
                email: loginRequest.email
            }
        })

        if (!user) {
            throw new HttpException('Username or password is invalid', HttpStatus.UNAUTHORIZED)
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

        if (!isPasswordValid) {
            throw new HttpException('Username or password is invalid', HttpStatus.UNAUTHORIZED)
        }

        const payload = { sub: user.id, username: user.email };
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: 5, // Nilai dalam detik (seconds)
        });

        user = await this.prismaService.user.update({
            where: {
                email: loginRequest.email
            },
            data: {
                token: token
            }
        })

        return {
            email: user.email,
            name: user.name,
            token: user.token,
        }
    }

    async logout(id: number): Promise<UserResponse> {
        const result = await this.prismaService.user.update({
            where: {
                id
            },
            data: {
                token: null
            }
        })

        return {
            email: result.email,
            name: result.name
        }
    }
}
