import CategoryDto from '../../../domains/dto/CategoryDto';

export default interface CategoryService {
  getCategoryList(show?: boolean): Promise<CategoryDto[]>;
  createCategory(name: string, categoryNumber?: number, description?: string): Promise<CategoryDto>;
}