import { SnackBarMessageComponent } from './../../snack-bar-message/snack-bar-message.component';
import { LoadingService } from './../../../services/loading-service/loading.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Constant } from 'src/app/constant/constant';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-update-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss'],
})
export class OrganizationUpdateFormComponent implements OnInit {
  organizationForm!: FormGroup;
  isWrongFile?: boolean;
  category: any[] = Constant.CATEGORY;
  categoryString: string = '';
  categoryStringClone: string = '';
  isRemoved?: boolean;
  filePDF: File[] = [];
  isSubmitted?: boolean;
  logoFile?: File;
  coverFile?: File;
  @Input() data?: any;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private organizationService: OrganizationApiService,
    // public dialogRef: MatDialogRef<OrganizationUpdateFormComponent>,
    // public dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private snackBar: SnackBarMessageComponent
  ) {}

  ngOnInit(): void {
    this.initFormBuilder();
  }

  initFormBuilder() {
    // this.category = this.data.category.split('|')
    this.organizationForm = this.formBuilder.group({
      name: [
        this.data.name,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128),
          Validators.pattern('^(?!\\s*$).+'),
        ],
      ],
      eng_name: [this.data.eng_name],
      description: [
        this.data.description,
        [
          Validators.required,
          Validators.minLength(128),
          Validators.maxLength(1000),
        ],
      ],
      vision: [
        this.data.vision,
        [
          Validators.required,
          Validators.minLength(128),
          Validators.maxLength(1000),
        ],
      ],
      website: [this.data.website],
      founding_date: [new Date(this.data.founding_date).toISOString().substring(0,10), Validators.required],
      mission: [
        this.data.mission,
        [
          Validators.required,
          Validators.minLength(128),
          Validators.maxLength(1000),
        ],
      ],
      category: [''],
      logo: [''],
      cover: [''],
    });
  }

  async update() {
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

    if (this.organizationForm.valid) {
      let uploadData: any = new FormData();
      this.organizationForm.value.founding_date = new Date(
        this.organizationForm.value.founding_date
      );
      uploadData.append(
        'organization',
        JSON.stringify(this.organizationForm.value)
      );
      if (this.logoFile != null)
        uploadData.append('logo', this.logoFile, this.logoFile?.name);
      if (this.coverFile != null)
        uploadData.append('cover', this.coverFile, this.coverFile?.name);
      if (this.filePDF.length != 0)
        uploadData.append(
          'operating_license',
          this.filePDF[0],
          this.filePDF[0].name
        );
      this.loadingService.isLoading.next(true);
      let res: BaseResponse = await this.organizationService.updateById(
        uploadData,
        this.data.id
      );
      if (res?.status == 0) {
        this.snackBar.showMessage('Cập nhật thành công', true);
        window.location.reload();
      } else {
        this.snackBar.showMessage(res?.message, false);
      }
      this.router.navigate(['/manager/manage-organization']);
      this.loadingService.isLoading.next(false);
      // if (this.organizationId) {
      //   this.loadingService.isLoading.next(true);
      //   let res: BaseResponse | null = await this.orgApi.createById(
      //     uploadData,
      //     `${this.organizationId}`
      //   );
      //   if (res?.status == 0) {
      //     this.snackBar.showMessage(
      //       'Tạo tổ chức thành công. Yêu cầu của bạn đã được gửi',
      //       true
      //     );
      //     this.loadingService.isLoading.next(false);

      //     this.router.navigate(['/manager/manage-organization']);
      //     this.org.getAllOrganization();
      //   } else {
      //     this.snackBar.showMessage(`${res?.message}`, false);

      //     this.loadingService.isLoading.next(false);
      //   }
      // } else {
      //   this.loadingService.isLoading.next(true);
      //   let res: BaseResponse | null = await this.orgApi.create(uploadData);
      //   if (res?.status == 0) {
      //     this.snackBar.showMessage(
      //       'Tạo tổ chức thành công. Yêu cầu của bạn đã được gửi',
      //       true
      //     );
      //     this.loadingService.isLoading.next(false);
      //     this.org.getAllOrganization();
      //     this.router.navigate(['/manager']);
      //   } else {
      //     this.router.navigate(['/manager/manage-organization']);
      //     this.snackBar.showMessage(`${res?.message}`, false);
      //     this.loadingService.isLoading.next(false);
      //   }
      // }
    }
  }
  get organizationControl() {
    return this.organizationForm.controls;
  }

  onChangeLogo(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      this.logoFile = e.target.files[0];
    }
  }

  onChangeCover(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      this.coverFile = e.target.files[0];
    }
  }

  onRemoveCategory(e: any) {
    this.isRemoved = true;
    const category = this.organizationForm.controls.category.value as string[];
    const index = category.indexOf(e);
    // console.log(index);
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
      }
    }
  }

  onRemove(event: any) {
    this.filePDF.splice(this.filePDF.indexOf(event), 1);
  }
}
