import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';
import { ComponentModule } from 'src/app/components/component/component.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { OrganizationDetailsModule } from '../organization-details/organization-details.module';


@NgModule({
  declarations: [
    OrganizationsComponent
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    ComponentModule,
    AngularMaterialModule,
    OrganizationDetailsModule,

  ]
})
export class OrganizationsModule { }
