import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('first_name')
  firstName: string;

  @Column('last_name')
  lastName: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}