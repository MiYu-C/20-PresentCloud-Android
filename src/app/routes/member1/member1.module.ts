import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Member1PageRoutingModule } from './member1-routing.module';

import { Member1Page } from './member1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Member1PageRoutingModule
  ],
  declarations: [Member1Page]
})
export class Member1PageModule {}
