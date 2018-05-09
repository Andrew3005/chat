import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { BaseApi } from "../core/base-api";
import { User } from "../models/user.model";

@Injectable()
export class UsersService extends BaseApi {

    constructor(public http: HttpClient) {
        super(http);
    }

    getUsers(): Observable<any>{
        return this.get('users');
    }

    getUserByEmail(email: string): Observable<User> {
        return this.get(`users?email=${email}`)
        .map((user: User[]) => user[0] ? user[0] : undefined);
    }

    getUserById(id): Observable<User> {
        return this.get(`users?id=${id}`)
        .map((user: User[]) => user[0] ? user[0] : undefined);
    }

    createNewUser(user: User): Observable<any>{
        return this.post('users', user)
    }

    updateUser(user: User): Observable<any>{
        return this.put(`users/${user.id}`, user);
    }

}