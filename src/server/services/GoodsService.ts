import CategoryDto from '../domains/dto/category/CategoryDto';
import { GoodsDto } from '../domains/dto/goods/IGoods';

export default interface GoodsService {
  getGoodsList(show?: boolean): Promise<GoodsDto[]>;
  createGoods(name: string, price: number, category: CategoryDto): Promise<GoodsDto>;
}