import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuardService } from 'src/app/shared/auth-guard/user-auth-guard.service';
import { CartComponent } from 'src/app/user/components/cart/cart.component';
import { UserOrdersComponent } from 'src/app/user/components/user-orders/user-orders.component';

import { LoginComponent } from '../core/components/login/login.component';
import { SignupComponent } from '../core/components/signup/signup.component';

const routes: Routes = [
  { path: 'orders', canActivate: [UserAuthGuardService], component: UserOrdersComponent },
  { path: 'cart', canActivate: [UserAuthGuardService], component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
