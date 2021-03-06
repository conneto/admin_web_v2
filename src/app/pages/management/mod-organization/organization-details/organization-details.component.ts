import { Location } from '@angular/common';

import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectFormComponent } from 'src/app/components/create/project-form/project-form.component';
import { OrganizationInforCardComponent } from 'src/app/components/request-components/organization-infor-card/organization-infor-card.component';
import { SnackBarMessageComponent } from 'src/app/components/snack-bar-message/snack-bar-message.component';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { Organization } from 'src/app/models/organization/organization';
import { Project } from 'src/app/models/projects/project.model';
import { User } from 'src/app/models/user/user.model';
import { UserManagementComponent } from 'src/app/pages/user-management/user-management.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingDataService } from 'src/app/services/get-entity/loading-data.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { ProjectComponent } from '../../mod-project/project/project.component';

import { OrganizationsComponent } from '../organizations/organizations.component';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class OrganizationDetailsComponent implements OnInit {
  organization?: Organization;
  user?: User;
  users?: User[] = [];
  isAdmin = true;
  urlApi = this.loadingService.getApiGetLink.value;
  urlCover?: string;
  urlLogo?: string;
  idGeneral?: any;
  isApproved?: boolean;
  isInformation?: boolean;
  isCampaigns?: boolean;
  isProjects?: boolean;
  oldData: any;
  passData: any;
  noResultBySearch?: boolean;
  projects?: Project[] = [];
  projectsCopy?: Project[] = [];
  campaignsCopy?: Campaign[] = [];
  status?: any;
  campaigns?: Campaign[] = [];
  isGetPro?: boolean = false;
  isGetCam?: boolean = false;
  passDataCampaigns: any;
  passDataProjects: any;
  constructor(
    private pro: ProjectComponent,
    private org: OrganizationsComponent,
    private usersCom: UserManagementComponent,
    private getEntityService: LoadingDataService,
    private router: Router,
    private loadingService: LoadingService,
    private snackBar: SnackBarMessageComponent,
    private auth: AuthService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private proApi: ProjectService,
    private location: Location,
    private organizationService: OrganizationService,
    private orgComponent: OrganizationInforCardComponent
  ) {}

  ngOnInit(): void {
    this.getValueFromRoute();
    this.check();

    this.isInformation = true;
  }


  check() {
    this.user = this.auth.currentUserValue;
    if (this.user?.role_id == 'organization_manager') {
      this.isAdmin = false;
    }
  }
  async getValueFromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    this.organization = await this.organizationService.getById(`${id}`);
    if (this.organization?.result_code == 510 || this.organization?.result_code == 531) {
      this.isApproved = true;
    }
    this.loadingService.getOrganizationId.next(`${id}`);

    switch (this.organization?.type) {
      case 'ngo':
        this.organization.type = 'T??? ch???c phi ch??nh ph???';
        break;
      case 'npo':
        this.organization.type = 'T??? ch???c phi l???i nhu???n';
        break;
    }
  }
  goBack() {
    this.location.back();
  }
  getTab(id?: string) {
    switch (id) {
      case 'infor':
        this.isInformation = true;
        this.isCampaigns = false;
        this.isProjects = false;
        break;
      case 'pro':
        if (this.isGetPro == false) {
          this.getProjects();
          this.isGetPro = true;
        }
        this.isProjects = true;
        this.isInformation = false;
        this.isCampaigns = false;
        break;
      case 'cam':
        if (this.isGetCam == false) {
          this.getCampaigns();
          this.isGetCam = true;
        }
        this.isCampaigns = true;
        this.isInformation = false;
        this.isProjects = false;
        break;
    }
  }
  async getCampaigns() {
    this.campaignsCopy = await this.organizationService.getCampaignsByOrgId(
      `${this.route.snapshot.paramMap.get('id')}`
    );
    this.campaigns = this.campaignsCopy;
    if (this.campaigns) {
      this.passDataCampaigns = this.campaignsCopy;

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
  }
  async getProjects() {
    this.projectsCopy = await this.organizationService.getProjectsByOrgId(
      `${this.route.snapshot.paramMap.get('id')}`
    );
    this.projects = this.projectsCopy;
    if (this.projects) {
      for (var i = 0; i < this.projects.length; i++) {
        {
          this.projects[i].cover = this.projects[i]?.cover?.replace(/\\/g, '/');
          this.projects[i].logo = this.projects[i]?.logo?.replace(/\\/g, '/');
          this.projects[i].organization_logo = this.projects[
            i
          ]?.organization_logo?.replace(/\\/g, '/');
        }
      }

      this.passDataProjects = this.projectsCopy;
    }
  }
  public get getId() {
    this.getValueFromRoute();
    return this.route.snapshot.paramMap.get('id');
  }
  openProjectForm() {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '768px',
      data: {
        title: 'T???o d??? ??n',
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        this.loadingService.isLoading.next(true);
        let res: BaseResponse = await this.proApi.createProject(data);
        if (res.status == 0) {
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage(
            'T???o d??? ??n th??nh c??ng.Ch??? ph?? duy???t t??? ban qu???n tr???',
            true
          );

          this.router.navigate(['/manager/manage-project']);
          this.pro.checkToGetData('pending');
        } else {
          this.dialog.open(ProjectFormComponent, {
            width: '768px',
            data: {
              title: 'T???o d??? ??n',
            },
          });
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage(res.message, false);
        }
      }
    });
  }
  getData(e: any) {
    if (e == null || e.length <= 0) {
      if (this.isProjects) {
        this.noResultBySearch = true;
        this.projects = e;
      } else {
        this.noResultBySearch = true;
        this.campaigns = e;
      }
    } else {
      if (this.isProjects) {
        this.noResultBySearch = false;
        this.projects = e;
      } else {
        this.noResultBySearch = false;
        this.campaigns = e;
      }
    }
  }
}
