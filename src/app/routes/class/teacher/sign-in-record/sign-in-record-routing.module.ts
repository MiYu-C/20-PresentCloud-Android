import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInRecordPage } from './sign-in-record.page';

const routes: Routes = [
  {
    path: '',
    component: SignInRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInRecordPageRoutingModule {}
