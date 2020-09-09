import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

    ){}

    public async execute({ token, password }: IRequest): Promise<void> {


    }
}
export default SendForgotPasswordEmailService;
