import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/common/prisma.service";
import { Reflector } from "@nestjs/core";
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private prismaService;
    private reflector;
    constructor(jwtService: JwtService, prismaService: PrismaService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
