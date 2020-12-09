import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryModelResponse } from '../_models/category-model';
import { ProductModelResponse } from '../_models/product-model';
import { CategoriesService } from '../_services/categories.service';
import { ProductService } from '../_services/product.service';

@Component({
	selector: 'CategoryListAndProduct',
	templateUrl: 'CategoryListAndProduct.component.html'
})

export class CategoryListAndProductComponent implements OnInit {
	
	categories = {} as CategoryModelResponse;
	products = {} as ProductModelResponse;
	searchText : string = '';

	cate: string = '';

	constructor(private _http: HttpClient,
		private _categoryService: CategoriesService,
		private _productService: ProductService){
	}
	
	ngOnInit() { 

		//Get Products
		this._categoryService.getAllCategories().subscribe(data=> {
			this.categories = data;
		}, err => {    
			console.log(err);
		}); 

		this.getProducts();

		this._productService.productsDataFromDatabase.subscribe(data=> {

			this.products = data;

		}, error=>{})
	}

	
	getProducts(){
			//Only get first time data from the database then filter from the memory			
			//this._productService.getProductsFromDatabase();			
			// this._productService.filteredData.subscribe(data=> {
			// 	this.products = data;
			// }, error=>{console.log(error)})

			
		this._productService.getProducts().subscribe(data=> {
			this._productService.productsDataFromDatabase.next(data);
		}, error=>{console.log(error)});

		




	}

	onCategory(catId: number){

		this._productService.getProducts().subscribe(data=> {

			let p = data.products.filter(m=> m.category == catId);
			this._productService.productsDataFromDatabase.next({products: p} as ProductModelResponse);
		}, error=>{console.log(error)});
		
		return false;
	}


}