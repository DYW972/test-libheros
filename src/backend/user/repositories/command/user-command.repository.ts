import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from 'user/entities/user.entity';
import { CreateUser, UpdateUser, UserOutput } from 'user/schemas/user.schema';

@Injectable()
export class UserCommandRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveUser(
    data: CreateUser,
    hashedPassword: string,
  ): Promise<UserOutput> {
    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });

    const result = await this.userRepository.save(user);

    return result;
  }

  async updateUser(id: string, data: UpdateUser): Promise<UpdateResult> {
    const user = await this.userRepository.update({ id: id }, data);
    return user;
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ id: id });
  }
}
