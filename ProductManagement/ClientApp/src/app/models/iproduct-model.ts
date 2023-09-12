export interface IProductModel {
  id: number;
  fK_CategoryId: number;
  categoryName: string;
  fK_SubCategoryId: number;
  subCategoryName: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  active: boolean;
  createdOn: string;
  createdBy: number;
  updatedOn: string;
  updateddBy: number;
}
