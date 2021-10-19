import CategoryDto from '../../../domains/dto/category/CategoryDto';

export default interface CategoryService {
  getCategoryList(show?: boolean): Promise<CategoryDto[]>;
  createCategory(name: string, categoryNumber?: number, description?: string, categoryRef?: number | null): Promise<CategoryDto>;
}