import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { Organization } from 'src/app/models/organization/organization';
import { Project } from 'src/app/models/projects/project.model';
import { User } from 'src/app/models/user/user.model';
import { OrganizationsComponent } from 'src/app/pages/management/mod-organization/organizations/organizations.component';
import { ProjectComponent } from 'src/app/pages/management/mod-project/project/project.component';
import { UserManagementComponent } from 'src/app/pages/user-management/user-management.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingDataService } from 'src/app/services/get-entity/loading-data.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { OrganizationApiService } from 'src/app/services/organization/organization-api.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { ProjectFormComponent } from '../create/project-form/project-form.component';
import { OrganizationInforCardComponent } from '../request-components/organization-infor-card/organization-infor-card.component';
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
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
  isApproved?: boolean
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
  @Input() organizationInput: any;
  constructor(private pro: ProjectComponent, private org: OrganizationsComponent, private usersCom: UserManagementComponent, private getEntityService: LoadingDataService, private router: Router, private loadingService: LoadingService, private snackBar: SnackBarMessageComponent, private auth: AuthService, private dialog: MatDialog, private route: ActivatedRoute, private proApi: ProjectService, private location: Location, private orgApi: OrganizationApiService, private orgComponent: OrganizationInforCardComponent) {

  }

  ngOnInit(): void {
  

    this.check();
    
    this.isInformation = true;
  }
  check() {
    this.user = this.auth.currentUserValue;
    if (this.user?.role_id == 'organization_manager') {
      this.isAdmin = false;
    }
    this.organizationInput.operating_license
    console.log(  this.organizationInput.operating_license);
   
  }
  async getValueFromRoute() {


    if (this.organization?.result_code == 510) {
      this.isApproved = true;
    }
    this.loadingService.getOrganizationId.next(`${this.organizationInput[0]?.id}`);
    this.urlLogo = this.organization?.logo?.replace(/\\/g, '\/');
    // this.urlCover = this.organization?.cover?.split('|')[0];
    console.log(this.urlCover);
    switch (this.organization?.type) {
      case 'ngo': this.organization.type = 'Tổ chức phi chính phủ';
        break;
      case 'npo': this.organization.type = 'Tổ chức phi lợi nhuận';
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
    this.campaignsCopy = await this.orgApi.getCampaignsByOrgId(`${this.organization?.id}`);
    this.campaigns = this.campaignsCopy;
    if (this.campaigns) {
      for (var i = 0; i < this.campaigns.length; i++) {
        {
          this.campaigns[i].cover = this.campaigns[i]?.cover?.replace(/\\/g, '\/');

          this.campaigns[i].org_logo = this.campaigns[i]?.org_logo?.replace(/\\/g, '\/');
          switch (this.campaigns[i].type) {
            case 'donation': this.campaigns[i].type = 'Quyên Góp';
              this.campaigns[i].org_id = (this.campaigns[i].totalDonated! / this.campaigns[i].target!).toString();
              break;
            case 'recruitment': this.campaigns[i].type = 'Thiện Nguyện';
              this.campaigns[i].org_id = (this.campaigns[i].totalPaticipant! / this.campaigns[i].target!).toString();
              break;
          }
        }
      }


      this.passDataCampaigns = this.campaignsCopy;

    }
  }
  async getProjects() {
    this.projectsCopy = await this.orgApi.getProjectsByOrgId(`${this.organization?.id}`);
    this.projects = this.projectsCopy;
    if (this.projects) {
      for (var i = 0; i < this.projects.length; i++) {
        {
          this.projects[i].cover = this.projects[i]?.cover?.replace(/\\/g, '\/');
          this.projects[i].logo = this.projects[i]?.logo?.replace(/\\/g, '\/');
          this.projects[i].organizationLogo = this.projects[i]?.organizationLogo?.replace(/\\/g, '\/');
        }
      }


      this.passDataProjects = this.projectsCopy;
    }
  }

  openProjectForm() {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '768px',
      data: {
        title: 'Tạo dự án',
      }
    })

    dialogRef.afterClosed().subscribe(async data => {
      if (data) {
        this.loadingService.isLoading.next(true);
        let res: BaseResponse = await this.proApi.createProject(data);
        if (res.status == 0) {
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage('Tạo dự án thành công.Chờ phê duyệt từ ban quản trị', true)

          this.router.navigate(['/manager/manage-project']);
          this.pro.checkToGetData('pending');

        } else {
          this.dialog.open(ProjectFormComponent, {
            width: '768px',
            data: {
              title: 'Tạo dự án',
            }
          })
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage(res.message, false)
        }
      }
    })
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
