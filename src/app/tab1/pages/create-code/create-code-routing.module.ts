import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCodePage } from './create-code.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCodePageRoutingModule {}
