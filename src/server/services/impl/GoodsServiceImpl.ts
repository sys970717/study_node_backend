import GoodsService from '../GoodsService';
import Service from '../Service';
import Logger from '../../util/Logger';
import Goods from '../../domains/entity/Goods';
import { GoodsDto } from '../../domains/dto/goods/IGoods';
import CategoryDto from '../../domains/dto/category/CategoryDto';
import Category from '../../domains/entity/Category';

export default class GoodsServiceImpl extends Service implements GoodsService {
  public async getGoodsList(show?: boolean): Promise<GoodsDto[]> {
    const goods = await this.ctx.goodsRepository.inquiry();

    return goods.filter(g => g.isShow === true)
      .map(o => GoodsDto.of(o.name, o.price, CategoryDto.ofCategoryEntity(o.category), o.id));
  }

  public async createGoods(name: string, price: number, category: CategoryDto): Promise<GoodsDto> {
    const categoryEntity = Category.ofForCreate(category.name, category.id, category.sort, category.description, category.isShow);
    const result = await this.ctx.goodsRepository.register(Goods.ofForCreate(name, price, true, categoryEntity));
    return GoodsDto.of(name, price, category, result.id);
  }

}