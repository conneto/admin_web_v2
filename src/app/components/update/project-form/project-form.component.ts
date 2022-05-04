import { SnackBarMessageComponent } from './../../snack-bar-message/snack-bar-message.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-project-update-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectUpdateFormComponent implements OnInit {
  constructor(
    private router: Router,
    public organizationId: LoadingService,
    private authApi: AuthService,
    private projectService: ProjectService,
    private loadingService: LoadingService,
    private snackBar: SnackBarMessageComponent,
    private formBuilder: FormBuilder
  ) { }
  projectForm!: FormGroup;
  coverImage?: File;
  logo?: File;
  isSubmitted?: boolean;
  isRemoved?: boolean;
  category: any[] = Constant.CATEGORY;
  categoryStringClone?: any;
  categoryString?: any;
  @Input() data: any;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.projectForm = this.formBuilder.group({
      name: [
        this.data.name,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128),
        ],
      ],
      description: [
        this.data.description,
        [
          Validators.required,
          Validators.minLength(128),

        ],
      ],
      start_date: [
        new Date(this.data.start_date).toISOString().substring(0, 10),
        Validators.required,
      ],
      end_date: [
        new Date(this.data.end_date).toISOString().substring(0, 10),
        Validators.required,
      ],
      organization_id: [this.organizationId.getOrganizationId.value],
      cover: [''],
      logo: [''],
      category: [''],
    });
  }

  async update() {
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

    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
      let uploadData: any = new FormData();
      if (this.coverImage != null)
        uploadData.append('cover', this.coverImage, this.coverImage?.name);
      if (this.logo != null)
        uploadData.append('logo', this.logo, this.logo?.name);
      uploadData.append('project', JSON.stringify(this.projectForm.value));
      let res: BaseResponse = await this.projectService.updateById(
        uploadData,
        this.data.id
      );
      if (res?.status == 0) {
        window.location.reload();
        this.snackBar.showMessage('Cập nhật thành công', true);
      } else {
        this.snackBar.showMessage(res?.message, false);
      }
      this.loadingService.isLoading.next(false);

    }
  }
  onChange(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      this.coverImage = e.target.files[0];
    }
  }
  onChangeCover(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      this.logo = e.target.files[0];
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
