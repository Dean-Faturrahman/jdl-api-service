import { Body, Controller, Delete, HttpCode, HttpStatus, Request, Post, Get } from '@nestjs/common';
import { LoginUserRequest, RegisterUserRequest, UserResponse } from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';
import { Public } from './decorator/public.decorator';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('/register')
    async register(
        @Body() request: RegisterUserRequest
    ): Promise<WebResponse<UserResponse>> {
        const result = await this.authService.register(request)

        return {
            status_code: HttpStatus.CREATED,
            message: "Successfully registered",
            data: result,
        }
    }

    @Public()
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() request: LoginUserRequest
    ): Promise<WebResponse<UserResponse>> {
        const result = await this.authService.Login(request)

        return {
            status_code: HttpStatus.OK,
            message: "Successfully logged in",
            data: result,
        }
    }

    @Delete('/logout')
    @HttpCode(HttpStatus.OK)
    async logout(
        @Request() req,
    ): Promise<WebResponse<Boolean>> {
        await this.authService.logout(req.user.sub)

        return {
            status_code: HttpStatus.OK,
            message: "Successfully logged out",
            data: true,
        }
    }

    @Get('/check')
    async check(): Promise<WebResponse<UserResponse>> {
        
        return {
            status_code: HttpStatus.OK,
            message: "Successfully checked",
            data: null,
        }
    }
}
