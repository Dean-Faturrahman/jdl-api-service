export declare class RegisterUserRequest {
    id: string;
    email: string;
    password: string;
    name: string;
}
export declare class UserResponse {
    email: string;
    name: string;
    token?: string;
}
export declare class LoginUserRequest {
    email: string;
    password: string;
}
