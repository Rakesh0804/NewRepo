export interface ISubCategoryModel {
  id: number;
  fK_CategoryId: number;
  name: string;
  description: string;
  image: string;
  active: boolean;
  createdOn: string;
  createdBy: number;
  updatedOn: string;
  updateddBy: number;
}
