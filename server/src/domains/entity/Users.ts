import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import UserSignUpDto from '../dto/UserSignUpDto';
import BaseTimeEntity from './BaseTimeEntity';
import UsersPassword from './UsersPassword';

@Entity({ name: 'users' })
export default class Users extends BaseTimeEntity {
  @Column({ unique: true, nullable: false, length: 50})
  name: string;

  @Column({ name: 'gender', nullable: false,  type: 'enum', enum: [0 , 1]})
  gender: number;

  @Column({ name: 'cash', nullable: true, type: 'bigint', default: 0 })
  cash: number;

  @OneToOne(() => UsersPassword)
  @JoinColumn({ name: 'password_info_id' })
  passwordInfo: UsersPassword;

  static createUserFromSignDto(userSignUpDto: UserSignUpDto) {
    userSignUpDto.createUserPasswordByBcrypt();

    const usersPasswordInfo = UsersPassword.ofForUpsertUser(userSignUpDto.password, userSignUpDto.salt);
    usersPasswordInfo.save();
    
    const instance = new Users();
    instance.name = userSignUpDto.username;
    instance.gender = userSignUpDto.gender;
    instance.passwordInfo = usersPasswordInfo;

    return instance;
  }
}
