import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';
import { ChatModule } from './chat/chat.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CommonModule,
    HttpClientModule,
    ChatModule
  ],
  providers: [
    UsersService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
