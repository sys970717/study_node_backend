import CategoryDto from '../category/CategoryDto';

// search
export interface IGoodsSearchDto {
  price: number;
  name: string;
  category?: CategoryDto;
  description?: string;
}

// create
export interface IGoodsCreateDto {
  name: string;
  price: number;
  description: string;
  categoryId: number;
  isShow: boolean;
  // quantity: number;
}

export class GoodsInfoDto implements IGoodsCreateDto {
  name: string;
  price: number;
  description: string;
  categoryId: number;
  isShow: boolean;
  // quantity: number;

  static of(name: string, price: number, categoryId: number, description?: string, isShow?: boolean): GoodsInfoDto {
    const instance = new GoodsInfoDto();
    instance.name = name;
    instance.price = price;
    instance.categoryId = categoryId;
    instance.description = description;
    instance.isShow = isShow || true;

    return instance;
  }
}

export class GoodsDto {
  price: number;
  name: string;
  category: CategoryDto;
  description?: string;

  private readonly goodsId: number;

  constructor(name:string, category: CategoryDto, price: number, goodsId?: number, description?: string) {
    this.name = name;
    this.price = price || 0;
    this.category = category;

    this.goodsId = goodsId;
    this.description = description;
  }

  static of(name: string, price: number, category: CategoryDto, id: number) {
    return new GoodsDto(name, category, price, id);
  }

  static ofForCreate(name: string, price: number, category: CategoryDto) {
    return new GoodsDto(name, category, price);
  }
}