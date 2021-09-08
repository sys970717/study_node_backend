import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import TimestampEntity from './TimestampEntity';

console.log('USERS');

@Entity({ name: 'users' })
export default class Users extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 50})
  name: string;

  @Column({ name: 'gender', nullable: false })
  gender: boolean;

  @Column({ name: 'password', nullable: false, length: 256 })
  password: string;

  @Column({ name: 'cash', nullable: false, type: 'bigint' })
  cash: number;
};

