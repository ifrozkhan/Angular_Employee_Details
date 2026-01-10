import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable, from, filter, of, map } from 'rxjs';
import { MasterService } from '../../service/master';

@Component({
  selector: 'app-rxjs-operator',
  imports: [],
  templateUrl: './rxjs-operator.component.html',
  styleUrl: './rxjs-operator.component.css'
})
export class RxjsOperatorComponent {

  //global Observable using from() emits one by one data
  noList$ = from([1,2,3,4,5,6,7,8,9,10]);

  //Observable using of() emits all data at once
  RollNoList$ = of([1,2,3,4,5,6,7,8,9,10]);

  //API to get data from server
  http = inject(HttpClient);

  //Dependency Injection of Service
  masterService = inject(MasterService);

  constructor(){

    //observable using pipe  to filter the data
    this.noList$.pipe(filter(num => num % 2 === 0))
    .subscribe(res => {
      console.log("Filtered Even Numbers: ", +res);
    })

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

  }
}
