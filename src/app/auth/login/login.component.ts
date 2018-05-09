import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../shared/models/message.model';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(public usersService: UsersService,
    public router: Router,
    private title: Title,
    private route: ActivatedRoute,
    private authService: AuthService) {
    title.setTitle('Вхід');
  }


  sub: Subscription;
  form: FormGroup;
  message: Message;

  ngOnInit() {
    this.message = new Message('', 'danger');
    this.route.queryParams
      .subscribe((params: Params) => {
        if(params['nowCanLogin']){
          this.showMessage('Тепер ви можете увійти в систему', 'warning')
        }
      })
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  showMessage(text: string, type: string) {
    this.message = new Message(text, type);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000)
  }

  onSubmit() {
    const formData = this.form.value;
    this.sub = this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (formData.email === user.email) {
            if (formData.password === user.password) {
              window.localStorage.setItem('user', JSON.stringify(user));
              this.authService.login();
              this.router.navigate(['/chat', 'my-page']);
            } else {
              this.showMessage('Ви ввели не вірно пароль', 'danger');
            }
          }
        } else {
          this.showMessage('Такого користувача не існує', 'danger');
        }
      })
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

}
