import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Record2Page } from './record2.page';

const routes: Routes = [
  {
    path: '',
    component: Record2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Record2PageRoutingModule {}
