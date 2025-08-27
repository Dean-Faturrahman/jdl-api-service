import { LoginUserRequest, RegisterUserRequest, UserResponse } from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(request: RegisterUserRequest): Promise<WebResponse<UserResponse>>;
    login(request: LoginUserRequest): Promise<WebResponse<UserResponse>>;
    logout(req: any): Promise<WebResponse<Boolean>>;
}
