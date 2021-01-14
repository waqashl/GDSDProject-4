import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../_models/user-model';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm?: FormGroup;
  loading = false;
  submitted = false;
  returnUrl?: string;
  error = '';
  passwordMismatch = false;

  successSubmitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.pattern('[A-Za-z0-9@.-]*hs-fulda.de')]],
      password: ['', Validators.required],
      verifyPassword: [null, this.checkPasswords],
      name: ['', Validators.required],
      dob: ['', [Validators.required, Validators.max(Date.now())]],
      address: ['', Validators.required],
      postalCode: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm?.controls; }

  checkPasswords(group: FormGroup) {
    
        // here we have the 'passwords' group
    // let pass = this.f.password.value;
    // let confirmPass = form.controls.verifyPassword.value;

    return null; //pass === confirmPass ? null : { notSame: true }      
  }

  onSubmit() {
    this.submitted = true;
    console.log("submit");


    console.log("valid",this.registerForm.valid)
    // stop here if form is invalid
    if (this.registerForm?.invalid) {
      return;
    }

    this.loading = true;

    let user: User = new User()
    user.name = this.f.name.value;
    user.email = this.f.email.value;
    user.dob = this.f.dob.value;
    user.address = this.f.address.value;
    user.postalCode = this.f.postalCode.value;
    user.password = this.f.password.value;

    console.log(user);
    
    if(this.f.password.value !== this.f.verifyPassword.value) {
      this.passwordMismatch = true
      return
    }

    this.authenticationService.register(user)
    .pipe(first())
    .subscribe(
      response => {
        if(response.status !== 'Failed') {
          this.successSubmitted = true;
        }
        else {
          alert(response.message);
        }
      }
    );
  }

}


