import { Component, OnInit } from '@angular/core';
import { Product, ProductModelResponse } from '../_models/product-model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products:ProductModelResponse

  constructor(private _productService : ProductService) {

  

}

  ngOnInit(): void {
   this.updateProducts()
  }

  getProducts(){
    //Only get first time data from the database then filter from the memory			
    //this._productService.getProductsFromDatabase();			
    // this._productService.filteredData.subscribe(data=> {
    // 	this.products = data;
    // }, error=>{console.log(error)})

    
  this._productService.getAllProducts().subscribe(data=> {
    this._productService.productsDataFromDatabase.next(data);
  }, error=>{console.log(error)});


  }

  updateProducts(){
    this.getProducts();

		this._productService.productsDataFromDatabase.subscribe(data=> {

      this.products = data;
      console.log(data)

		}, error=>{})
  }

  approve(id:number){
    console.log(id)
    this._productService.updateProductStatus(id,"approve")
    this.updateProducts()
  }

  decline(id:number){
    console.log(id)
    this._productService.updateProductStatus(id,"decline")
    this.updateProducts()
  } 


}
