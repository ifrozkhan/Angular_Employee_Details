import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, shareReplay, Subject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  // Behavior Subject with string datatype
  $CorurseDuration = new BehaviorSubject<string>("Angular 2 months");

  // Behavior Subject and Subject examples
  $RollBehavior = new BehaviorSubject<string>("");
  $RollSubject = new Subject<string>();

  // Cache for user details in map observable
  private UserDetails = new Map<number, Observable<any>>();


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

  // API to get user by id 
  // getUserId(UserId: number) {
  //   return this.http.get(`https://jsonplaceholder.typicode.com/users/${UserId}`);
  // }

  //caching using shareReplay
  getUserId(UserId: number): any | undefined {
    debugger;
    if (!this.UserDetails.has(UserId)) {
      const userDataObs = this.http.get(`https://jsonplaceholder.typicode.com/users/${UserId}`).pipe(
        shareReplay(1)
      );
      this.UserDetails.set(UserId, userDataObs);
    }
    return this.UserDetails.get(UserId);
  }
}

