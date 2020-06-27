import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AdminCustomersComponent } from 'src/app/admin/components/admin/admin-customers/admin-customers.component';
import {
  AdminDashboardCardComponent,
} from 'src/app/admin/components/admin/admin-dashboard-card/admin-dashboard-card.component';
import { AdminDashboardComponent } from 'src/app/admin/components/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from 'src/app/admin/components/admin/admin-home/admin-home.component';
import { AdminNewProductComponent } from 'src/app/admin/components/admin/admin-new-product/admin-new-product.component';
import { AdminOrdersComponent } from 'src/app/admin/components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from 'src/app/admin/components/admin/admin-products/admin-products.component';

import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminNewProductComponent,
    AdminCustomersComponent,
    AdminDashboardCardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ChartsModule
  ],
  exports: [
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminNewProductComponent,
    AdminCustomersComponent,
    AdminDashboardCardComponent
  ]
})
export class AdminModule { }
