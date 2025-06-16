import { Repository } from 'typeorm';
import { User } from 'user/entities/user.entity';

export class AdminCommandRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async saveUser() {}

  async updateUser() {}

  async deleteUser() {}
}
