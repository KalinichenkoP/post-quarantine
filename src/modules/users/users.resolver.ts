import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from './users.service';
import { User } from 'src/graphql.schema';
import { UsersGuard } from './users.guard';
import { CreateUserDto } from './dto/create-user.dto';


const pubSub = new PubSub();

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query('getUsers')
  @UseGuards(UsersGuard)
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query('getUser')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') args: CreateUserDto): Promise<User> {
    const createdCat = await this.usersService.create(args);
    pubSub.publish('catCreated', { catCreated: createdCat });
    return createdCat;
  }

  @Subscription('userCreated')
  userCreated(): any {
    return pubSub.asyncIterator('userCreated');
  }
}