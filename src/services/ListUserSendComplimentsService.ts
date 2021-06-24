import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';

class ListUserSendComplimentsService {
  public async execute(user_id: string): Promise<any> {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepositories.findOne({
      where: {
        user_sender: user_id
      }
    });

    return compliments;
  }
}

export { ListUserSendComplimentsService };
