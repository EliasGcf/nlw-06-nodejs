import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';
import { classToPlain } from 'class-transformer';

class ListTagsService {
  public async execute(): Promise<any> {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    const tags = await tagsRepositories.find();

    return classToPlain(tags);
  }
}

export { ListTagsService };
