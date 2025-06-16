import { Repository } from 'typeorm';
import { User } from 'user/entities/user.entity';

export class AdminQueryRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async saveUser() {}

  async updateUser() {}

  async deleteUser() {}
}
