import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { Constants } from '../../assets/constants';
import { IProductModel } from '../models/iproduct-model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  ProductList: IProductModel[] = [];
  ModalTitle = "";
  var_productName = '';
  ActivateAddEditprodComp: boolean = false;
  prod: any;
  searchterm:string='';

  constructor(private productService: ProductService, private modalService: NgbModal) { }



  ngOnInit(): void {
    this.refreshProdList();
  }


  addClick() {
    this.prod = {
      id: 0,
      fK_CategoryId: 0,
      fK_SubCategoryId: 0,
      code: '',
      name: '',
      description: '',
      image: Constants.IMAGE_BASE_URL + "Default.png",
      price: 0,
      active: true,
      createdOn: '',
      createdBy: 0,
      updatedOn: '',
      updateddBy: 0
    }
    this.ModalTitle = "Add Product";
    this.ActivateAddEditprodComp = true;
  }

  editClick(item: any) {
    this.prod = item;
    this.ModalTitle = "Edit Product";
    this.ActivateAddEditprodComp = true;
  }

  deleteClick(content: any, item: any) {
    this.var_productName = item.name;

    this.modalService
      .open(content, { ariaLabelledBy: 'deleteModal' })
      .result.then(
        (result) => {
          if (result === 'Yes') {
            this.productService.deleteProduct(item.id).subscribe((result: any) => {
              this.refreshProdList();
            }, error => console.error(error));
          }
        }
    );
  }

  closeClick() {
    this.ActivateAddEditprodComp = false;
    this.refreshProdList();
  }

  refreshProdList() {
    this.productService.getProductList().subscribe(data => {
      this.ProductList = data;
    });
  }

  searchProduct() {
    if (this.searchterm !== '' && this.searchterm !== undefined) {
      this.productService.searchProduct(this.searchterm).subscribe(data => {
        this.ProductList = data;
      });
    }
    else {
      this.productService.getProductList().subscribe(data => {
        this.ProductList = data;
      });
    }
  }
  omit_special_char(event: any) {
    var k;
    k = event.charCode;
    if (k===13) {
      if (this.searchterm !== '' && this.searchterm !== undefined && this.searchterm.length > 1) {
        this.searchProduct();
      }
    }
    if (this.searchterm === '') {
      this.refreshProdList();
    }
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
}
