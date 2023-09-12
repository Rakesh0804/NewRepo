import { Component, Inject, AfterViewInit, ElementRef, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Placement as ProperPlacement, Options } from '@popperjs/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { IInventoryShowModel } from '../models/IinventoryModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
//import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  public inventoryList: IInventoryShowModel[] = [];
  public inventoryAddEdit: any;
  public selectedProductId: any;
  public selectedProduct: any;
  myDate = new Date();
  public imageURL: string = '/assets/images/RakeshProfile.jpg';
  ModalTitle = "";
  editInventoryFlag: boolean = true;
  ddlFlag: boolean = true;
  public infoMsg: string = '';
  public var_inventoryId: number = 0;
  public var_fKProductId: number = 0;
  public var_productCode: string = '';
  public var_productName: string = '';
  public var_quantity: number = 0;
  public var_price: number = 0;
  public var_description: string = '';
  productList: any = [];

  @ViewChild('infoModal') infomodalContent: TemplateRef<any> | undefined;
  closeResult = '';
  currentDate = new Date();
  constructor(private inventoryService: InventoryService, private modalService: NgbModal, private productService: ProductService) {  }

  ngOnInit(): void {
    this.getInventoryList();
  }

  getInventoryList(): void {
    this.imageURL = '/assets/images/RakeshProfile.jpg';
    this.inventoryService.getInventoryList().subscribe((result: any) => {
      this.inventoryList = result;
      console.log(this.inventoryList);
    }, error => console.error(error));
  }

  deleteInventory(content: any, inventory: IInventoryShowModel): void {    
    this.var_productName = inventory.productName;

    this.modalService
      .open(content, { ariaLabelledBy: 'deleteModal' })
      .result.then(
        (result) => {
          if (result === 'Yes') {            
            this.inventoryService.deleteInventory(inventory.id).subscribe((result: any) => {
              this.getInventoryList();
            }, error => console.error(error));
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);
        }
      );    
  }
  addClick(content: any) {
      this.productService.getProductList().subscribe((data: any) => {
        this.productList = data;
        //console.log(data);
        this.var_fKProductId = 0;
        this.var_productCode = '';
        this.var_productName = '';
        this.var_description = '';
        this.var_price = 0;
        this.var_quantity = 0;
      });
    this.ModalTitle = "Add Inventory";
    this.editInventoryFlag = false;
    this.ddlFlag = true;

    this.modalService
      .open(content, { ariaLabelledBy: 'addeditModal' })
      .result.then(
        (result) => {
          if (result === 'Save') {

            if (this.inventoryList.filter((p: { fK_ProductId: any; }) => p.fK_ProductId == this.selectedProductId).length == 0) {
              this.inventoryAddEdit = {
                fK_ProductId: this.var_fKProductId,
                quantity: this.var_quantity,
                active: true,
                createdOn: new Date(),
                createdBy: 1,
                updatedOn: new Date(),
                updateddBy: 1,
              }
              this.inventoryService.addInventory(this.inventoryAddEdit).subscribe((result: any) => {
                console.log(result);
                this.getInventoryList();
              }, error => console.error(error));
            }
            else {
              this.infoMsg = 'Inventory record already present.';
              this.modalService.open(this.infomodalContent).result.then((inforesult) => {  });
            }
          }
            
        },
        (reason) => {
          this.closeResult = this.getDismissReason(reason);
          console.log(this.closeResult);
        }
      );
  }

  setSelectedProduct() {
    this.var_fKProductId = this.selectedProductId;
    this.selectedProduct = this.productList.filter((p: { id: any; }) => p.id == this.selectedProductId)
    console.log(this.selectedProduct);

    this.var_productCode = this.selectedProduct[0].code;
    this.var_productName = this.selectedProduct[0].name;
    this.var_price = this.selectedProduct[0].price;
    this.var_description = this.selectedProduct[0].description;
    this.editInventoryFlag = true;
  }

  editInventory(content: any, inventory: IInventoryShowModel): void {
    this.var_inventoryId = inventory.id;
    this.var_fKProductId = inventory.fK_ProductId;
    this.var_productCode = inventory.code;
    this.var_productName = inventory.productName;
    this.var_price = inventory.price;
    this.var_quantity = inventory.quantity;
    this.var_description = inventory.description;   
    this.ModalTitle = "Edit Inventory";
    this.editInventoryFlag = true;
    this.ddlFlag = false;

    this.modalService
      .open(content, { ariaLabelledBy: 'addeditModal' })
      .result.then(
        (result) => {
          if (result === 'Save') {
              this.inventoryAddEdit = {
                id: inventory.id,
                fK_ProductId: inventory.fK_ProductId,
                quantity: this.var_quantity,
                active: true,
                productImage: '',
                createdOn: new Date(),
                createdBy: 1,
                updatedOn: new Date(),
                updateddBy: 1,
              }
              this.inventoryService.updateInventory(this.inventoryAddEdit).subscribe((result: any) => {
                console.log(result);
                this.getInventoryList();
              }, error => console.error(error));
            }
        },
        (reason) => {
          this.closeResult = this.getDismissReason(reason);
          console.log(this.closeResult);
        }
      );
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `${reason}`;
    }
  }
}
