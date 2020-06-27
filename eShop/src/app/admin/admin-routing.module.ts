import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCustomersComponent } from 'src/app/admin/components/admin/admin-customers/admin-customers.component';
import { AdminDashboardComponent } from 'src/app/admin/components/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from 'src/app/admin/components/admin/admin-home/admin-home.component';
import { AdminNewProductComponent } from 'src/app/admin/components/admin/admin-new-product/admin-new-product.component';
import { AdminOrdersComponent } from 'src/app/admin/components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from 'src/app/admin/components/admin/admin-products/admin-products.component';

import { AdminAuthGuardService } from '../shared/auth-guard/admin-auth-guard.service';
import { UserAuthGuardService } from '../shared/auth-guard/user-auth-guard.service';


const routes: Routes = [
  { path: 'admin', component: AdminHomeComponent, canActivate: [UserAuthGuardService, AdminAuthGuardService], children: [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'orders', component: AdminOrdersComponent },
    { path: 'products', component: AdminProductsComponent },
    { path: 'new-product', component: AdminNewProductComponent },
    { path: 'customers', component: AdminCustomersComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
