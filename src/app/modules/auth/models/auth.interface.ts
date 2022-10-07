export interface LoginModel {
    username: string;
    password: string;
}

export interface TokenModel {
    access_token: string;
    refresh_token: string;
}

export interface UserProfile {
    username: string;
    sub: number;
    email: string;
    iat: number;
    exp: number;
}