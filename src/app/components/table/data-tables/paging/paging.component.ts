import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/Menu';
import { MenuDataService } from 'src/app/services/Data/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { el } from 'date-fns/locale';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {

  public menu = [];

  constructor(
    private menuDataService: MenuDataService,
    private router: Router
  ) {
    this.menuDataService.getAll().subscribe((data) => {
      const helper = new JwtHelperService();
      console.log(sessionStorage.getItem('token'));
      console.log(data);
      
      
      const isExpired = helper.isTokenExpired(sessionStorage.getItem('token'));
      if (isExpired) {
        sessionStorage.clear();
        this.router.navigate(['/auth/login']);
      }
      else{
      this.menu = data;
      }
    });
  }
  
  ngOnInit(): void {
    
  }

}
