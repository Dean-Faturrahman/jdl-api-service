import { Body, Controller, Get, HttpStatus, Post, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { WebResponse } from "src/model/web.model";
import { RegisterUserRequest, UserResponse } from "../model/user.model";

@Controller('api/v1/users')
export class UserController {
    constructor(private userService: UserService) {

    }

    @Get('/current')
    async current(@Request() req): Promise<WebResponse<UserResponse>> {
        const result = await this.userService.getCurrentUser(req.user.sub);

        return {
            status_code: HttpStatus.OK,
            message: "Successfully retrieved current user",
            data: result,
        }
    }
}