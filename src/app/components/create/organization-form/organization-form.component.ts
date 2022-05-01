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
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { SnackBarMessageComponent } from '../../snack-bar-message/snack-bar-message.component';
import { category } from 'src/environments/environment';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit {
  organizationForm!: FormGroup;
  @Input() organizationId?: any;
  isSubmitted?: boolean;
  logoFile?: File;
  coverFile?: File;
  public static readonly CREATE = 'create';
  category: any[] = category;
  categoryString: string = '';
  categoryStringClone: string = '';
  isRemoved?: boolean;
  constructor(private org: OrganizationsComponent, private getEntityService: LoadingDataService, private loadingService: LoadingService, private location: Location, private router: Router, private snackBar: SnackBarMessageComponent, private formBuilder: FormBuilder, private orgApi: OrganizationApiService, private user: AuthServiceService) { }

  ngOnInit(): void {
    this.initFormBuilder();

  }

  async create() {

    if (this.organizationForm.controls.category.value.length != 0 && this.organizationForm.controls.category.value) {
      if (this.isRemoved == true || this.isSubmitted == true) {
        this.categoryStringClone = '';
        for (let i = 0; i < this.organizationForm.controls.category.value.length; i++) {
          this.categoryStringClone = this.organizationForm.controls.category.value[i].name.concat("|", this.categoryStringClone);
        }
      } else {
        for (let i = 0; i < this.organizationForm.controls.category.value.length; i++) {
          this.categoryStringClone = this.organizationForm.controls.category.value[i].name.concat("|", this.categoryStringClone);

        }
      }
    }
    this.categoryString = this.categoryStringClone.slice(0, this.categoryStringClone.length - 1);
    this.isSubmitted = true;
    this.organizationForm.value.category=this.categoryString;
    console.log(this.organizationForm.value);
    if (this.organizationForm.valid) {

      console.log(this.organizationForm.value);
      let uploadData: any = new FormData();
      uploadData.append('organization', JSON.stringify(this.organizationForm.value));
      uploadData.append('logo', this.logoFile, this.logoFile?.name);
      uploadData.append('cover', this.coverFile, this.coverFile?.name);
      if (this.organizationId) {
        this.loadingService.isLoading.next(true);
        let res: BaseResponse | null = await this.orgApi.createById(uploadData, `${this.organizationId}`);
        if (res?.status == 0) {
          this.snackBar.showMessage('Tạo tổ chức thành công. Yêu cầu của bạn đã được gửi', true);
          this.loadingService.isLoading.next(false);

          this.router.navigate(['/manager/manage-organization']);
          this.org.getAllOrganization();


        } else {
          this.snackBar.showMessage(`${res?.message}`, false);

          this.loadingService.isLoading.next(false);


        }
      } else {

        this.loadingService.isLoading.next(true);
        let res: BaseResponse | null = await this.orgApi.create(uploadData);
        if (res?.status == 0) {
          this.snackBar.showMessage('Tạo tổ chức thành công. Yêu cầu của bạn đã được gửi', true);
          this.loadingService.isLoading.next(false);
          this.org.getAllOrganization();
          this.router.navigate(['/manager']);
        } else {
          this.router.navigate(['/manager/manage-organization']);
          this.snackBar.showMessage(`${res?.message}`, false);
          this.loadingService.isLoading.next(false);

        }
      }
    }
  }

  initFormBuilder() {
    this.organizationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128), Validators.pattern('^(?!\\s*$).+')]],
      eng_name: [''],
      description: ['', [Validators.required, Validators.minLength(128), Validators.maxLength(1000)]],
      vision: ['', [Validators.required, Validators.minLength(128), Validators.maxLength(1000)]],
      website: [''],
      founding_date: ['', Validators.required],
      created_by: [this.user.currentUserValue ? this.user.currentUserValue.id : ''],
      request_type: [OrganizationFormComponent.CREATE],
      mission: ['', [Validators.required, Validators.minLength(128), Validators.maxLength(1000)]],
      category: [''],
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
  get organizationControl() {
    return this.organizationForm.controls;
  }
  onRemoveCategory(e: string) {
    this.isRemoved = true;
    const category = this.organizationForm.controls.category.value as string[];
    const index = category.indexOf(e);
    console.log(index);
    if (index !== -1) {
      category.splice(index, 1);
    }
    if (index == 0) {
      this.categoryStringClone = ''
    }
    this.organizationForm.controls.category.patchValue(category);
  }
}
