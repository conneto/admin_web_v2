import { Location } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { _SnackBarContainer } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CampaignForm } from 'src/app/components/create/campaign-form/campaign-form.component';
import { ProjectFormComponent } from 'src/app/components/create/project-form/project-form.component';
import { SelectTypeCampaignComponent } from 'src/app/components/select-type-campaign/select-type-campaign.component';
import { SnackBarMessageComponent } from 'src/app/components/snack-bar-message/snack-bar-message.component';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { Project } from 'src/app/models/projects/project.model';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { LoadingDataService } from 'src/app/services/get-entity/loading-data.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { OrganizationsComponent } from '../../mod-organization/organizations/organizations.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class ProjectDetailsComponent implements OnInit {
  project?: Project;
  user?: User;
  isAdmin?: boolean;
  urlApi: string = '';
  urlLogo?: string = '';
  urlCover?: string = '';
  isApproved?: boolean;
  isInformation?: boolean;
  isCampaigns?: boolean;
  campaigns: Campaign[] = [];
  campaignsCopy: Campaign[] = [];
  noResultBySearch?: boolean;
  passData?: any;
  whichType?: any;
  organization?: any;
  isEmpty?: boolean;
  isOpenUpdateForm?: boolean = false;
  
  constructor(
    private organizationService: OrganizationApiService,
    private getEntityService: LoadingDataService,
    private snackBar: SnackBarMessageComponent,
    private auth: AuthService,
    private location: Location,
    private proApi: ProjectService,
    private campaignService: CampaignService,
    private actived: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackBarMessageComponent,
    private loadingService: LoadingService,
    private api: ProjectService,
    private authApi: AuthService
  ) {}

  ngOnInit(): void {
    this.getByID();
    this.check();
    this.urlApi = this.loadingService.getApiGetLink.value;
    this.isInformation = true;
    this.getCampaigns();
  }
  check() {
    if (this.auth.currentUserValue.role_id == 'organization_manager') {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
  }
  async getCampaigns() {
    this.campaignsCopy = await this.proApi.getCampaignsByProjectId(
      `${this.actived.snapshot.paramMap.get('id')}`
    );

    if (this.campaignsCopy.length == 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
      this.campaigns = this.campaignsCopy.filter((x) => {
        return x.result_code != 703;
      });

      for (var i = 0; i < this.campaigns.length; i++) {
        switch (this.campaigns[i].type) {
          case 'donation':
            Object.assign(this.campaigns[i], {
              value: (
                this.campaigns[i].total_donated! / this.campaigns[i].target_number!
              ).toString(),
            });
            break;
          case 'recruitment':
            Object.assign(this.campaigns[i], {
              value: (
                this.campaigns[i].total_participant! / this.campaigns[i].target_number!
              ).toString(),
            });
            break;
        }
      }
    }

    if (this.campaigns) {
      for (var i = 0; i < this.campaigns.length; i++) {
        {
          this.campaigns[i].cover = this.campaigns[i]?.cover?.replace(
            /\\/g,
            '/'
          );

          this.campaigns[i].org_logo = this.campaigns[i]?.org_logo?.replace(
            /\\/g,
            '/'
          );
          switch (this.campaigns[i].type) {
            case 'donation':
              this.campaigns[i].org_id = (
                this.campaigns[i].total_donated! / this.campaigns[i].target_number!
              ).toString();
              break;
            case 'recruitment':
              this.campaigns[i].org_id = (
                this.campaigns[i].total_participant! / this.campaigns[i].target_number!
              ).toString();
              break;
          }
        }
      }
    }
    this.passData = this.campaignsCopy;
  }
  getData(e: any) {
    if (e == null || e.length <= 0) {
      this.noResultBySearch = true;
      this.campaigns = e;
    } else {
      this.noResultBySearch = false;
      this.campaigns = e;
    }
  }

  async getByID() {
    const id = this.actived.snapshot.paramMap.get('id');
    this.project = await this.proApi.getByID(`${id}`);

    this.loadingService.projectId.next(`${id}`);
    if (this.project.result_code == 610) {
      this.isApproved = true;
    }
    this.urlLogo = this.project?.organization_logo?.replace(/\\/g, '/');
    this.urlCover = this.project?.cover?.replace(/\\/g, '/');
  }
  goBack() {
    this.location.back();
  }
  getTab(id: any) {
    switch (id) {
      case 'infor':
        this.isInformation = true;
        this.isCampaigns = false;

        break;

      case 'cam':
        this.isCampaigns = true;
        this.isInformation = false;

        break;
    }
  }
  openCampaignForm() {
    const dialogRef = this.dialog.open(CampaignForm, {
      width: '768px',
      data: {
        title: 'Tạo chiến dịch',
        project: this.project,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        this.loadingService.isLoading.next(true);
        let res: BaseResponse | null = await this.campaignService.create(data);
        if (res?.status == 0) {
          this.loadingService.isLoading.next(false);

          this.router.navigate(['/manager/manage-campaign']);
          this.snackBar.showMessage(
            'Tạo chiến dịch thành công.Đợi phê duyệt từ ban quản trị !',
            true
          );
        } else {
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage(`${res?.message}`, false);
        }
      }
    });
  }
  async openProjectForm() {
    this.organization = await this.organizationService.getAll();
    this.loadingService.getOrganizationId.next(`${this.organization[0].id}`);
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '768px',
      data: {
        title: 'Tạo dự án',
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        this.loadingService.isLoading.next(true);
        let res: BaseResponse = await this.api.createProject(data);
        if (res.status == 0) {
          this.loadingService.isLoading.next(false);
          this.snackbar.showMessage(
            'Tạo dự án thành công.Chờ phê duyệt từ ban quản trị',
            true
          );

          this.router.navigate(['/manager/manage-project']);
        } else {
          this.dialog.open(ProjectFormComponent, {
            width: '768px',
            data: {
              title: 'Tạo dự án',
            },
          });
          this.loadingService.isLoading.next(false);
          this.snackbar.showMessage(res.message, false);
        }
      }
    });
  }
}
