import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VolunteerManagementRoutingModule } from './volunteer-management-routing.module';
import { VolunteerManagementComponent } from './volunteer-management.component';


@NgModule({
  declarations: [
    VolunteerManagementComponent
  ],
  imports: [
    CommonModule,
    VolunteerManagementRoutingModule
  ]
})
export class VolunteerManagementModule { }
