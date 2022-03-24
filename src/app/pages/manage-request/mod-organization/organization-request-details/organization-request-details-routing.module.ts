import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationRequestDetailsComponent } from './organization-request-details.component';

const routes: Routes = [{ path: '', component: OrganizationRequestDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRequestDetailsRoutingModule { }
