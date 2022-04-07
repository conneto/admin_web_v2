import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentModule } from 'src/app/components/component/component.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { OrganizationDetailsComponent } from './organization-details.component';
import { OrganizationDetailsRoutingModule } from './organization-details-routing.module';


@NgModule({
  declarations: [
    OrganizationDetailsComponent
  ],
  imports: [
    CommonModule,
    OrganizationDetailsRoutingModule, ComponentModule, AngularMaterialModule,
  ]
})
export class OrganizationDetailsModule { }
