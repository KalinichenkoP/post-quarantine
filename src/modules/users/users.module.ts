import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolvers } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            UserEntity
        ]),
    ],
  providers: [UsersService, UsersResolvers],
})
export class UsersModule {}