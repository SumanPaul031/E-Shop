import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAuthGuardService } from '../shared/auth-guard/user-auth-guard.service';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', canActivate: [UserAuthGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [UserAuthGuardService] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
