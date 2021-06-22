import { getCustomRepository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error('Email/password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email/password incorrect');
    }

    const token = sign(
      {
        email: user.email,
      },
      '802dd6439ca44f8c501d20e42936f2db',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return token;
  }
}

export { AuthenticateUserService };
