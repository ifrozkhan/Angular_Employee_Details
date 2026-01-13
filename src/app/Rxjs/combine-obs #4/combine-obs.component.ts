import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Form, FormControl, ReactiveFormsModule } from '@angular/forms';
import { concatMap, exhaustMap, forkJoin, mergeMap, of, Subject, subscribeOn, switchMap } from 'rxjs';

@Component({
  selector: 'app-combine-obs',
  imports: [ReactiveFormsModule],
  templateUrl: './combine-obs.component.html',
  styleUrl: './combine-obs.component.css'
})
export class CombineObsComponent {

  //Topic: Combine Observables
  //ForkJoin
  //switchMap
  //MergeMap
  //concatMap
  //exhaustMap

  // 2 Observables
  stateData$ = of(["AP, TS, KA"]);
  cityData$ = of(["Hyderabad, Bangalore, Vijayawada"]);

  // Form control for search input
  searchControl: FormControl = new FormControl();

  // Subject for login button clicks
  loginClick$ = new Subject<void>();

  constructor(private http: HttpClient) {

    //varable to hold the api responses
    const UsersData = this.http.get("https://jsonplaceholder.typicode.com/users");
    const PostsData = this.http.get("https://jsonplaceholder.typicode.com/hdhd");

    // Subscribing to individual observables
    this.stateData$.subscribe(res => {
      // debugger;
    })

    // Subscribing to individual observables
    this.cityData$.subscribe(res => {
      // debugger;
    })

    // forkjoin runs multiple observables in parallel and gives the final result when all are completed
    forkJoin([this.stateData$, this.cityData$]).subscribe(res => {
      // debugger;
    })

    // Using forkJoin to combine both API calls
    forkJoin([UsersData, PostsData]).subscribe(res => {
    }, err => {
      // debugger
    })

    // // Search box value changes subscription
    this.searchControl.valueChanges.subscribe((search: string) => {
      // debugger;
      this.http.get('https://dummyjson.com/products/search?q=' + search).subscribe(res => {
        // debugger;
        console.log("User Details: " + res);
      })
    })

    // Cancel previous request and switch to latest one
    this.searchControl.valueChanges.pipe(
      switchMap((search: string) => this.http.get("https://dummyjson.com/products/search?q=" + search))
    ).subscribe(res => {
      // debugger;
      console.log("User Details: " + res);
    }
    )

    //Excecute inner observables in parallel without waiting for previous one to complete
    this.searchControl.valueChanges.pipe(
      mergeMap((search: string) => this.http.get("https://dummyjson.com/products/search?q=" + search))
    ).subscribe(res => {
      // debugger;
      console.log("User Details: " + res);
    }
    )

    // Execute inner observable one after another in sequence
    this.searchControl.valueChanges.pipe(
      concatMap((search: string) => this.http.get("https://dummyjson.com/products/search?q=" + search))
    ).subscribe(res => {
      // debugger;
      console.log("User Details: " + res);
    }
    )

    // Button Ignore new request while the current observable is running until it is completed
    this.loginClick$.pipe(
      exhaustMap(() => {
        return this.http.get("https://jsonplaceholder.typicode.com/users")
      }),
    ).subscribe(res => {
      // debugger;
      console.log("User Details: " + res);
    }
    )
  }

  onClick() {
    this.loginClick$.next();
  }
}
