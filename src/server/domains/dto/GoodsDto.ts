import CategoryDto from './CategoryDto';

export default class GoodsDto {
  private price: number;
  private name: string;
  private category: CategoryDto;
  private description?: string;

  private goodsId: number;

  constructor(name:string, price = 0, category: CategoryDto, goodsId?: number, description?: string) {
    this.name = name;
    this.price = price;
    this.category = category;

    this.goodsId = goodsId;
    this.description = description;
  }

  static of(name, price, category: CategoryDto, id) {
    const instance = new GoodsDto(name, price, category, id);
    return instance;
  }

  static ofForCreate(name: string, price: number, category: CategoryDto) {
    const instance = new GoodsDto(name, price, category);
  }

}