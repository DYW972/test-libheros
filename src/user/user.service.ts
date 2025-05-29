import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  create(userData: Partial<User>) {
    const user = this.repo.create(userData);
    return this.repo.save(user);
  }

  async update(id: string, attrs: Partial<User>) {
    await this.repo.update(id, attrs);
    return this.findOne(id);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
