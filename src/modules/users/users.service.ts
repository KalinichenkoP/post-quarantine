import { Injectable,  NotFoundException } from '@nestjs/common';
import { User } from '../../graphql.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}


  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user =  await this.userRepository.findOne(id);
    if(!user) {
        throw new NotFoundException('User is not exist');
    }

    return user;
  }
}