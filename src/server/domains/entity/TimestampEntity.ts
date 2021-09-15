import { BaseEntity, BeforeUpdate, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export default class TimestampEntity extends BaseEntity{
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({ name: 'created_at', readonly: true })
  createdAt!: Date;
  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt!: Date;
}