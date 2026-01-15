import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-unsubscribe',
  imports: [AsyncPipe],
  templateUrl: './unsubscribe.component.html',
  styleUrl: './unsubscribe.component.css'
})
export class UnsubscribeComponent implements OnInit, OnDestroy {

  //Topic: unsubscribe and avoid memory leak
  //single subscription unscribe
  //multiple subscription unsubscribe
  //takeUntil
  //take
  //Async pipe

  http = inject(HttpClient);

  UserList: any[] = [];
  // way-1 for one subscription
  subscription!: Subscription;

  //way-2 for multiple subscriptipn
  subscrptionList: Subscription[] = [];

  //way-3 unsubcribe until the suject emit subTakeUntil called in destory
  subTakeUntil!: Subject<void>;

  //way-4 using take will subscribe only once

  //way-5 using async pipe automatic unsubscribe
  userList$ = new Observable<any[]>;

  ngOnInit() {
    this.getUsers();
    this.getPosts();
    this.userList$ = this.http.get<any[]>("https://jsonplaceholder.typicode.com/users");
  }

  //unsubscribe one subscription
  // getUsers() {
  //   this.subscription = this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res: any) => {
  //     this.UserList = res;
  //   })
  // }

  //un subscribe multiple subscription
  // getPosts() {
  //   // this.subscrptionList.push(this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe((res: any) => {

  //   // })) OR

  //   const sub = this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe((res: any) => {

  //   })
  //   this.subscrptionList.push(sub);
  // }

  //un subscribe with takeuntil emit
  getUsers() {
    this.http.get("https://jsonplaceholder.typicode.com/users").pipe(
      takeUntil(this.subTakeUntil)
    ).subscribe((res: any) => {

    })
  }

  //take subscribe only once
  getPosts() {
    this.http.get("https://jsonplaceholder.typicode.com/posts").pipe(
      take(1)
    ).subscribe((res: any) => {

    })
  }

  //unsubscribe 
  ngOnDestroy() {
    // this.subscription.unsubscribe();
    // this.subscrptionList.forEach(res => {
    //   res.unsubscribe();
    // })
    // this.subTakeUntil.next();
  }
}
