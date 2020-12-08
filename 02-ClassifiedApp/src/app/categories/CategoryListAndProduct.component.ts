import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryModelResponse } from '../_models/category-model';
import { ProductModelResponse } from '../_models/product-model';
import { CategoriesService } from '../_services/categories.service';
import { ProductService } from '../_services/product.service';

@Component({
	selector: 'CategoryListAndProduct',
	templateUrl: 'CategoryListAndProduct.component.html'
})

export class CategoryListAndProductComponent implements OnInit {
	
	categories: CategoryModelResponse | undefined;
	products: ProductModelResponse | undefined;
	searchText : string = '';

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
	}

	getProducts(searchQuery: string = ''){
		
				//Get Products
				this._productService.getProducts(this.searchText).subscribe(data=> {			
					this.products = data
				}, err => {
					console.log(err);
				});
	}

	// onSearch(searchQuery:string){
	// 		this.getProducts(searchQuery);

	// }


}