import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private _productService: ProductService) { }

  searchString: string;
  categoryId: number;

  ngOnInit(): void {

    console.log(this.searchString);

    this.activatedRoute.paramMap.subscribe(x => {
      this.searchString = x.get('s') || '';      
      this.categoryId = parseInt(x.get('cat') || '0');

      this._productService.filter.cat = this.categoryId;
      this._productService.filter.search = this.searchString;

    });
  }

}
