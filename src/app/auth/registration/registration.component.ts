import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsersService } from '../../shared/services/users.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {

  constructor(private usersService: UsersService,
    private router: Router,
    title: Title) {
      title.setTitle('Реєстрація');
     }

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      position: new FormControl('', [Validators.required, Validators.minLength(1)]),
      agree: new FormControl('', [Validators.requiredTrue])
    })
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if(user){
            resolve({forbiddenEmail : true})
          }else {
            resolve(null);
          }
        })
    })
  }

  onSubmit() {
    const { email, name, password, position } = this.form.value;
    const user = new User(name, email, password, position)

    this.usersService.createNewUser(user)
      .subscribe(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      })
  }

}
