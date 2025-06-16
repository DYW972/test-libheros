import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'user/entities/user.entity';

@Injectable()
export class UserQueryRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email: email });
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id: id });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
