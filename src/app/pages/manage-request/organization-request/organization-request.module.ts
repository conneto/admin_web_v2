import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRequestRoutingModule } from './organization-request-routing.module';
import { OrganizationRequestComponent } from './organization-request.component';
import { ComponentModule } from 'src/app/components/component/component.module';


@NgModule({
  declarations: [
    OrganizationRequestComponent
  ],
  imports: [
    CommonModule,
    ComponentModule,
    OrganizationRequestRoutingModule
  ]
})
export class OrganizationRequestModule { }
