import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ComponentModule } from './components/component/component.module';
import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { ProjectModule } from './pages/project/project.module';
import { ProjectRequestDetailModule } from './pages/manage-request/mod-project/project-request-detail/project-request-detail.module';

@NgModule({
  declarations: [
    AppComponent,LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
    , ComponentModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    ProjectModule,
    ProjectRequestDetailModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
