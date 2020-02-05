export interface UserModel {
    id?: string;
    email: string;
    username: string;
    password: string;
    userGroup?: string;
    role?: 'student' | 'admin';
    passedTests?: PassedTests[]
}

interface PassedTests {
    id: string;
    persantage: number
}