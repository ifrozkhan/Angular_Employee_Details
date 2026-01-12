import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MasterService } from '../../../service/master';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  MasterService = inject(MasterService);

  constructor() {
    // Subscribe to Behavior Subject and Subject
    this.MasterService.$RollBehavior.subscribe((res: any) => {
      debugger;
    })

    // Subject subscription
    this.MasterService.$RollSubject.subscribe((res: any) => {
      debugger;
    })
  }

}
