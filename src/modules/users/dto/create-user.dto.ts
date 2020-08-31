
import { Min } from 'class-validator';
import { CreateUserInput } from 'src/graphql.schema';

export class CreateUserDto extends CreateUserInput {
  @Min(1)
  age: number;
}