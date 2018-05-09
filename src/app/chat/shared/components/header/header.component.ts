import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../../shared/models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();

  user: User;

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogout(){
    this.router.navigate(['/login']);
  }

}
