import GoodsSearchRequest from '../domains/dto/goods/GoodsSearchRequest';
import CategoryDto from '../domains/dto/category/CategoryDto';
import { GoodsDto, GoodsInfoDto } from '../domains/dto/goods/IGoods';

export default interface GoodsService {
  searchGoods(params: GoodsSearchRequest);
  createGoods(name: string, price: number, category: CategoryDto): Promise<GoodsDto>;
  viewDetail(id: number): Promise<GoodsInfoDto>;
}