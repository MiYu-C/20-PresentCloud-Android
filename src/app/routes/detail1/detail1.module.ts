import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Detail1PageRoutingModule } from './detail1-routing.module';

import { Detail1Page } from './detail1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Detail1PageRoutingModule
  ],
  declarations: [Detail1Page]
})
export class Detail1PageModule {}
