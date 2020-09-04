
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticationUserService from './AuthenticationUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticationUser', () => {
    it('Should be able to authenticate',  async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        const authenticationUser = new AuthenticationUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        const response = await authenticationUser.execute({
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('Should not be able to authenticate with non existing user',  async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();


        const authenticationUser = new AuthenticationUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

        expect(authenticationUser.execute({
            email: 'johndoe@gmail.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError);

    });

    it('Should not be able to authenticate with wrong password',  async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        const authenticationUser = new AuthenticationUserService(fakeUsersRepository, fakeHashProvider);

        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        expect(authenticationUser.execute({
            email: 'johndoe@gmail.com',
            password: 'wrong-password',
        })).rejects.toBeInstanceOf(AppError);

    });

});
