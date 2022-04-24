import { Location } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { _SnackBarContainer } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CamapaignFormComponent } from 'src/app/components/create/camapaign-form/camapaign-form.component';
import { SelectTypeCampaignComponent } from 'src/app/components/select-type-campaign/select-type-campaign.component';
import { SnackBarMessageComponent } from 'src/app/components/snack-bar-message/snack-bar-message.component';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { Project } from 'src/app/models/projects/project.model';
import { User } from 'src/app/models/user/user.model';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CampaignApiService } from 'src/app/services/campaign/campaign-api.service';
import { LoadingDataService } from 'src/app/services/get-entity/loading-data.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
import { ProjectApiService } from 'src/app/services/project/project-api.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
@Injectable({ providedIn: 'root' })
export class ProjectDetailsComponent implements OnInit {

  project?: Project;
  user?: User;
  isAdmin = true;
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
  constructor(private getEntityService: LoadingDataService, private router: Router, private loadingService: LoadingServiceService, private snackBar: SnackBarMessageComponent, private auth: AuthServiceService, private location: Location, private proApi: ProjectApiService, private campApi: CampaignApiService, private actived: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getByID();
    this.check();
    this.urlApi = this.loadingService.getApiGetLink.value;
    this.isInformation = true;
    this.getCampaigns();

  }
  check() {
    this.user = this.auth.currentUserValue;
    if (this.user?.role === 'organization_manager') {
      this.isAdmin = false;
    }
  }
  async getCampaigns() {
    this.campaignsCopy = await this.proApi.getCampaignsByProjectId(`${this.actived.snapshot.paramMap.get('id')}`);
    this.campaigns = this.campaignsCopy;
    if (this.campaigns) {
      for (var i = 0; i < this.campaigns.length; i++) {
        {
          this.campaigns[i].cover = this.campaigns[i]?.cover?.replace(/\\/g, '\/');

          this.campaigns[i].org_logo = this.campaigns[i]?.org_logo?.replace(/\\/g, '\/');
          switch (this.campaigns[i].type) {
            case 'donation':
              this.campaigns[i].org_id = (this.campaigns[i].totalDonated! / this.campaigns[i].target!).toString();
              break;
            case 'recruitment':
              this.campaigns[i].org_id = (this.campaigns[i].totalPaticipant! / this.campaigns[i].target!).toString();
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
    if (this.project.resultCode == 610) {
      this.isApproved = true;
    }
    this.urlLogo = this.project?.organizationLogo?.replace(/\\/g, '\/');
    this.urlCover = this.project?.cover?.replace(/\\/g, '\/');


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
  openSelectCampaign() {
    const diaglogRef = this.dialog.open(SelectTypeCampaignComponent, {
      width: "300px",
    })
    diaglogRef.afterClosed().subscribe(data => {
      if (data) {
        if (data == 'donation') {
          this.whichType = 'donation';
        } else {
          this.whichType = 'recruitment';
        }
        this.openCampaignForm();
      }
    })
  }
  openCampaignForm() {
    const dialogRef = this.dialog.open(CamapaignFormComponent, {
      width: '700px',
      data: {
        title: 'Tạo chiến dịch',
        type:this.whichType,
      }
    })

    dialogRef.afterClosed().subscribe(async data => {
      if (data) {
        this.loadingService.isLoading.next(true);
        let res: BaseResponse | null = await this.campApi.create(data);
        if (res?.status == 0) {
          this.loadingService.isLoading.next(false);
          this.getEntityService.getByEntity('cam');
          this.router.navigate(['/manager/manage-campaign']);
          this.snackBar.showMessage(res.message, true)
        } else {
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage(`${res?.message}`, false)
        }
      }
    })
  }
}
