import * as bcrypt from 'bcrypt'
import { environment } from 'src/environments/environment'

const bcryptSalt: number = environment.bcryptSalt

export const genPassword = (password: string): string => {
    return bcrypt.hashSync(password, bcryptSalt);
}

export const comparePasswords = (password, toCompare): boolean => {
    return bcrypt.compareSync(toCompare, password)
}