import { Component, OnInit } from '@angular/core';
import { AuthServiceFirebase } from '../../../../services/firebase/auth.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(public authService: AuthService,     public router: Router,
    ) { }

  ngOnInit() {
  }
  logout(){
  this.authService.logout();
  }

}
