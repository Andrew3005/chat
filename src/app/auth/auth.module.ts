import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        AuthRoutingModule,
        SharedModule,
        CommonModule
    ],
    declarations: [
        LoginComponent,
        RegistrationComponent,
        AuthComponent,
        
    ],
    providers: []
})
export class AuthModule { }