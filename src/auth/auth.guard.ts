import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { Logger } from "winston";
import { jwtConstants } from "./constants";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma.service";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./decorator/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );

            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch (e) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        const result = await this.prismaService.user.findUnique({
            select: {
                token: true
            },
            where: { id: request.user.sub },
        });

        if (!result.token) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}