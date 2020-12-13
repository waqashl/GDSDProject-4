import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.component.html',
  styleUrls: ['./sell-item.component.css']
})
export class SellItemComponent implements OnInit {

  submittedSuccessfully = false;

  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    window.scroll(0,0);
    this.submittedSuccessfully = true;
  }

}
