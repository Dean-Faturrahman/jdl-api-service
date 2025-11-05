import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { jwtConstants } from "./constants";
import { TokenExpiredError } from 'jsonwebtoken';
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

            request['user'] = payload;
        } catch (e) {
            if (e instanceof TokenExpiredError) {
                throw new HttpException("Your session ended. Please login again.", HttpStatus.UNAUTHORIZED);
            }

            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        const result = await this.prismaService.user.findUnique({
            select: {
                token: true
            },
            where: { id: request.user.sub },
        });

        if (!result) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

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