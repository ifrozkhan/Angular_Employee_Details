import { Component } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-rxjs-basic',
  imports: [],
  templateUrl: './rxjs-basic.component.html',
  styleUrl: './rxjs-basic.component.css'
})
export class RxjsBasicComponent {


  constructor(){
    
    const MyObs$ = new Observable(value =>{
      value.next("Basic observale");
    })

    MyObs$.subscribe(res =>{
      debugger;
      console.log(res);
    })
  }
}
