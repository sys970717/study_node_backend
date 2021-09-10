import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import Category from './Category';
import TimestampEntity from './TimestampEntity';

@Entity({ name: 'goods' })
export default class Goods extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name', nullable: false, comment: '상품명' })
  name: string;

  @Column({ name: 'price', default: 0, comment: '정가', nullable: false })
  price: number;

  @Column({ name: 'is_show', default: true, comment: '노출여부', nullable: false, })
  @Index('goods-show-idx')
  isShow: boolean

  @Column({ name: 'description', comment: '상품설명', type: 'text'  })
  description: string
  
  @ManyToOne(type => Category, category => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  static ofForCreate(name: string, price: number, isShow = true , category: Category, description?: string) {
    const instance = new Goods();
    instance.name = name;
    instance.price = price;
    instance.isShow = isShow,
    instance.category = category;
    instance.description = description;
    return instance;
  }
}

