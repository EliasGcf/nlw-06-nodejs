import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';

class ListUserReceiveComplimentsService {
  public async execute(user_id: string): Promise<any> {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepositories.findOne({
      where: {
        user_receiver: user_id
      },
      relations: ['userSender', 'userReceiver', 'tag']
    });

    return compliments;
  }
}

export { ListUserReceiveComplimentsService };
