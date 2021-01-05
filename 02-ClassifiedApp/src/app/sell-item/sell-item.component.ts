import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AddItemDTO} from '../_models/add-item-dto';
import { ProductService } from '../_services/product.service';
import { Category, CategoryModelResponse } from 'src/app/_models/category-model';
import { CategoriesService } from '../_services/categories.service';
@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.component.html',
  styleUrls: ['./sell-item.component.css']
})

// class ImageSnippet {
//   constructor(public src: string, public file: File) {}
// }

// @Component({
//   selector: 'bwm-image-upload',
//   templateUrl: 'image-upload.component.html',
//   styleUrls: ['image-upload.component.scss']
// })



export class SellItemComponent implements OnInit {

  submittedSuccessfully = false;
  errorMessage = false;
  errorMessageText = 'All Fields are manadatory'
  addItemFormGroup: FormGroup;
  category = {} as CategoryModelResponse;
  selectedCategoryID;
  productName = "";
  productDesc = "";
  productPrice = 0;
  selectedFile: File = null;

  constructor(private fb: FormBuilder,
    private _productService: ProductService, private _categoriesService: CategoriesService) { 

  }

  ngOnInit(): void {

    // get the list of categories
    this.getCategories();

    // add form validation
    this.addItemFormGroup = this.fb.group({
      productName: ['', Validators.required],
      productDesc: ['', Validators.required],
      productPrice: ['', Validators.required]
    });
  }


  selectCategoryOption() {
    // this.selectedCategoryID = id;
    console.log(this.selectedCategoryID);
  }

  processFile(event) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    console.log(event);
  }

  getCategories() {
    // call category service to get categories
    this._categoriesService.getAllCategories().subscribe(data=>{
      let p = data.categories;
      this.category = {categories: p} as CategoryModelResponse;
      console.log(data);
    }, error=> {
      console.log(error);
    })
  }

  submit(){
    
    console.log('working');
    this.errorMessage = false;
    if(this.addItemFormGroup.valid)
    {
      // let productDto = {} as AddItemDTO;
      // productDto.title = this.addItemFormGroup.get('productName')?.value;
      // productDto.desc = this.addItemFormGroup.get('productDesc')?.value;
      // productDto.price = this.addItemFormGroup.get('productPrice')?.value;
      // productDto.owner = 1;
      // productDto.location = '';
      // productDto.category = 1; //this.selectedCategoryID;
      // productDto.images = this.selectedFile;

      if (this.selectedFile == null) {
        this.errorMessage = true;
        window.scroll(0,0);
        this.errorMessageText = "Please select image(s).";
      } else {

        this.errorMessage = false;

        const fd = new FormData();
        fd.append('title', this.addItemFormGroup.get('productName')?.value);
        fd.append('desc', this.addItemFormGroup.get('productDesc')?.value);
        fd.append('price', this.addItemFormGroup.get('productPrice')?.value);
        fd.append('owner', "1");
        fd.append('location', "");
        fd.append('category', "1");
        fd.append('images', this.selectedFile, this.selectedFile?.name);

        console.log("Ready to roll");
        this._productService.addProduct(fd).subscribe(data=>{
          window.scroll(0,0);
          this.submittedSuccessfully = true;
        }, error=> {
          console.log(error);
        });
      }
    } else {
      this.errorMessage = true;
      window.scroll(0,0);
      
      if (this.addItemFormGroup.get('productName')?.value == "") {
        this.errorMessageText = "Please enter product name.";
      } else if (this.addItemFormGroup.get('productDesc')?.value == "") {
        this.errorMessageText = "Please enter product description.";
      } else if (this.addItemFormGroup.get('productPrice')?.value == "") {
        this.errorMessageText = "Please enter product price.";
      } else {
        let priceStr = this.addItemFormGroup.get('productPrice')?.value as string;
        let priceNum = Number(priceStr);
        if (priceNum == null) {
          this.errorMessageText = "Please enter correct price!";
        } else if (priceNum < 0) {
          this.errorMessageText = "Please enter price greater then zero!";
        }
      }
    }
  }

}
