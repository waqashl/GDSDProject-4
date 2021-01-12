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
  selectedFile: File[] = [];
  ddlCategory: string = '';


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

  // HTML Events

  selectCategoryOption() {
    // this.selectedCategoryID = id;
    console.log(this.selectedCategoryID);
  }

  processFile(event) {
    const files: File[] = event.target.files;
    this.selectedFile = files;
    console.log(event);
  }


  // API CALLINGS

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

  callProductPosting() {
    this.errorMessage = false;

    const fd = new FormData();
    fd.append('title', this.addItemFormGroup.get('productName')?.value);
    fd.append('desc', this.addItemFormGroup.get('productDesc')?.value);
    fd.append('price', this.addItemFormGroup.get('productPrice')?.value);
    fd.append('owner', "1");
    fd.append('location', "Fulda");
    fd.append('category', "1");
    // fd.append('images', JSON.stringify(this.selectedFile));
    for (let file of this.selectedFile) {
      fd.append('images', file);
    }

    console.log("Ready to roll");
    this._productService.addProduct(fd).subscribe(data=>{
      window.scroll(0,0);
      this.submittedSuccessfully = true;
    }, error=> {
      console.log(error);
    });
  }

  // ACTIONS
  submit(){
    
    console.log('working');
    // console.log(this.ddlCategory);
    
    this.errorMessage = false;
    if(this.addItemFormGroup.valid)
    {
      if (this.selectedFile == null) {
        this.errorMessage = true;
        window.scroll(0,0);
        this.errorMessageText = "Please select image(s).";
      } else {
        this.callProductPosting();
      }
    } else {
      this.errorMessage = true;
      window.scroll(0,0);
      this.validateFields();
    }
  }

  // VALIDATIONS

  validateFields() {
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
