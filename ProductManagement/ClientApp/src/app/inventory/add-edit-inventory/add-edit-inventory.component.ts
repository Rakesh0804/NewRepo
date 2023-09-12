import { Component, Input, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-inventory',
  templateUrl: './add-edit-inventory.component.html',
  styleUrls: ['./add-edit-inventory.component.css']
})
export class AddEditInventoryComponent implements OnInit {

  constructor(private inventoryService: InventoryService, private productService: ProductService) { }
  @Input() inventoryAddEdit: any;
  id = 0;
  fK_ProductId = 0;
  code = '';
  productName = '';
  price = 0;
  quantity = 0;
  description = '';
  active = true;
  productImage = 'anonymous.png';
  createdOn = new Date();
  createdBy = 1;
  updatedOn = new Date();
  updateddBy = 1;
  productList: any = [];

  ngOnInit(): void {
  }

  loadInventoryData() {

    this.productService.getProductList().subscribe((data: any) => {
      this.productList = data;

      this.id = this.inventoryAddEdit.EmployeeId;
      this.fK_ProductId = this.inventoryAddEdit.fK_ProductId;
      this.code = this.inventoryAddEdit.code;
      this.productName = this.inventoryAddEdit.productName;
      this.price = this.inventoryAddEdit.price;
      this.quantity = this.inventoryAddEdit.quantity;
      this.description = this.inventoryAddEdit.description;
      this.productImage = this.inventoryAddEdit.productImage;
    });
  }

  selectedProduct(prodselectedevent:any) {
    this.fK_ProductId = prodselectedevent.target.value;
    //this.productName = prodselectedevent.target.name;
  }
}
