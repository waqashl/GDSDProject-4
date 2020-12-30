import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user-model';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-tour-of-heroes';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private socket: Socket
  ) {
    this.authenticationService.currentUser.subscribe((data) => {});
  }


  ngOnInit(): void {
    //this.socket.emit("updateChat", 'hahahah');

  }  
}
