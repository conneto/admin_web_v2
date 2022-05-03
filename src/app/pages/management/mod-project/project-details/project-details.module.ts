import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectDetailsComponent } from './project-details.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ComponentModule } from 'src/app/components/component/component.module';



@NgModule({
  declarations: [
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    ProjectDetailsRoutingModule,AngularMaterialModule,ComponentModule,
  ]
})
export class ProjectDetailsModule { }
