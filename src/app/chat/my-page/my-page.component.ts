import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../shared/models/user.model';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.less']
})
export class MyPageComponent implements OnInit {

  user: User;
  form: FormGroup;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.form = new FormGroup({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(4)]),
      name: new FormControl(this.user.name, [Validators.required, Validators.minLength(1)]),
      position: new FormControl(this.user.position, [Validators.required, Validators.minLength(1)]),
    })
  }

  onSubmit() {
    const {name, email, password, position} = this.form.value;
    const user = new User(name, email, password, position, this.user.id)
    this.usersService.updateUser(user)
      .subscribe((user: User) => {
        window.localStorage.clear();
        window.localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
      })
  }

}
