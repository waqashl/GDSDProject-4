import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../_services/categories.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _categoryService:CategoriesService,
    private _productService: ProductService) { }

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe(data=> {return console.log(data.categories)}, err => {});
    this._productService.getProducts().subscribe(data=> {return console.log(data.products)}, err => {});
  }

}