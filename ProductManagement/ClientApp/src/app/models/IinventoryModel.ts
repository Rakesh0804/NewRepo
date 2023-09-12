export interface IInventoryShowModel {
  id: number;
  fK_ProductId: number;
  code: string;
  productName: string;
  quantity: number;
  price: number;
  description: string;
  productImage: string;
  createdOn: Date;
  createdBy: number;
  updatedOn: Date;
  updateddBy: number;
}

export interface IInventoryAddEditModel {
  id: number;
  fK_ProductId: number;
  quantity: number;
  active: boolean;
  productImage: string;
  createdOn: Date;
  createdBy: number;
  updatedOn: Date;
  updateddBy: number;
}
