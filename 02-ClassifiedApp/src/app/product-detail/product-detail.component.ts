import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private router:Router,
    private activatedRoute: ActivatedRoute ) { 

    }
  
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit(): void {

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

    this.galleryImages = [
      {
        small: 'assets/images/gallery/abc1.jpg',
        medium: 'assets/images/gallery/abc1.jpg',
        big: 'assets/images/gallery/abc1.jpg'
      },
      {
        small: 'assets/images/gallery/abc2.jpg',
        medium: 'assets/images/gallery/abc2.jpg',
        big: 'assets/images/gallery/abc2.jpg'
      },
      {
        small: 'assets/images/gallery/abc3.jpg',
        medium: 'assets/images/gallery/abc3.jpg',
        big: 'assets/images/gallery/abc3.jpg'
      },
      {
        small: 'assets/images/gallery/abc4.jpg',
        medium: 'assets/images/gallery/abc4.jpg',
        big: 'assets/images/gallery/abc4.jpg'
      },
    
    ];
  }

  chatUser(){
    this.router.navigate(['./chat']);
  }

}
