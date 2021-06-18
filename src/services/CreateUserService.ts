import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUseRequest {
  name: string;
  email: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, admin}: IUseRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    if (!email) {
      throw new Error('Email incorrect');
    }

    const userAlreadyExists = await usersRepositories.findOne({
      email
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = usersRepositories.create({
      name,
      email,
      admin
    });

    await usersRepositories.save(user);

    return user;
  }
}

export { CreateUserService };
