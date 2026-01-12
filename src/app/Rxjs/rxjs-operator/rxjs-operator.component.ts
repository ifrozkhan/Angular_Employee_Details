import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable, from, filter, of, map, interval, take } from 'rxjs';
import { MasterService } from '../../service/master';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rxjs-operator',
  imports: [ReactiveFormsModule],
  templateUrl: './rxjs-operator.component.html',
  styleUrl: './rxjs-operator.component.css'
})
export class RxjsOperatorComponent {

  //Topic: Rxjs Operator
  //pipe, 
  //filter, 
  //map, 
  //tap,
  //take, 
  //valueChanges

  //global Observable using from() emits one by one data
  noList$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  //Observable using of() emits all data at once
  RollNoList$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  //API to get data from server
  http = inject(HttpClient);

  //Dependency Injection of Service
  masterService = inject(MasterService);

  //Time
  TimeInterval = interval(1000);

  searchControl = new FormControl();

  constructor() {



    //observable using pipe  to filter the data
    // this.noList$.pipe(filter(num => num % 2 === 0))
    //   .subscribe(res => {
    //     console.log("Filtered Even Numbers: ", +res);
    //   })

    //observable using map to filter the array data or all data
    this.RollNoList$.pipe(
      map(res => res.filter(num => num % 2 == 0))
    ).subscribe(res => {
      console.log("Filtered Even Numbers from Array: ", res);
    })

    //subscribe to API observable using service
    this.masterService.getUserList().subscribe(res => {
      console.log("User List from Service API: ", res);
    })

    //subscribe to "mapped All user list" API observable using service
    this.masterService.getJsonUserList().subscribe((res: any) => {
      console.log("Mapped User List from Service API: ", res);
    })

    //subscribe to "single user" API observable using service
    this.masterService.getSingleUser().subscribe((res: any) => {
      console.log("Single User Data from Service API: ", res);
    })

    //subscribe to search input valueChanges observable using filter operator
    this.searchControl.valueChanges.pipe(
      filter(res => res.length >= 3)
    ).subscribe((res: any) => {
      console.log("Search Input: ", res);
    })

    //subscribe to TimeInterval observable using take operator to limit or stop the emission
    this.TimeInterval.pipe(
      take(6)
    ).subscribe(res => {
      console.log("Time Interval: ", res);
    })

  }
}
