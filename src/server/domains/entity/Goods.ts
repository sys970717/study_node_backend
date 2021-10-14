import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import Category from './Category';
import BaseTimeEntity from './BaseTimeEntity';
import CreateUniqueId from '../../util/CreateUniqueId';

@Entity({ name: 'goods' })
@Index('search-name-isShow-idx', ["name", "isShow"])
export default class Goods extends BaseTimeEntity {
  @Column({ name: 'name', nullable: false, comment: '상품명' })
  name: string;

  @Column({ name: 'price', default: 0, comment: '정가', nullable: false })
  price: number;

  @Column({ name: 'is_show', default: true, comment: '노출여부', nullable: false, })
  isShow: boolean;

  @Column({ name: 'description', comment: '상품설명', type: 'text'  })
  description: string;

  @Column({ name: 'goods_cd', nullable: false, unique: true, comment: '상품코드', type: 'varchar', length: 15 })
  @Index('goods-cd-idx')
  goodsCode: string;
  
  @ManyToOne(type => Category, category => category.id)
  @JoinColumn({ name: 'category_id' })
  @Index("category-join-idx")
  category: Category;

  static ofForCreate(name: string, price: number, isShow = true, category: Category, goodsCode?, description?: string) {
    const instance = new Goods();
    const createUniqIdUtil = new CreateUniqueId();
    console.log(goodsCode || createUniqIdUtil.getRandomStringByType(createUniqIdUtil._getTypeCode().GOODS));
    
    instance.name = name;
    instance.price = price;
    instance.goodsCode = goodsCode || createUniqIdUtil.getRandomStringByType(createUniqIdUtil._getTypeCode().GOODS);
    instance.isShow = isShow;
    instance.category = category;
    instance.description = description;
    return instance;
  }

  change(name: string, price: number, description: string, isShow: boolean): void {
    this.name = name;
    this.price = price;
    this.description = description;
    this.isShow = isShow;
  }
}

