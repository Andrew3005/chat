import { Injectable } from "@angular/core";

@Injectable()
export class AuthService{

    private isAuthenticated: boolean = false;

    login(){
        this.isAuthenticated = true;
    }

    logout(){
        window.localStorage.clear();
        this.isAuthenticated = false;
    }

    isLoggedIn(){
        return this.isAuthenticated;
    }

}