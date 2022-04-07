import { Location } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Organization } from 'src/app/models/organization/organization';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
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
  logoFile?: File;
  coverFile?: File;
  public static readonly CREATE = 'create';
  constructor(private location:Location,private router: Router, private snackBar: SnackBarMessageComponent, private formBuilder: FormBuilder, private orgApi: OrganizationApiService, private user: AuthServiceService) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }

  async create() {
    if (this.organizationForm.valid) {
      let uploadData: any = new FormData();
      uploadData.append('organization', JSON.stringify(this.organizationForm.value));
      uploadData.append('logo',this.logoFile,this.logoFile?.name);
      uploadData.append('cover',this.coverFile,this.coverFile?.name);
      if (this.organizationId) {
        let res: BaseResponse | null = await this.orgApi.createById(uploadData, `${this.organizationId}`);
        console.log(res?.resultCode);
        if (res?.resultCode == 0) {
          this.snackBar.showMessage("Create success !", true);
          this.location.back();
        } else {
          this.snackBar.showMessage("Error ! Please try again", false);
        }
      } else {
        let res: BaseResponse | null = await this.orgApi.create(uploadData);
        if (res?.resultCode == 0) {
          this.snackBar.showMessage("Create success !", true);
          this.location.back();
        } else {
          this.snackBar.showMessage("Error ! Please try again", false);
        }
      }
    }
  }

  initFormBuilder() {
    this.organizationForm = this.formBuilder.group({
      name: ['', Validators.required],
      eng_name: ['', Validators.required],
      description: ['', Validators.required],
      vision:['',Validators.required],
      website:['',Validators.required],
      founding_date: ['', Validators.required],
      created_by: [this.user.currentUserValue ? this.user.currentUserValue.id : ''],
      request_type: [OrganizationFormComponent.CREATE],
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
}
