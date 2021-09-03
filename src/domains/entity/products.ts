import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export default class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'price', default: 0, })
  price: number;

  @CreateDateColumn({ name: 'create_at' })
  createAt!: Date;
  @UpdateDateColumn({ name: 'update_at' })
  updateAt!: Date;
}

