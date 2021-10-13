import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import UserSignUpDto from '../dto/UserSignUpDto';
import BaseTimeEntity from './BaseTimeEntity';
import Users from './Users';

@Entity({ name: 'users_last_login' })
export default class UserLastLogin extends BaseTimeEntity {
  @OneToOne(type => Users, users => users.id)
  @JoinColumn({ name: 'user_id' })
  users: Users;
}
