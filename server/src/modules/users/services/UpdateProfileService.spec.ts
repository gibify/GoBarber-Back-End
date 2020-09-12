
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from './UpdateProfileService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('updateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider
        );
    })
    it('Should be able to update the profile user',  async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Tre',
            email: 'johntre@gmail.com'
        });

        expect(updatedUser.name).toBe('John Tre');
        expect(updatedUser.email).toBe('johntre@gmail.com');

    });

    it('Should not be able to update the profile from non-existing user',  async () => {
        await expect(updateProfile.execute({
            user_id: 'non-existing-user',
            name: 'Name Fake',
            email: 'test@gmail.com'
        })).rejects.toBeInstanceOf(AppError);
    });


    it('Should not be able to update with another user email',  async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Name Fake',
            email: 'test@gmail.com',
            password: '123456',
        });

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'johndoe@gmail.com'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to update the password',  async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Tre',
            email: 'johntre@gmail.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');


    });

    it('Should not be able to update the password without old password',  async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Tre',
            email: 'johntre@gmail.com',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError);

    });

    it('Should not be able to update the password with wrong old password',  async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Tre',
            email: 'johntre@gmail.com',
            old_password: 'wrong-old-password',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError);

    });

});
