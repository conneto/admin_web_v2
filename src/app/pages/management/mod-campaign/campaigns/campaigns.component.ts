import { CurrencyPipe } from '@angular/common';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangeToListComponent } from 'src/app/components/change-to-list/change-to-list.component';
import { CampaignForm } from 'src/app/components/create/campaign-form/campaign-form.component';

import { SnackBarMessageComponent } from 'src/app/components/snack-bar-message/snack-bar-message.component';
import { BaseResponse } from 'src/app/models/base-response/base-response';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { Project } from 'src/app/models/projects/project.model';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  isTabRejected?: boolean;
  isTabPending?: boolean;
  percentValue?: boolean;
  @ViewChild('changeView') changeView?: ChangeToListComponent;
  constructor(private projectService: ProjectService, private snackBar: SnackBarMessageComponent, private router: Router, private camApi: CampaignService, private loadingService: LoadingService, private dialog: MatDialog, private api: CampaignService, private authApi: AuthService) { }

  ngOnInit(): void {
    this.checkToGetData();
    if (this.authApi.currentUserValue.role_id == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    this.checkProject();
  }
  getEntity(e: any) {
    if (e?.length != 0) {
      // console.log(e);
      this.isEmpty = false;
      this.campaigns = e;
      this.oldData = e;
    } else {
      this.isEmpty = true;
      this.campaigns = e;
    }
  }
  getTabGroupState(e: any) {
    if (e) {
      if (e == 'pending') {
        this.isTabPending = true;
      } else {
        this.isTabPending = false;
      }
      if (e == 'reject') {
        this.isTabRejected = true;
      } else {
        this.isTabRejected = false;
      }
    }


  }
  async checkProject() {

    if (this.authApi.currentUserValue.role_id == 'organization_manager') {
      this.projects = await this.projectService.getAll();
      this.projects = this.projects.filter(x => {
        return x.result_code == 610 || x.result_code==631 || x.result_code==620  || x.result_code==621;
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
    const dialogRef = this.dialog.open(CampaignForm, {
      width: '768px',
      data: {
        title: 'Tạo chiến dịch',

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
              // this.campaigns[i].org_id = (this.campaigns[i].totalDonated! / this.campaigns[i].target!).toString();
              Object.assign(this.campaigns[i], { value: (this.campaigns[i].total_donated! / this.campaigns[i].target_number!).toString() });
              break;
            case 'recruitment':
              Object.assign(this.campaigns[i], { value: (this.campaigns[i].total_participant! / this.campaigns[i].target_number!).toString() });
              break;
          }

        }

        this.campaigns = this.campaigns.filter(x => {
          return x.result_code == 710 ||  x.result_code == 731 ||  x.result_code == 720||  x.result_code == 721
        })
        this.oldData = this.passData.filter(x => x.result_code == 710 ||  x.result_code == 731 ||  x.result_code == 720 ||  x.result_code == 721);
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
          return x.result_code == 701 || x.result_code == 703||  x.result_code == 702
        })
        console.log(this.campaigns);
        this.oldData = this.passData.filter(x => x.result_code == 701  || x.result_code == 703 ||  x.result_code == 702);
        if (this.authApi.currentUserValue.role_id == 'admin') {
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
