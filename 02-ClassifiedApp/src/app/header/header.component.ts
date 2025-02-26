import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { CategoryModelResponse } from '../_models/category-model';
import { ProductModelResponse } from '../_models/product-model';
import { CategoriesService } from '../_services/categories.service';
import { FakeServiceForTestingService } from '../_services/fake-service-for-testing.service';
import { ProductService } from '../_services/product.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User, UserDetails } from '../_models/user-model';
import { ChatService } from '../_services/chat.service';
// import { truncate } from 'fs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: User;

  @Output() searchClick = new EventEmitter<string>();

  txtSearch: string = '';
  ddlCategory: string = '';
  categories = {} as CategoryModelResponse;
  chatNotificationCount: string = '';
  loggedInUserId: string = '';
  isAdmin :boolean = false;

  constructor(
    private _fakeService: FakeServiceForTestingService,
    private _productService: ProductService,
    private _authServie: AuthenticationService,
    private router: Router,
    private _categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private _chatService: ChatService
  ) {
    

    if(_authServie.currentUser) {
      this.user = _authServie.currentUser.user;
      if(this.user){
        if(this.user.userType ===0){
        this.isAdmin = true
      }
      else{
        this.isAdmin = false

      }

    }
    else {
      router.navigate(['/login']);
    }    
  }
}

  ngOnInit(): void {
    // this._fakeService.getData().subscribe(data=> {
    //   this.testData = data
    // }, error=>{
    //   console.log("error");
    // })

    //Get Categories
    this._categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {}
    );

    console.log("USER",this._authServie.currentUser);

    this.loggedInUserId = this._authServie.currentUser.user.id.toString();

    this._chatService.getNotification(this.loggedInUserId);
    this._chatService.chatNotification.subscribe((data) => {
      if (JSON.stringify(data) !== '{}') {
        //console.log('asdfasd')
        console.log(data);

        this.chatNotificationCount = data.chat[0].totalCount;
      }
  });


    
  }

  searchClicked() {
    //this.router.navigate(['/home/search'], { relativeTo: this.activatedRoute });
    //this.router.navigate(['/home/search', {s: this.txtSearch, cat: this.ddlCategory}]);
    this.redirectTo('/home/search', this.txtSearch, this.ddlCategory);

    // this._productService.getProducts(this.txtSearch).subscribe(data=> {
    //   this._productService.productsDataFromDatabase.next(data);
    // }, error=> {
    // });
  }

  logout() {
    this._authServie.logout();
    this.router.navigate(['/login']);
  }

  redirectToAdmin() {
    this.router.navigate(['/admin']);
  }

  redirectTo(uri: string, search: string, c: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri, { s: search, cat: c }]));
  }

  chat(){
    this.router
    .navigateByUrl('/', { skipLocationChange: true })
    .then(() => this.router.navigate(['/home/chat']));
  }
}
