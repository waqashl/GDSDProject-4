import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  searchString: string;
  categoryId: number;

  ngOnInit(): void {

    console.log(this.searchString);

    this.activatedRoute.paramMap.subscribe(x => {
      this.searchString = x.get('s') || '';      
      this.categoryId = parseInt(x.get('cat') || '0');

      console.log(this.searchString);
      console.log(this.categoryId);
    });
  }

}
