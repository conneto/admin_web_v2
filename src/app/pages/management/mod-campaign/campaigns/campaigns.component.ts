import { Component, Injectable, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { User } from 'src/app/models/user/user.model';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { CampaignApiService } from 'src/app/services/campaign/campaign-api.service';

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
  constructor(private api: CampaignApiService, private authApi: AuthServiceService) { }

  ngOnInit(): void {
    this.checkToGetData();
  }
  ngOnDestroy(): void {

    localStorage.removeItem('reject');
    localStorage.removeItem('pending');
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
  async checkToGetData(pending?:string) {
    this.campaigns = await this.api.getAll();

    this.passData = this.campaigns;
    if(pending=='pending'){
      this.getAllCampaignsByStatus('pending');
      localStorage.setItem('pending','true');
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
