import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitiateSignInPageRoutingModule } from './initiate-sign-in-routing.module';

import { InitiateSignInPage } from './initiate-sign-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InitiateSignInPageRoutingModule
  ],
  declarations: [InitiateSignInPage]
})
export class InitiateSignInPageModule {}
