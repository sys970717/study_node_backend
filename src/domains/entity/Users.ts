import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import UserSignUpDto from '../dto/UserSignUpDto';
import TimestampEntity from './TimestampEntity';

@Entity({ name: 'users' })
export default class Users extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 50})
  name: string;

  @Column({ name: 'gender', nullable: false,  type: 'enum', enum: [0 , 1]})
  gender: boolean;

  @Column({ name: 'password', nullable: false, length: 256 })
  password: string;

  @Column({ name: 'cash', nullable: false, type: 'bigint' })
  cash: number;

  static createUserFromSignDto(userSignUpDto: UserSignUpDto) {
    const instance = new Users();
    instance.name = userSignUpDto.username;
    instance.password = userSignUpDto.password;
    instance.gender = Boolean(userSignUpDto.gender === 1);

    return instance;
  }
};

