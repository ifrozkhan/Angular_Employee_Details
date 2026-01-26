import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Appstore } from '../counter.reducer';
import { decrement, increment } from '../counter.action';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-counter',
  imports: [AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  counterValue: Observable<number> = new Observable<number>;

  constructor(private store: Store<Appstore>) {
    this.counterValue = this.store.pipe(select('count'))
  }

  onDecrement(){
    this.store.dispatch(decrement())
  }

  onIncrement() {
    this.store.dispatch(increment())
  }

}
