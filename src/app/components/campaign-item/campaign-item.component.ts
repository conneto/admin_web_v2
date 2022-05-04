
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { UtilService } from 'src/app/services/util-service/util.service';

@Component({
  selector: 'app-campaign-item',
  templateUrl: './campaign-item.component.html',
  styleUrls: ['./campaign-item.component.scss']
})
export class CampaignItemComponent implements OnInit {
  @Input() campaign?: any;
  @Input() valueNumber?: any;
  urlApi?: string;
  isAdmin?: boolean;
  constructor(public utilService: UtilService, private userApi: AuthService, private router: Router, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.urlApi = this.loadingService.getApiGetLink.value;
    this.valueNumber = (Number(this.campaign?.value) * 100).toFixed(2);
    if (this.userApi.currentUserValue.role_id == 'admin') {
      this.isAdmin = true;
    }
  }
  goToDetails(id: any) {

    if (this.isAdmin) {
      this.router.navigate([`/admin/manage-campaign/campaign-details/${id}`])
    } else {
      this.router.navigate([`/manager/manage-campaign/campaign-details/${id}`])
    }
  }
}
