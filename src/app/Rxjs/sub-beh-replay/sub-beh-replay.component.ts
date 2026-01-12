import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterService } from '../../service/master';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sub-beh-replay',
  imports: [FormsModule],
  templateUrl: './sub-beh-replay.component.html',
  styleUrl: './sub-beh-replay.component.css'

})
export class SubBehReplayComponent implements OnInit {
  //Topic: 
  //Subject  
  // Behavior Subject
  // caching used replay subject

  // Subject
  StudentName$ = new Subject();

  // subject with datatype
  RollNo$ = new Subject<number>();

  // subject with void datatype or no datatype
  TakeTill$ = new Subject<void>();

  // subject with string datatype
  CouserName: Subject<string> = new Subject<string>();

  //create a behavior subject and subject in master service
  //create dropdown onclick in app.html to change the value of behavior subject and subject
  //subscribe in about component or different component to see the difference
  //both subject and behavior subject will recieve the value if you select dropdown in about component
  // ONLY Behavior Subject will hold or recieve the latest id you have selected in dropdown different component 
  masterService = inject(MasterService);

  //intialize of variables
  userId: number = 0;

  constructor(private http: HttpClient) {
    setTimeout(() => {
      this.StudentName$.next("Angular 20");
      this.RollNo$.next(123);
      this.TakeTill$.next();
      this.masterService.$CorurseDuration.next("Angular 3 +1 months");
    }, 4000);
  }

  ngOnInit(): void {

    // Subject subscription
    this.StudentName$.subscribe((res: any) => {
      console.log("res:" + res);
    })

    // Subject subscription
    this.RollNo$.subscribe((res: any) => {
      console.log("res:" + res);
    })

    // Behavior Subject subscription
    this.masterService.$CorurseDuration.subscribe((res: any) => {
      console.log("Course Duration:" + res);
    })

  }

  // method to get user by id
  getUser() {
    this.masterService.getUserId(this.userId).subscribe((res: any) => {
      debugger;
      console.log("User Details:", res);
    })

  }
}
