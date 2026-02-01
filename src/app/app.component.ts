import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from './service/master';
import { Observable } from 'rxjs';
import { Appstore } from './ngrx-store/counter.reducer';
import { select, Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  MasterService = inject(MasterService);

  counter : Observable<number> = new Observable<number>;

  constructor(private store: Store<Appstore>) {
    // this.counter = this.store.pipe(select('count'))
   }

  // method to change the value of subject and behavior subject
  // onRollChange(event: any) {
  //   debugger;
  //   this.MasterService.$RollBehavior.next(event.target.value);
  //   this.MasterService.$RollSubject.next(event.target.value);
  // }
}