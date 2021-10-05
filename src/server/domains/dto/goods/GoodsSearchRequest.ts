import CategoryDto from "../category/CategoryDto";
import { PageRequest } from "../PageRequest";
import { IGoodsSearchDto } from "./IGoods";

export default class GoodsSearchRequest extends PageRequest implements IGoodsSearchDto{
  price: number;
  name: string;
  category?: CategoryDto;
  description?: string;

  constructor() {
    super();
  }

  static ofForCreate(pageNo, pageSize, name?: any, price?: number | null, category?: CategoryDto | null, description?: string | null) {
    const instance = new GoodsSearchRequest();
    instance.pageNo = pageNo;
    instance.pageSize = pageSize;
    instance.name = name;
    instance.price = price || 0;
    instance.category = category;
    instance.description = description;

    return instance;
  }
}