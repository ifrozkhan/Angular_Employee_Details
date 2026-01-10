import { Component } from '@angular/core';
import { from, interval, Observable, of, timer } from 'rxjs';
import { RxjsOperatorComponent } from "../rxjs-operator/rxjs-operator.component";
@Component({
  selector: 'app-rxjs-basic',
  imports: [RxjsOperatorComponent],
  templateUrl: './rxjs-basic.component.html',
  styleUrl: './rxjs-basic.component.css'
})
export class RxjsBasicComponent {

  //Topic: Rxjs basic and observable
  //Observable, 
  //of(), 
  //from(), 
  //interval(), 
  //timer()

  //Global varaiable
  cityList: string[] = ['Hyderabad', 'Banglore', 'Chennnai'];

  //global Observable using of() emits all data at once
  cityList$ = of(['Hyderabad', 'Banglore', 'Chennnai']);

  //Observable using from() emits one by one data
  cityList2$ = from(['Hyderabad', 'Banglore', 'Chennnai']);

  //Observable using interval() emits data in specific interval time
  Myinterval$ = interval(2000);

  //Obbservable using Timer() emits data after specific time only Once
  Timer$ = timer(5000);

  constructor() {
    // Basic Observable
    const MyObs$ = new Observable(value => {
      value.next("Basic observale");
    })

    MyObs$.subscribe(res => {
      console.log(res);
    })

    // global Observable subscription using of()
    this.cityList$.subscribe((cityList: string[]) => {
      console.log(cityList);
    })

    //Observable using from() subscription to get one by one data
    this.cityList2$.subscribe((res: string) => {
      console.log(res);
    })

    //Observable using interval() subscription to get data in specific interval time
    // this.Myinterval$.subscribe((res: number) => {
    //   console.log("Interval", +res);
    // })

    //Obbservable using Timer() subscription to get data after specific time only Once
    this.Timer$.subscribe((res: any) => {
      console.log("Timer", + res);
    })

  }
}