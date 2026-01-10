import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }
  //API to get user list
  getUserList() {
    return this.http.get("https://jsonplaceholder.typicode.com/users");
  }

  //API to get user list with map operator and tap operator
  getJsonUserList() {
    return this.http.get("https://jsonplaceholder.typicode.com/users").pipe(
      tap((userList: any) => {
        console.log("Original User List: ", userList);
      }),
      map((userList: any) => userList.map((user: any) => {
        return { id: user.id, name: user.name, email: user.email }
      }))
    )
  }

  //API to get single user with map operator
  getSingleUser() {
    return this.http.get("https://jsonplaceholder.typicode.com/users/2").pipe(
      map((user: any) => user.address)
    )
  }
}

