import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../_services/categories.service';
import { ProductService } from '../_services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm?: FormGroup;
  loading = false;
  submitted = false;
  returnUrl?: string;
  error = '';




  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in



    if (this.authenticationService.currentUser) {
      console.log("on login", this.authenticationService.currentUser)    
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm?.controls; }

  onSubmit() {
    this.submitted = true;
    console.log("submit", this.f);

    // stop here if form is invalid
    if (this.loginForm?.invalid) {
      return;
    }

    this.loading = true;


    this.authenticationService.login(this.f?.email.value, this.f?.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.status !== "Failed"){
            localStorage.setItem('currentUser', JSON.stringify(data));
            this.router.navigate([this.returnUrl]);
          }
          else{
            this.error = data.message;
            this.loading = false;
          }
        },
        error => {
          this.error = error.message;
          this.loading = false;
        });
  }

}