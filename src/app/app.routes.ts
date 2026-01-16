import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about/about.component';
import { RxjsBasicComponent } from './Rxjs/rxjs-basic #1/rxjs-basic.component';
import { HomeComponent } from './pages/home/home.component';
import { CombineObsComponent } from './Rxjs/combine-obs #4/combine-obs.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path:'rxjs-basic', component:RxjsBasicComponent},
  { path:'combine-obs', component:CombineObsComponent},
  { path: 'employee-details', component:EmployeeDetailsComponent}
  // {
  //   path: '-details',
  //   loadChildren: () =>
  //     import('./pages/employee-details/employee-details.component').then(m => m.EmployeeDetailsComponent)
  // }
];