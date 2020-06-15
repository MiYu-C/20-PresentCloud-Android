import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassTabs1PageRoutingModule } from './class-tabs1-routing.module';

import { ClassTabs1Page } from './class-tabs1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassTabs1PageRoutingModule
  ],
  declarations: [ClassTabs1Page]
})
export class ClassTabs1PageModule {}
