import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserservice {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if(checkUserExists) {
            throw Error('Email address is already used');
        }

        const user = usersRepository.create({
            name,
            email,
            password,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserservice;
