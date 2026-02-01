import { Component, inject } from '@angular/core';
import { MasterService } from '../../service/master';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Appstore } from '../../ngrx-store/counter.reducer';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, AsyncPipe, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  MasterService = inject(MasterService);

  counter: Observable<number> = new Observable<number>;
  route: any;

  constructor(private store: Store<Appstore>, private router: Router) {
    this.counter = this.store.pipe(select('count'))
  }

  onRollChange(event: any) {
    debugger;
    this.MasterService.$RollBehavior.next(event.target.value);
    this.MasterService.$RollSubject.next(event.target.value);
  }

  logout() {
    const confirmLogout = confirm('Are you sure want to logout ?');
    if (confirmLogout) {
      alert('logout successfully');
      localStorage.removeItem('isLoggedIn');
      this.router.navigateByUrl('/')
    }
  }
}
