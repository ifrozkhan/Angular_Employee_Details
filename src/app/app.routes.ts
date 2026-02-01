import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about/about.component';
import { RxjsBasicComponent } from './Rxjs/rxjs-basic #1/rxjs-basic.component';
import { HomeComponent } from './pages/home/home.component';
import { CombineObsComponent } from './Rxjs/combine-obs #4/combine-obs.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { CounterComponent } from './ngrx-store/counter/counter.component';
import { loginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { loginGuard } from './service/guards/login.guards';
import { authGuard } from './service/guards/dashboard.guard';
export const routes: Routes = [
  { path: '', 
    component: loginComponent,
    canActivate:[loginGuard]
   },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path:'', redirectTo:'home', pathMatch:'full'},
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'rxjs-basic', component: RxjsBasicComponent },
      { path: 'combine-obs', component: CombineObsComponent },
      { path: 'employee-details', component: EmployeeDetailsComponent },
      { path: "ngrx-counter", component: CounterComponent }
    ]
  },
  // {
  //   path: '-details',
  //   loadChildren: () =>
  //     import('./pages/employee-details/employee-details.component').then(m => m.EmployeeDetailsComponent)
  // }
];