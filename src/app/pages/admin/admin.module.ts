import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ComponentModule } from 'src/app/components/component/component.module';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing-module';

@NgModule({
  declarations: [AdminComponent,],
  imports: [
    AdminRoutingModule,
    CommonModule
    , AngularMaterialModule,
    ComponentModule,
  ]
})
export class AdminModule { }
