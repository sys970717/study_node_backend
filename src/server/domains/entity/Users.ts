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
  gender: number;

  @Column({ name: 'password', nullable: false, length: 256 })
  password: string;

  @Column({ name: 'salt', nullable: false, type: 'text', comment: '암호를 암호화하는데 사용한 데이터.' })
  salt: string;

  @Column({ name: 'cash', nullable: true, type: 'bigint' })
  cash: number;


  static createUserFromSignDto(userSignUpDto: UserSignUpDto) {
    userSignUpDto.createUserPasswordByBcrypt();
    
    const instance = new Users();
    instance.name = userSignUpDto.username;
    instance.password = userSignUpDto.password;
    instance.gender = userSignUpDto.gender;
    instance.salt = userSignUpDto.salt;

    return instance;
  }
};

