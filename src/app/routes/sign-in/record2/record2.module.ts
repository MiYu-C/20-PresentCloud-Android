import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Record2PageRoutingModule } from './record2-routing.module';

import { Record2Page } from './record2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Record2PageRoutingModule
  ],
  declarations: [Record2Page]
})
export class Record2PageModule {}
