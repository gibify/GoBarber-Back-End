interface Request {
    email: string;
    password: string;
}

class AuthenticationUserService {
    public async execute({ email, password }: Request): Promise<void> {

    }
}

export default AuthenticationUserService
