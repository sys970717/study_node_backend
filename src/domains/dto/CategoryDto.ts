import Category from "../entity/Category";

export default class CategoryDto {
  public id: number;
  public name: string;
  public sort: number;
  public description: string;
  public isShow: boolean;

  constructor(id?: number, name?: string, sort?: number, description?: string, isShow = true) {
    this.id = id;
    this.name = name;
    this.sort = sort;
    this.description = description;
    this.isShow = isShow;
  }

  static ofCategoryEntity(category: Category) {
    return new CategoryDto(category.id, category.categoryName, category.categorySortNumber, category.description);
  }
}