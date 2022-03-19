import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ComponentModule } from 'src/app/components/component/component.module';


@NgModule({
  declarations: [
    UserManagementComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    UserManagementRoutingModule,
    ComponentModule,
  ]
})
export class UserManagementModule { }
