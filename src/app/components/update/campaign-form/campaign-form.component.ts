import { SnackBarMessageComponent } from './../../snack-bar-message/snack-bar-message.component';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { BaseResponse } from './../../../models/base-response/base-response';
import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Constant } from 'src/app/constant/constant';
import { Organization } from 'src/app/models/organization/organization';
import { Project } from 'src/app/models/projects/project.model';

import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';

@Component({
  selector: 'app-campaign-update-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss'],
})
export class CampaignUpdateFormComponent implements OnInit {
  coverImage?: File;
  constructor(
    private currency: CurrencyPipe,
    public loadingService: LoadingService,
    private campaignService: CampaignService,
    public authApi: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: SnackBarMessageComponent
  ) {}
  campaignForm!: FormGroup;
  isSubmitted?: boolean;
  organizations: Organization[] = [];
  projects: Project[] = [];
  selectedValue?: string;
  selectedRadio: string = '';
  cloneProjects: Project[] = [];
  type: string[] = ['Quyên góp', 'Tuyển tình nguyện viên'];
  uploadData: any = new FormData();
  isOnlyProject?: boolean;
  isRemoved?: boolean;
  category: any[] = Constant.CATEGORY;
  categoryString: string = '';
  categoryStringClone: string = '';
  projectName?: string;
  defaultNumber?: any;
  @Input() data: any;

  ngOnInit(): void {
    this.initForm();
  }
  getValue(element: any) {
    this.defaultNumber = this.currency.transform(this.defaultNumber, 'đ');
    element.target.value = this.defaultNumber;
  }
  initForm() {
    this.selectedRadio = (this.data.type == 'donation') ? 'Quyên góp' : 'Tuyển tình nguyện viên'
    this.campaignForm = this.formBuilder.group({
      selected: [this.selectedRadio, Validators.required],
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
        [Validators.required, Validators.minLength(128)],
      ],
      start_date: [
        new Date(this.data.start_date).toISOString().substring(0, 10),
        Validators.required,
      ],
      end_date: [
        new Date(this.data.end_date).toISOString().substring(0, 10),
        Validators.required,
      ],
      start_working_date: [
        new Date(this.data.start_working_date).toISOString().substring(0, 10),
        this.selectedRadio == 'Quyên góp' ? '' : Validators.required,
      ],
      end_working_date: [
        new Date(this.data.end_working_date).toISOString().substring(0, 10),
        this.selectedRadio == 'Quyên góp' ? '' : Validators.required,
      ],
      type: [this.selectedRadio, Validators.required],
      target_number: [this.data.target_number, Validators.required],
      job_requirement: [this.data.job_requirement],
      job_description: [this.data.job_description],
      job_benefit: [this.data.job_benefit],
      project_id: [this.data.pro_id],
      cover: [],
      category: [''],
    });
  }

  async update() {
    if (
      this.campaignForm.controls.category.value.length != 0 &&
      this.campaignForm.controls.category.value
    ) {
      if (this.isRemoved == true || this.isSubmitted == true) {
        this.categoryStringClone = '';
        for (
          let i = 0;
          i < this.campaignForm.controls.category.value.length;
          i++
        ) {
          this.categoryStringClone = this.campaignForm.controls.category.value[
            i
          ].name.concat('|', this.categoryStringClone);
        }
      } else {
        this.categoryStringClone = '';
        for (
          let i = 0;
          i < this.campaignForm.controls.category.value.length;
          i++
        ) {
          this.categoryStringClone = this.campaignForm.controls.category.value[
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
    } else {
      this.categoryString = '';
    }
    this.isSubmitted = true;

    this.projects = this.cloneProjects.filter((x) => {
      return x.name == this.campaignForm.value.selected;
    });
    if (this.projects.length != 0) {
      this.campaignForm.patchValue({ project_id: `${this.projects[0].id}` });
    }
    if (this.selectedRadio == 'Quyên góp') {
      this.campaignForm.patchValue({
        start_working_date: `${this.campaignForm.value.start_date}`,
      });
      this.campaignForm.patchValue({
        end_working_date: `${this.campaignForm.value.end_date}`,
      });
      this.campaignForm.patchValue({ type: 'donation' });
      this.campaignForm.removeControl('job_requirement');
      this.campaignForm.removeControl('job_description');
      this.campaignForm.removeControl('job_benefit');
    } else if (this.selectedRadio == 'Tuyển tình nguyện viên') {
      this.campaignForm.patchValue({ type: 'recruitment' });
    }

    console.log(this.campaignForm.value)

    if (this.campaignForm.valid) {
      this.campaignForm.value.category = this.categoryString;

      this.uploadData.append(
        'campaign',
        JSON.stringify(this.campaignForm.value)
      );

      let res: BaseResponse = await this.campaignService.updateById(
        this.uploadData,
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
      for (let i = 0; i < e.target.files.length; i++) {
        this.uploadData.append(
          'cover',
          e.target.files[i],
          e.target.files[i].name
        );
      }
      // this.coverImage = e.target.files[0];
    }
  }
  get campaignControl() {
    return this.campaignForm.controls;
  }
  getType(e: string) {
    if (e == 'Quyên góp') {
      this.campaignForm.patchValue({
        start_working_date: `${this.campaignForm.value.start_date}`,
      });
      this.campaignForm.patchValue({
        end_working_date: `${this.campaignForm.value.end_date}`,
      });
      this.campaignForm.removeControl('job_requirement');
      this.campaignForm.removeControl('job_description');
      this.campaignForm.removeControl('job_benefit');
    } else if (e == 'Tuyển tình nguyện viên') {
      this.campaignForm.setControl(
        'job_requirement',
        new FormControl('', [Validators.required, Validators.minLength(8)])
      );
      this.campaignForm.setControl(
        'job_description',
        new FormControl('', [Validators.required, Validators.minLength(8)])
      );
      this.campaignForm.setControl(
        'job_benefit',
        new FormControl('', [Validators.required, Validators.minLength(8)])
      );
    }
  }
  onRemoveCategory(e: string) {
    this.isRemoved = true;
    const category = this.campaignForm.controls.category.value as string[];
    const index = category.indexOf(e);
    if (index !== -1) {
      category.splice(index, 1);
    }
    if (index == 0) {
      this.categoryStringClone = '';
    }
    this.campaignForm.controls.category.patchValue(category);
  }
}
