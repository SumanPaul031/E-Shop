import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartComponent } from 'src/app/user/components/cart/cart.component';
import { FilterComponent } from 'src/app/user/components/filter/filter.component';
import { ProductCardComponent } from 'src/app/user/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'src/app/user/components/product-quantity/product-quantity.component';
import { StoreComponent } from 'src/app/user/components/store/store.component';
import { UserOrdersComponent } from 'src/app/user/components/user-orders/user-orders.component';

import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    StoreComponent,
    FilterComponent,
    ProductCardComponent,
    UserOrdersComponent,
    CartComponent,
    ProductQuantityComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [
    StoreComponent,
    FilterComponent,
    ProductCardComponent,
    UserOrdersComponent,
    CartComponent,
    ProductQuantityComponent
  ]
})
export class UserModule { }
