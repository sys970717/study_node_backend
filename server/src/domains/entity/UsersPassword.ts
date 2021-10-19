import {
  Entity,
  Column,
  UpdateDateColumn,
} from 'typeorm';

import BaseTimeEntity from './BaseTimeEntity';

@Entity({name: 'users_password'})
export default class UsersPassword extends BaseTimeEntity {
  @Column({ name: 'password', nullable: false, length: 256 })
  password: string;

  @Column({ name: 'salt', nullable: false, type: 'text', comment: '암호를 암호화하는데 사용한 데이터.' })
  salt: string;

  @UpdateDateColumn({ name: 'password_change_last_at', nullable: false, type: 'datetime', comment: '마지막 암호 변경일' })
  pwChangeLastAt: Date;

  @Column({ name: 'is_show_password_change_banner', nullable: false, default: true, comment: '암호 변경 권고 배너' })
  isShowPwChnageBanner: boolean;

  static ofForUpsertUser(password: string, salt: string, isShowPwChnageBanner = true) {
    const instance = new UsersPassword();
    instance.password = password;
    instance.salt = salt;
    instance.isShowPwChnageBanner = isShowPwChnageBanner;
    return instance;
  }
}