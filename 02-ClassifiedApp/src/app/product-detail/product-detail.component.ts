import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ProductDetail, ProductImage, ProductDetailModelResponse } from '../_models/product-detail-model';
import { AuthenticationService } from '../_services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _authService: AuthenticationService) {

  }


  prodId: string;
  productResponse = {} as ProductDetailModelResponse;
  product: ProductDetail;
  productImage: ProductImage[];

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  baseUrl = environment.apiUrl;

  
  productOwner: number = 0;
  loggedInUserId: number = 0;

  ngOnInit(): void {
    
    this.loggedInUserId = this._authService.currentUser.user.id;

    this.activatedRoute.paramMap.subscribe((x) => {
      this.prodId = x.get('id') || '';
      this.getProductDetail(this.prodId);

      this.galleryOptions = [
        {
          width: '100%',
          //height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          previewCloseOnClick: true,
  
        },
        // max-width 800
        {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
        },
        // max-width 400
        {
          breakpoint: 400,
          preview: true
        }
      ];
    });

  }

  setImagesOnGallary() {

    for (var i in this.productImage) {
      this.galleryImages.push({
        small: this.baseUrl+this.productImage[i].image,
        medium: this.baseUrl + this.productImage[i].image,
        big: this.baseUrl + this.productImage[i].image,
        url: this.baseUrl + this.productImage[i].image
      });
    }
  }

  chatUser() {
    //TODO
    //ReceiverID would be Owner of this product
    //SenderID would be LoggedIn user:

    this.router.navigate(['./home/chat', { prodId: this.product.id, rec: this.product.owner }]);
  }

  // API CALLING
  getProductDetail(productID: string) {
    this._productService.getProductsDetail(productID).subscribe(data => {
      let p = data.products;
      this.productResponse = { products: p } as ProductDetailModelResponse;
      this.product = this.productResponse.products[0];
      this.productImage = data.productImages;


      this.productOwner = data.products[0].owner;

      this.setImagesOnGallary();
    }, error => {
      console.log(error);
    });
  }

}
