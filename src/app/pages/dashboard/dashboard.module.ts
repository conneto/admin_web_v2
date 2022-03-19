
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardComponent } from './dashboard.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { ComponentModule } from 'src/app/components/component/component.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    ComponentModule,
    CommonModule,
    AngularMaterialModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule { }
