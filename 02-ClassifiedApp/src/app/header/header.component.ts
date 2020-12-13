import { Component, Output,EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { CategoryModelResponse } from '../_models/category-model';
import { ProductModelResponse } from '../_models/product-model';
import { CategoriesService } from '../_services/categories.service';
import {FakeServiceForTestingService} from '../_services/fake-service-for-testing.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() searchClick = new EventEmitter<string>();

  txtSearch: string = "";
  ddlCategory: string = "";
  categories = {} as CategoryModelResponse;

  constructor(private _fakeService: FakeServiceForTestingService,
    private _productService: ProductService,
    private _categoryService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  

  ngOnInit(): void {

    // this._fakeService.getData().subscribe(data=> {
    //   this.testData = data
    // }, error=>{
    //   console.log("error");
    // })    

    //Get Categories
    this._categoryService.getAllCategories().subscribe(data=> {
      this.categories = data;
    }, error=>{})
	
  }

  searchClicked(){    

    //this.router.navigate(['/home/search'], { relativeTo: this.activatedRoute });
    //this.router.navigate(['/home/search', {s: this.txtSearch, cat: this.ddlCategory}]);
    this.redirectTo('/home/search', this.txtSearch, this.ddlCategory);

    // this._productService.getProducts(this.txtSearch).subscribe(data=> {      
    //   this._productService.productsDataFromDatabase.next(data);
    // }, error=> {
    // });
 
  }

  redirectTo(uri:string, search: string, c: string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri, {s: search, cat: c}]));
 }

}
