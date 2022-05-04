import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';

import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  constructor(
    private router: Router,
    public organizationId: LoadingService,
    private authApi: AuthService,
    public dialogRef: MatDialogRef<ProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {}
  projectForm!: FormGroup;
  coverImage?: File;
  logo?: File;
  isSubmitted?: boolean;
  isRemoved?: boolean;
  category: any[] = Constant.CATEGORY;
  categoryStringClone?: any;
  categoryString?: any;
  locations: any[] = [];
  locationObject = {};
  noLocationName?: boolean;
  noAddress?: boolean;
  isSendRequest?: boolean;

  public latitude?: number;
  public longitude?: number;
  userAddress: string = ''
  userLatitude: string = ''
  userLongitude: string = ''
  uploadData: any = new FormData();
  noFileLogo?:boolean;

  ngOnInit(): void {
    this.initForm();
  }
  getLocationName(e: any) {
    if (e) {
      this.locationObject = {
        name: e.target.value,
      };
    } else {
      this.noLocationName = true;
    }
    console.log(this.locationObject);
  }
  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address;
    this.userLatitude = address.geometry.location.lat();
    this.userLongitude = address.geometry.location.lng();
    if (address) {
      this.locationObject = {
        ...this.locationObject,
        address: this.userAddress,
        latitude: this.userLatitude,
        longitude: this.userLongitude,
      };
    } else {
      this.noAddress = true;
      this.locationObject={};
    }
  }
  initForm() {
    this.projectForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(128)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      created_by: [this.authApi.currentUserValue.id],
      organization_id: [this.organizationId.getOrganizationId.value],
      request_type: ['create'],
      cover: [''],
      logo: [''],
      category: [''],
      locations: [''],
    });
  }
  noClick() {
    this.dialogRef.close(false);
  }
  yesClick() {
    if (
      this.projectForm.controls.category.value.length != 0 &&
      this.projectForm.controls.category.value
    ) {
      if (this.isRemoved == true || this.isSubmitted == true) {
        this.categoryStringClone = '';
        for (
          let i = 0;
          i < this.projectForm.controls.category.value.length;
          i++
        ) {
          this.categoryStringClone = this.projectForm.controls.category.value[
            i
          ].name.concat('|', this.categoryStringClone);
        }
      } else {
        this.categoryStringClone = '';
        for (
          let i = 0;
          i < this.projectForm.controls.category.value.length;
          i++
        ) {
          this.categoryStringClone = this.projectForm.controls.category.value[
            i
          ].name.concat('|', this.categoryStringClone);
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
    this.projectForm.value.category = this.categoryString;

    if (this.projectForm.valid && !this.noAddress && !this.noLocationName) {
      this.projectForm.value.start_date = new Date(this.projectForm.value.start_date);
      this.projectForm.value.end_date = new Date(this.projectForm.value.end_date);

      if (!this.isSendRequest) {
        this.locations.push(this.locationObject);
      }
      this.isSendRequest = true;

      this.projectForm.value.locations = this.locations;


      this.uploadData.append('project', JSON.stringify(this.projectForm.value));
      this.dialogRef.close(this.uploadData);
    }
  }
  onChange(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      this.coverImage = e.target.files[0];
      this.uploadData.append('cover', this.coverImage, this.coverImage?.name);
    }
  }
  onChangeCover(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      this.logo = e.target.files[0];
      this.uploadData.append('logo', this.logo, this.logo?.name);
    }else {
      this.noFileLogo=true;
    }
  }
  get projectControl() {
    return this.projectForm.controls;
  }
  onRemoveCategory(e: string) {
    this.isRemoved = true;
    const category = this.projectForm.controls.category.value as string[];
    const index = category.indexOf(e);
    if (index !== -1) {
      category.splice(index, 1);
    }
    if (index == 0) {
      this.categoryStringClone = '';
    }
    this.projectForm.controls.category.patchValue(category);
  }
}
