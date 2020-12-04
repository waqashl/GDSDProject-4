import { Component, OnInit } from '@angular/core';
import {FakeServiceForTestingService} from '../_services/fake-service-for-testing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _fakeService: FakeServiceForTestingService) { }

  testData: any;


  ngOnInit(): void {

    this._fakeService.getData().subscribe(data=> {
      this.testData = data
    }, error=>{
      console.log("error");
    })


  }

}
