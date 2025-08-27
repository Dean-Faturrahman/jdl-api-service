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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
const jwt_1 = require("@nestjs/jwt");
const nest_winston_1 = require("nest-winston");
const prisma_service_1 = require("../common/prisma.service");
const validation_service_1 = require("../common/validation.service");
const user_validation_1 = require("../user/user.validation");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prismaService, jwtService, validationService, logger) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.validationService = validationService;
        this.logger = logger;
    }
    async register(request) {
        this.logger.debug(`Register new user ${JSON.stringify(request)}`);
        const registerRequest = this.validationService.validate(user_validation_1.UserValidation.REGISTER, request);
        const totalUserWithSameEmail = await this.prismaService.user.count({
            where: {
                email: registerRequest.email
            }
        });
        if (totalUserWithSameEmail != 0) {
            throw new common_1.HttpException('Email already exists', 400);
        }
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
        const user = await this.prismaService.user.create({
            data: {
                email: registerRequest.email,
                name: registerRequest.name,
                password: registerRequest.password
            }
        });
        return {
            email: user.email,
            name: user.name,
        };
    }
    async Login(request) {
        this.logger.debug(`UserService.login(${JSON.stringify(request)})`);
        const loginRequest = this.validationService.validate(user_validation_1.UserValidation.LOGIN, request);
        let user = await this.prismaService.user.findUnique({
            where: {
                email: loginRequest.email
            }
        });
        if (!user) {
            throw new common_1.HttpException('Username or password is invalid', common_1.HttpStatus.UNAUTHORIZED);
        }
        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException('Username or password is invalid', common_1.HttpStatus.UNAUTHORIZED);
        }
        const payload = { sub: user.id, username: user.email };
        const token = await this.jwtService.signAsync(payload);
        user = await this.prismaService.user.update({
            where: {
                email: loginRequest.email
            },
            data: {
                token: token
            }
        });
        return {
            email: user.email,
            name: user.name,
            token: user.token,
        };
    }
    async logout(id) {
        const result = await this.prismaService.user.update({
            where: {
                id
            },
            data: {
                token: null
            }
        });
        return {
            email: result.email,
            name: result.name
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        validation_service_1.ValidationService,
        winston_1.Logger])
], AuthService);
//# sourceMappingURL=auth.service.js.map