import CategoryDto from '../domains/dto/CategoryDto';
import GoodsDto from '../domains/dto/GoodsDto';

export default interface GoodsService {
  getGoodsList(show?: boolean): Promise<GoodsDto[]>;
  createGoods(name: string, price: number, category: CategoryDto): Promise<GoodsDto>;
}