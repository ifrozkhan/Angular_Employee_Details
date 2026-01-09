import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about/about.component';
import { RxjsBasicComponent } from './Rxjs/rxjs-basic/rxjs-basic.component';
import { HomeComponent } from './pages/home/home.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path:'rxjs-basic', component:RxjsBasicComponent}
];