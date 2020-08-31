import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const authenticationUser = new AuthenticationUserService(usersRepository);

    const { user, token } = await authenticationUser.execute({
        email,
        password,
    });

    delete user.password;

    return response.json({ user, token });

});

export default sessionsRouter;
