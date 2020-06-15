import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassTabsPageRoutingModule } from './class-tabs-routing.module';

import { ClassTabsPage } from './class-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassTabsPageRoutingModule
  ],
  declarations: [ClassTabsPage]
})
export class ClassTabsPageModule {}
