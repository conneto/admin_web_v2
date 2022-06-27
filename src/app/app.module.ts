import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ComponentModule } from './components/component/component.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { FileUploadModule } from 'ng2-file-upload';
import { CurrencyPipe } from '@angular/common';
import { CommonInterceptor } from './common.interceptor';



@NgModule({
  declarations: [
    AppComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
    , ComponentModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  
  ],
  providers: [
    CurrencyPipe,
    {
      provide:HTTP_INTERCEPTORS,useClass:CommonInterceptasaorr,multi:true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
