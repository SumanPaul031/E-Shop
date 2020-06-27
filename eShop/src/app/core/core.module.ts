import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from 'src/app/core/components/footer/footer.component';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { HomeComponent } from 'src/app/core/components/home/home.component';
import { LoginComponent } from 'src/app/core/components/login/login.component';
import { SignupComponent } from 'src/app/core/components/signup/signup.component';

import { CoreRoutingModule } from './core-routing.module';
import { UserModule } from '../user/user.module';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    UserModule
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class CoreModule { }
