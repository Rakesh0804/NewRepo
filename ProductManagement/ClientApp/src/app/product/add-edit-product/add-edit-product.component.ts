import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { Constants } from '../../../assets/constants';
import { ICategoryModel } from '../../models/icategory-model';
import { ISubCategoryModel } from '../../models/isub-category-model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  fileUploadResponce: FileResponce[] = [];
  public productEdit: any;
  constructor(private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private productService: ProductService, private modalService: NgbModal) { }

  @Input() prod: any;
  id = 0;
  fK_CategoryId = 0;
  fK_SubCategoryId = 0;
  code = '';
  name = '';
  description = '';
  image = Constants.IMAGE_BASE_URL + "Default.png";
  price = 0;
  active = true;
  createdOn = '';
  createdBy = 1;
  updatedOn = '';
  updateddBy = 1;
  CategorytList: ICategoryModel[] = [];
  SubCategorytList: ISubCategoryModel[] = [];
  PhotoFileName = "Default.png";
  PhotoFilePath = this.image;
  message = '';
  modalTitle = '';

  ngOnInit(): void {
    this.loadProductList();
  }


  loadProductList() {

    this.categoryService.getCategoryIdNameList().subscribe((data: any) => {
      this.CategorytList = data;
      if (this.prod.fK_CategoryId !=0) {
        this.getSubCategory(this.prod.fK_CategoryId);
      }      

      this.id = this.prod.id;
      this.fK_CategoryId = this.prod.fK_CategoryId;
      this.fK_SubCategoryId = this.prod.fK_SubCategoryId;
      this.code = this.prod.code;
      this.name = this.prod.name;

      this.description = this.prod.description;
      this.image = this.prod.image;
      this.PhotoFilePath = this.prod.image;
      this.price = this.prod.price;
      this.active = this.prod.active;

      this.createdOn = this.prod.createdOn;
      this.createdBy = this.prod.createdBy;
      this.updatedOn = this.prod.updatedOn;
      this.updateddBy = this.prod.updateddBy;

      //this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
    });
  }

  addProduct(content: any) {
    this.productEdit = {
      fK_CategoryId: this.fK_CategoryId,
      fK_SubCategoryId: this.fK_SubCategoryId,
      code: this.code,
      name: this.name,
      description: this.description,
      image: this.image,
      price: this.price,
      active: true,
      createdOn: new Date(),
      createdBy: 1,
      updatedOn: new Date(),
      updateddBy: 1
    };

    this.productService.addProduct(this.productEdit).subscribe(res => {
      this.message = 'Product Insert Successfull.';
      this.modalTitle = 'Information'
      this.modalService
        .open(content, { ariaLabelledBy: 'InfoModal' })
        .result.then(
          (result) => {
            if (result === 'OK') {
            }
          }
        );
    });
  }

  updateProduct(content: any,) {
    this.productEdit = {
      id: this.id,
      fK_CategoryId: this.fK_CategoryId,
      fK_SubCategoryId: this.fK_SubCategoryId,
      code: this.code,
      name: this.name,
      description: this.description,
      image: this.image,
      price: this.price,
      active: true,
      createdOn: new Date(),
      createdBy: 1,
      updatedOn: new Date(),
      updateddBy: 1
    }

    this.productService.updateProduct(this.productEdit).subscribe(res => {
      this.message = 'Product Update Successfull.';
      this.modalTitle='Information'
      this.modalService
        .open(content, { ariaLabelledBy: 'InfoModal' })
        .result.then(
          (result) => {
            if (result === 'OK') {
            }
          }
        );

    });
  }


  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.productService.uploadPhoto(formData).subscribe((data: any) => {
      //this.fileUploadResponce = data;
      console.log('Logging Upload Result: ');
      console.log(data);
      if (data !== null || data !== undefined) {
        this.PhotoFileName = data.fileName;
        console.log('Return File Name: ' + data.fileName);

        this.PhotoFilePath = Constants.IMAGE_BASE_URL + this.PhotoFileName;
        this.image = this.PhotoFilePath;
      }
    })
  }

  getSubCategory(categId: number) {
    console.log(categId);
    if (categId !== 0) {
      this.subcategoryService.getSubCategoryByCategoryIdList(categId).subscribe((data: any) => {
        this.SubCategorytList = data;
      });
    }
  }
}

interface FileResponce {
  message: string;
  fileName: string;
}
