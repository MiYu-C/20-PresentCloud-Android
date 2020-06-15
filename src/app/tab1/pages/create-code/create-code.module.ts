import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { IonicModule } from '@ionic/angular';

import { CreateCodePageRoutingModule } from './create-code-routing.module';

import { CreateCodePage } from './create-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // NgxQRCodeModule,
    CreateCodePageRoutingModule
  ],
  declarations: [CreateCodePage]
})
export class CreatcodePageModule {}