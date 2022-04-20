import { Location } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Organization } from 'src/app/models/organization/organization';
import { OrganizationsComponent } from 'src/app/pages/management/mod-organization/organizations/organizations.component';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingDataService } from 'src/app/services/get-entity/loading-data.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { SnackBarMessageComponent } from '../../snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit {
  organizationForm!: FormGroup;
  @Input() organizationId?: any;
  isSubmitted?:boolean;
  logoFile?: File;
  coverFile?: File;
  public static readonly CREATE = 'create';
  constructor(private org:OrganizationsComponent,private getEntityService:LoadingDataService,private loadingService: LoadingServiceService, private location: Location, private router: Router, private snackBar: SnackBarMessageComponent, private formBuilder: FormBuilder, private orgApi: OrganizationApiService, private user: AuthServiceService) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }

  async create() {
    this.isSubmitted=true;
    if (this.organizationForm.valid) {
      let uploadData: any = new FormData();
      uploadData.append('organization', JSON.stringify(this.organizationForm.value));
      uploadData.append('logo', this.logoFile, this.logoFile?.name);
      uploadData.append('cover', this.coverFile, this.coverFile?.name);
      if (this.organizationId) {
        this.loadingService.isLoading.next(true);
        let res: BaseResponse | null = await this.orgApi.createById(uploadData, `${this.organizationId}`);
        if (res?.status == 0) {
          this.snackBar.showMessage(`${res?.message}`, true);
          this.loadingService.isLoading.next(false);
          
          this.router.navigate(['/manager/manage-organization']);
          this.org.checkToGetData('pending');
         
     
        } else {
          this.snackBar.showMessage(`${res?.message}`, false);

          this.loadingService.isLoading.next(false);


        }
      } else {
        console.log(uploadData.get('organization'));
        this.loadingService.isLoading.next(true);
        let res: BaseResponse | null = await this.orgApi.create(uploadData);
        if (res?.status == 0) {
          this.snackBar.showMessage(`${res?.message}`, true);
          this.loadingService.isLoading.next(false);
         
          this.router.navigate(['/manager/manage-organization']);
          this.org.checkToGetData('pending');
   
        } else {
          this.snackBar.showMessage(`${res?.message}`, false);
          this.loadingService.isLoading.next(false);

        }
      }
    }
  }

  initFormBuilder() {
    this.organizationForm = this.formBuilder.group({
      name: ['',[ Validators.required,Validators.minLength(8),Validators.maxLength(128)]],
      eng_name: [''],
      description: ['', [ Validators.required,Validators.minLength(128),Validators.maxLength(256)]],
      vision: ['', [ Validators.required,Validators.minLength(128),Validators.maxLength(256)]],
      website: [''],
      founding_date: ['', Validators.required],
      created_by: [this.user.currentUserValue ? this.user.currentUserValue.id : ''],
      request_type: [OrganizationFormComponent.CREATE],
      mission: ['', [ Validators.required,Validators.minLength(128),Validators.maxLength(256)]],
      category:[''],
      logo: [''],
      cover: [''],
    })
  }
  onChangeCover(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      this.coverFile = e.target.files[0];
    }
  }
  onChangeLogo(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      this.logoFile = e.target.files[0];
    }
  }
  get organizationControl(){
    return this.organizationForm.controls;
  }
}
