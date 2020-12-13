import { Component, Output,EventEmitter, OnInit } from '@angular/core';
import { ProductModelResponse } from '../_models/product-model';
import {FakeServiceForTestingService} from '../_services/fake-service-for-testing.service';
import { ProductService } from '../_services/product.service';
import {AuthenticationService} from '../_services/authentication.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() searchClick = new EventEmitter<string>();

  txtSearch: string = "";

  constructor(private _fakeService: FakeServiceForTestingService,
    private _productService: ProductService,private _authServie:AuthenticationService,private _router:Router) { }

  

  ngOnInit(): void {

    // this._fakeService.getData().subscribe(data=> {
    //   this.testData = data
    // }, error=>{
    //   console.log("error");
    // })    

    
	
  }

  searchClicked(){    

    //For search from the memory
    // let filteredList = this._productService.productsDataFromDatabase.getValue().products.filter(m=> m.title.toLowerCase().includes(this.txtSearch.toLowerCase()));
    // let p = {} as ProductModelResponse;
    // p.products = filteredList;    
    // this._productService.filteredData.next(p);

    this._productService.getProducts(this.txtSearch).subscribe(data=> {
      this._productService.productsDataFromDatabase.next(data);
    }, error=> {
    });
    //this._productService.testData.next("this is new data");
    //this._productService.getProducts(this.txtSearch);
  }

  logout(){
    this._authServie.logout()
    this._router.navigate(['/login']);
  }

}
