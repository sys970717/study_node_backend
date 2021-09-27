import { IGoodsCreateDto } from "../../../domains/dto/IGoods";

export default interface GoodsService {
  createGoods(goodsDto: IGoodsCreateDto)
}