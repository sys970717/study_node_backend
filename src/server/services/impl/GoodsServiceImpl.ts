import GoodsService from '../GoodsService';
import Service from '../Service';
import logger from '../../util/Logger';
import Goods from '../../domains/entity/Goods';
import { GoodsDto, GoodsInfoDto } from '../../domains/dto/goods/IGoods';
import CategoryDto from '../../domains/dto/category/CategoryDto';
import Category from '../../domains/entity/Category';
import GoodsSearchRequest from '../../domains/dto/goods/GoodsSearchRequest';
import { Page } from '../../domains/dto/Page';

export default class GoodsServiceImpl extends Service implements GoodsService {
  async searchGoods(params: GoodsSearchRequest) {
    const result = await this.ctx.goodsRepository.searchGoods(params);
    return new Page<GoodsDto> (result[1], params.pageSize, result[0].map(e => GoodsDto.of(e.name, e.price, CategoryDto.ofCategoryEntity(e.category), e.id)));
  }
  
  async viewDetail(id: number) {
    const goods = await this.ctx.goodsRepository.viewDetail(id);
    console.log(goods);
    return GoodsInfoDto.of(goods.id, goods.name, goods.price, goods.category.id, goods.description, goods.goodsCode, goods.isShow);
  }

}