import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangeToListComponent } from 'src/app/components/change-to-list/change-to-list.component';
import { CamapaignFormComponent } from 'src/app/components/create/camapaign-form/camapaign-form.component';

import { SnackBarMessageComponent } from 'src/app/components/snack-bar-message/snack-bar-message.component';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { Project } from 'src/app/models/projects/project.model';
import { User } from 'src/app/models/user/user.model';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { ProjectService } from 'src/app/services/project-service/project.service';



@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class CampaignsComponent implements OnInit {
  campaigns: Campaign[] = [];
  passData: any[] = [];
  oldData: any[] = [];
  user?: User;
  isEmpty?: boolean = false;
  isRequest?: boolean;
  isLoaded?: boolean;
  noResultBySearch?: boolean;
  number?: any;
  value?: any;
  isList?: boolean = false;
  isAdmin?: boolean;
  isApprovedProject?: boolean;
  projects: Project[] = [];
  @ViewChild('changeView') changeView?: ChangeToListComponent;
  constructor(private projectService: ProjectService, private snackBar: SnackBarMessageComponent, private router: Router, private camApi: CampaignService, private loadingService: LoadingService, private dialog: MatDialog, private api: CampaignService, private authApi: AuthServiceService) { }

  ngOnInit(): void {
    this.checkToGetData();
    if (this.authApi.currentUserValue.role == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    this.checkProject();
  }
  async checkProject() {

    if (this.authApi.currentUserValue.role == 'organization_manager') {
      this.projects = await this.projectService.getAll();
      this.projects = this.projects.filter(x => {
        return x.resultCode == 610;
      })
      if (this.projects.length > 0) {
        this.isApprovedProject = true;
      } else {
        this.isApprovedProject = false;
      }
    }
  }
  ngOnDestroy(): void {

    localStorage.removeItem('reject');
    localStorage.removeItem('pending');
  }
  handleTitle(e: any) {
    this.noResultBySearch = false;
    if (e == 'list') {
      this.isList = true;
    } else {
      this.isList = false;
    }
  }
  changeViewGrid() {
    this.changeView?.changeView(true);
  }
  getData(e: any) {
    if (e == null || e.length <= 0) {
      this.noResultBySearch = true;
      this.campaigns = e;
    } else {
      this.campaigns = e;
      this.noResultBySearch = false;

    }
  }
  openCampaignForm() {
    const dialogRef = this.dialog.open(CamapaignFormComponent, {
      width: '700px',
      data: {
        title: 'Tạo chiến dịch',
        project: this.campaigns,
      }
    })

    dialogRef.afterClosed().subscribe(async data => {
      if (data) {

        this.loadingService.isLoading.next(true);
        let res: BaseResponse | null = await this.camApi.create(data);
        if (res?.status == 0) {
          this.loadingService.isLoading.next(false);

          this.router.navigate(['/manager/manage-campaign']);
          this.snackBar.showMessage("Tạo chiến dịch thành công.Đợi phê duyệt từ ban quản trị !", true)
        } else {
          this.loadingService.isLoading.next(false);
          this.snackBar.showMessage(`${res?.message}`, false)
        }
      }
    })
  }
  async checkToGetData(pending?: string) {
    this.campaigns = await this.api.getAll();

    this.passData = this.campaigns;
    if (pending == 'pending') {
      this.getAllCampaignsByStatus('pending');
      localStorage.setItem('pending', 'true');
    }
    if (!localStorage.getItem('reject') && !localStorage.getItem('approve')
      && !localStorage.getItem('pending')
    ) {
      this.getAllCampaignsByStatus('approve');
      localStorage.setItem('approve', 'true');
    } else {
      if (localStorage.getItem('reject')) {
        this.getAllCampaignsByStatus('reject');

      } else if (localStorage.getItem('approve')) {
        this.getAllCampaignsByStatus('approve');
      } else if (localStorage.getItem('pending')) {
        this.getAllCampaignsByStatus('pending');
      }
    }

  }
  async getAllCampaignsByStatus(status?: string, pro?: any) {
    this.user = this.authApi.currentUserValue;
    if (pro) {
      this.campaigns = pro;
    }
    if (status) {
      this.isList = false;
      this.changeViewGrid();

    }
    switch (status) {

      case 'approve':
        this.isLoaded = true;
        this.isRequest = false;
        for (var i = 0; i < this.campaigns.length; i++) {
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
          var a = Date.parse(`${this.campaigns[i].startDate}`);
          var b = Date.parse(`${this.campaigns[i].endDate}`);
          var c = Date.now();

          // console.log((b - c) / (1000 * 60 * 60 * 24));
        }

        this.campaigns = this.campaigns.filter(x => {
          return x.result_code == 710;
        })
        this.oldData = this.passData.filter(x => x.result_code == 710);
        this.isEmpty = false;
        if (this.campaigns == [] || this.campaigns.length <= 0) {
          this.isEmpty = true;
        }
        break;
      case 'reject':
        this.isLoaded = true;
        this.isRequest = false;
        for (var i = 0; i < this.campaigns.length; i++) {
          this.campaigns[i].cover = this.campaigns[i]?.cover?.replace(/\\/g, '\/');
          this.campaigns[i].org_logo = this.campaigns[i]?.org_logo?.replace(/\\/g, '\/');

        }

        this.campaigns = this.campaigns.filter(x => {
          return x.result_code == 711;
        })
        this.oldData = this.passData.filter(x => x.result_code == 711);
        this.isEmpty = false;
        if (this.campaigns == null || this.campaigns.length <= 0) {
          this.isEmpty = true;
        }
        break;
      case 'pending':
        this.isLoaded = true;
        for (var i = 0; i < this.campaigns.length; i++) {
          this.campaigns[i].cover = this.campaigns[i]?.cover?.replace(/\\/g, '\/');
          this.campaigns[i].org_logo = this.campaigns[i]?.org_logo?.replace(/\\/g, '\/');

        }

        this.campaigns = this.campaigns.filter(x => {
          return x.result_code == 701;
        })
        this.oldData = this.passData.filter(x => x.result_code == 701);
        if (this.authApi.currentUserValue.role == 'admin') {
          this.isRequest = true;
        } else {
          this.isRequest = false;
        }
        this.isEmpty = false;
        if (this.campaigns == null || this.campaigns.length <= 0) {
          this.isEmpty = true;
        }
        break;


    }
    this.number = this.campaigns.length;

  }

  async getAll() {
    this.campaigns = await this.api.getAll();

  }
}
