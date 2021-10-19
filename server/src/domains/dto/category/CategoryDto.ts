import Category from "../../entity/Category";

export default class CategoryDto {
  public id: number;
  public name: string;
  public sort: number;
  public description: string;
  public isShow: boolean;
  public categoryRef: number;

  constructor(id?: number, name?: string, sort?: number, description?: string, isShow = true, categoryRef?: number) {
    this.id = id;
    this.name = name;
    this.sort = sort;
    this.description = description;
    this.isShow = isShow;
    this.categoryRef = categoryRef;
  }

  static ofCategoryEntity(category: Category) {
    return new CategoryDto(category.id, category.name, category.categorySortNumber, category.description, category.isShow, category.categoryRef);
  }
}