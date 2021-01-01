import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AddItemDTO} from '../_models/add-item-dto';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.component.html',
  styleUrls: ['./sell-item.component.css']
})


export class SellItemComponent implements OnInit {

  submittedSuccessfully = false;
  errorMessage = false;
  errorMessageText = 'All Fields are manadatory'
  addItemFormGroup: FormGroup;

  productName = "";
  productDesc = "";
  productPrice = 0;
  productImage = File;

  constructor(private fb: FormBuilder,
    private _productService: ProductService) { 

  }

  // constructor(private http: HttpClient) { }

// this.http.post<any>(`${environment.ServiceUrl}/LifePremiumV2/GetLossRatios`, data).subscribe((res) => {
//     });
// const data = {
//       CLientName: value
//     };

  ngOnInit(): void {

    // this.heroForm = new FormGroup({
    //   name: new FormControl(this.hero.name, [
    //     Validators.required,
    //     Validators.minLength(4),
    //     forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
    //   ]),
    //   alterEgo: new FormControl(this.hero.alterEgo),
    //   power: new FormControl(this.hero.power, Validators.required)
    // });

    this.addItemFormGroup = this.fb.group({
      productName: ['', Validators.required],
      productDesc: ['', Validators.required],
      productPrice: [0, Validators.required]
    });


  }

  submit(){

    console.log('working');
    this.errorMessage = false;
    if(this.addItemFormGroup.valid)
    {
      let productDto = {} as AddItemDTO;
      productDto.title = this.addItemFormGroup.get('productName')?.value;
      productDto.desc = this.addItemFormGroup.get('productDesc')?.value;
      productDto.price = this.addItemFormGroup.get('productPrice')?.value;
      productDto.owner = 1;
      productDto.location = '';
      productDto.category = 1;
      productDto.images = this.addItemFormGroup.get('productImage')?.value as File;


      console.log(productDto);
      this._productService.addProduct(productDto).subscribe(data=>{
        window.scroll(0,0);
        this.submittedSuccessfully = true;
      }, error=> {
        
        console.log(error);
      })
    } else {
      this.errorMessage = true;
      window.scroll(0,0);
      this.errorMessageText = "validation fail";
      console.log("validation fail");
    }

  


  }

}
