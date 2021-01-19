import { Component, OnInit } from '@angular/core';
import { Category } from '../_models/category-model';
import { Product, ProductModelResponse } from '../_models/product-model';
import { UserModelResponse } from '../_models/user-model';
import { CategoriesService } from '../_services/categories.service';
import { ProductService } from '../_services/product.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  products: ProductModelResponse
  users: UserModelResponse[]
  tab: number = 1
  categories: Category[]
  category: string;


  constructor(private _productService: ProductService, private _userService: UserService, private _categoryService: CategoriesService) {
  }

  addCategory() {
    if (this.category) {
      this._categoryService.addCategory(this.category)
      this.category = ""
      this.getCategories()
    }
  }

  deleteCategory(id) {
    if (id) {
      this._categoryService.deleteCategory(+id)
      this.getCategories()
    }
  }

  ngOnInit(): void {
    this.updateProducts()
    this.getUsers()
    this.getCategories()
  }

  getProducts() {
    this._productService.getAllProducts().subscribe(data => {
      this._productService.productsDataFromDatabase.next(data);
    }, error => { console.log(error) });

  }

  getCategories() {
    this._categoryService.getAllCategoriesForAdmin().subscribe(data => {
      this.categories = data.categories
      console.log(this.categories)
    }, error => { console.log(error) })
  }

  getUsers() {
    this._userService.getAllUser().subscribe(data => {
      this.users = data;
      console.log(data)
    }, error => { console.log(error) });
  }

  updateProducts() {
    this.getProducts();

    this._productService.productsDataFromDatabase.subscribe(data => {

      this.products = data;
      console.log(data)

    }, error => { })
  }

  approve(id: number) {
    console.log(id)
    this._productService.updateProductStatus(id, "approve")
    this.updateProducts()
  }

  decline(id: number) {
    console.log(id)
    this._productService.updateProductStatus(id, "decline")
    this.updateProducts()
  }

  changeUserStatus(id: number, status: number) {
    console.log(id)
    if (status == 1) {
      this._userService.updateUserStatus(id, "block")
    }
    else {
      this._userService.updateUserStatus(id, "unblock")
    }
    this.getUsers()
  }

  switchTab(tab: number) {
    this.tab = tab
  }

}
