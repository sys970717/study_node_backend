import { IGoodsCreateDto } from "../../../domains/dto/goods/IGoods";
import GoodsSearchRequest from '../../../domains/dto/goods/GoodsSearchRequest';

export default interface GoodsService {
  createGoods(goodsDto: IGoodsCreateDto)
  searchGoods(params: GoodsSearchRequest)
  updateGoods(name: string, price: number, description: string, isShow: boolean)
}