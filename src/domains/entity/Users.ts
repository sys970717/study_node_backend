import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'users' })
export default class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, })
  name: string;

  @Column({ name: 'gender', nullable: false })
  gender: boolean;

  @Column({ name: 'cash', nullable: false, type: 'bigint' })
  cash: number;

  @CreateDateColumn({ name: 'create_at' })
  createAt!: Date;
  @UpdateDateColumn({ name: 'update_at' })
  updateAt!: Date;
};

