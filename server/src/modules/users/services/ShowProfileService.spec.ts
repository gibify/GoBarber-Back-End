
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('updateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showProfile = new ShowProfileService(
            fakeUsersRepository,
        );
    })
    it('Should be able to show the profile user',  async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        const profile = await showProfile.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('John Doe');
        expect(profile.email).toBe('johndoe@gmail.com');

    });

    it('Should not be able to show the profile from non-existing user',  async () => {
        await expect(showProfile.execute({
            user_id: 'non-existing-user',
        })).rejects.toBeInstanceOf(AppError);
    });

});
