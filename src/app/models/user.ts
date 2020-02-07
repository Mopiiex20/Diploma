import { UserType } from '../shared/enums';

export interface UserModel {
    id?: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    userGroup?: string;
    userType?: UserType;
    passedTests?: PassedTests[]
}

interface PassedTests {
    id: string;
    persantage: number
}