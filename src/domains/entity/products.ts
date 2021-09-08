import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import TimestampEntity from './TimestampEntity';

console.log('PRODUCTS');

@Entity({ name: 'products' })
export default class Products extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name', nullable: false })
  name: string;

  @Column({ name: 'price', default: 0 })
  price: number;
}

