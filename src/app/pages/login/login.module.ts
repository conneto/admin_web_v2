import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from 'src/app/components/component/component.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    
  ]
})
export class LoginModule { }
