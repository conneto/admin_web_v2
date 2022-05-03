import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolunteerManagementComponent } from './volunteer-management.component';

const routes: Routes = [{ path: '', component: VolunteerManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolunteerManagementRoutingModule { }
