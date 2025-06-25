import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { WebResponse } from "src/model/web.model";
import { RegisterUserRequest, UserResponse } from "../model/user.model";

@Controller('api/users')
export class UserController {
    constructor(private userService: UserService) {

    }
}