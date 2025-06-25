export class RegisterUserRequest {
    id: string
    email: string
    password: string
    name: string
}

export class UserResponse {
    email: string
    name: string
    token?: string
}

export class LoginUserRequest {
    email: string
    password: string
}