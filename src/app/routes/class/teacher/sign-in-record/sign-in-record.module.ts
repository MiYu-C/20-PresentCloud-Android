import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInRecordPageRoutingModule } from './sign-in-record-routing.module';

import { SignInRecordPage } from './sign-in-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInRecordPageRoutingModule
  ],
  declarations: [SignInRecordPage]
})
export class SignInRecordPageModule {}
