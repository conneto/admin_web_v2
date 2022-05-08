

import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { OrganizationsComponent } from 'src/app/pages/management/mod-organization/organizations/organizations.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingDataService } from 'src/app/services/get-entity/loading-data.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { SnackBarMessageComponent } from '../../snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss'],
})
export class OrganizationFormComponent implements OnInit {
  organizationForm!: FormGroup;
  @Input() organizationId?: any;
  isSubmitted?: boolean;
  logoFile?: File;
  coverFile?: File;
  filePDF: File[] = [];
  public static readonly CREATE = 'create';
  category: any[] = Constant.CATEGORY;
  categoryString: string = '';
  categoryStringClone: string = '';
  isRemoved?: boolean;
  isWrongFile?: boolean;
  uploadData: any = new FormData();
  noCover?: boolean;
  noLogo?: boolean;
  noFile?: boolean;
  selectedType = 'ngo';
  position?: any;
  type: string[] = ['ngo', 'npo'];
  locations: any[] = [];
  locationObject = {};
  noLocationName?: boolean;
  noAddress?: boolean;
  isSendRequest?: boolean;

  public latitude?: number;
  public longitude?: number;

  constructor(
    private org: OrganizationsComponent,
    private getEntityService: LoadingDataService,
    private loadingService: LoadingService,

    private router: Router,
    private snackBar: SnackBarMessageComponent,
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private user: AuthService
  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }


  userAddress: string = ''
  userLatitude: string = ''
  userLongitude: string = ''
  getPosition(e: any) {
    if (e) {
      console.log(e);
    }
  }
  getLocationName(e: any) {
    if (e) {
      this.locationObject = {
        name: e.target.value
      }
    } else {
      this.noLocationName = true;
    }
    console.log(this.locationObject);
  }
  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address
    this.userLatitude = address.geometry.location.lat()
    this.userLongitude = address.geometry.location.lng()
    if (address) {
      this.locationObject = {
        ...this.locationObject, address: this.userAddress, latitude: this.userLatitude, longitude: this.userLongitude
      }
    } else {
      this.noAddress = true;
    }

  }



  async create() {


    if (
      this.organizationForm.controls.category.value.length != 0 &&
      this.organizationForm.controls.category.value
    ) {
      if (this.isRemoved == true || this.isSubmitted == true) {
        this.categoryStringClone = '';
        for (
          let i = 0;
          i < this.organizationForm.controls.category.value.length;
          i++
        ) {
          this.categoryStringClone =
            this.organizationForm.controls.category.value[i].name.concat(
              '|',
              this.categoryStringClone
            );
        }
      } else {
        this.categoryStringClone = '';
        for (
          let i = 0;
          i < this.organizationForm.controls.category.value.length;
          i++
        ) {
          this.categoryStringClone =
            this.organizationForm.controls.category.value[i].name.concat(
              '|',
              this.categoryStringClone
            );
        }
      }
    }
    if (this.categoryStringClone?.length > 0) {
      this.categoryString = this.categoryStringClone.slice(
        0,
        this.categoryStringClone.length - 1
      );
    }
    this.isSubmitted = true;
    this.organizationForm.value.category = this.categoryString;

    if (this.organizationForm.valid && !this.noCover && !this.noFile && !this.noLocationName && !this.noAddress) {
      if (!this.isSendRequest) {
        this.locations.push(this.locationObject);
      }
      this.isSendRequest = true;

      this.organizationForm.value.locations = this.locations;
      console.log(this.organizationForm.value);
      this.uploadData.append(
        'organization',
        JSON.stringify(this.organizationForm.value)
      );

      this.loadingService.isLoading.next(true);
      let res: BaseResponse | null = await this.organizationService.create(this.uploadData);
      if (res?.status == 0) {
        this.snackBar.showMessage(
          'Tạo tổ chức thành công. Yêu cầu của bạn đã được gửi',
          true
        );
        this.loadingService.isLoading.next(false);
        this.org.getAllOrganization();
        this.router.navigate(['/manager']);
      } else {
        this.loadingService.isLoading.next(true);
        let res: BaseResponse | null = await this.organizationService.create(
          this.uploadData
        );
        if (res?.status == 0) {
          this.snackBar.showMessage(
            'Tạo tổ chức thành công. Yêu cầu của bạn đã được gửi',
            true
          );
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
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128),
          Validators.pattern('^(?!\\s*$).+'),
        ],
      ],
      eng_name: [''],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(128),

        ],
      ],
      vision: [
        '',
        [
          Validators.required,

        ],
      ],
      website: [''],
      founding_date: ['', Validators.required],
      created_by: [
        this.user.currentUserValue ? this.user.currentUserValue.id : '',
      ],
      mission: [
        '',
        [
          Validators.required,


        ],
      ],
      category: [''],
      logo: ['', Validators.required],
      cover: [''],
      type: [this.selectedType],
      locations: [''],

    });
  }
  onChangeCover(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files.length > 5) {
        this.noCover = true;
      } else {
        this.noCover = false;
        for (let i = 0; i < e.target.files.length; i++) {
          this.uploadData.append(
            'cover',
            e.target.files[i],
            e.target.files[i]?.name
          );
        }
      }
    }
  }
  onChangeLogo(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      this.logoFile = e.target.files[0];
      this.uploadData.append('logo', this.logoFile, this.logoFile?.name);
    } else {
      this.noLogo = true;
    }
  }
  get organizationControl() {
    return this.organizationForm.controls;
  }
  onRemoveCategory(e: string) {
    this.isRemoved = true;
    const category = this.organizationForm.controls.category.value as string[];
    const index = category.indexOf(e);
    if (index !== -1) {
      category.splice(index, 1);
    }
    if (index == 0) {
      this.categoryStringClone = '';
    }
    this.organizationForm.controls.category.patchValue(category);
  }
  onSelectPDF(e: any) {
    if (e) {
      if (e.addedFiles[0].type != 'application/pdf') {
        this.isWrongFile = true;
      } else {
        this.filePDF = e.addedFiles;
        if (this.filePDF.length > 0) {
          this.uploadData.append(
            'operating_license',
            this.filePDF[0],
            this.filePDF[0].name
          );
        } else {
          this.noFile = true;
        }
      }
    }
  }

  onRemove(event: any) {
    this.filePDF.splice(this.filePDF.indexOf(event), 1);
  }
  getType(e: any) { }
}
