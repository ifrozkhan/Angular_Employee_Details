import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from './service/master';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  MasterService = inject(MasterService);

  constructor() { }

  // method to change the value of subject and behavior subject
  onRollChange(event: any) {
    debugger;
    this.MasterService.$RollBehavior.next(event.target.value);
    this.MasterService.$RollSubject.next(event.target.value);
  }
}