import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRequestDetailsRoutingModule } from './organization-request-details-routing.module';
import { OrganizationRequestDetailsComponent } from './organization-request-details.component';
import { ComponentModule } from 'src/app/components/component/component.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';


@NgModule({
  declarations: [
    OrganizationRequestDetailsComponent
  ],
  imports: [
    CommonModule,
    OrganizationRequestDetailsRoutingModule, ComponentModule, AngularMaterialModule,
  ]
})
export class OrganizationRequestDetailsModule { }
