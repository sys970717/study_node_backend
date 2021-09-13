import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Goods from './Goods';
import TimestampEntity from './TimestampEntity';

@Entity({ name: 'category'})
export default class Category extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_name', nullable: false, unique: true, comment: '카테고리 명' })
  categoryName: string;

  @Column({ name: 'category_sort', default: 0, nullable: false, unique: true, comment: '카테고리 정렬순서' })
  categorySortNumber: number;

  @Column({ name: 'description', nullable: true, comment: '카테고리 간략 설명', length: 100 })
  description: string;

  @Column({ name: 'isShow', default: true, nullable: false, comment: '노출여부' })
  isShow: Boolean;

  @Column({ name: 'categoryRef', nullable: true, comment: '상위 카테고리 코드' })
  categoryRef: number;

  @OneToMany((type) => Goods, (goods) => goods.category)
  goods?: Goods[];

  static ofForCreate(categoryName: string, id?: number, categorySortNumber?: number, description?: string, isShow: Boolean = true) {
    const instance = new Category();
    instance.id = id;
    instance.categoryName = categoryName;
    instance.categorySortNumber = categorySortNumber;
    instance.description = description;
    instance.isShow = isShow;
    return instance;
  }
}