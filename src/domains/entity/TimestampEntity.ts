import { BaseEntity, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from "typeorm";

export default class TimestampEntity extends BaseEntity{
  @CreateDateColumn({ name: 'created_at'})
  createdAt!: Date;
  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt!: Date;

  @BeforeUpdate()
  public setUpdateDate(): void {
    this.updatedAt = new Date();
  }
}