export interface UserModel {
    id?: number;
    email: string;
    username: string;
    firstName: string;
    userGroup?: string;
    permissions?: string[]
}