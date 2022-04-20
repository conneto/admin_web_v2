
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';

@Component({
  selector: 'app-campaign-item',
  templateUrl: './campaign-item.component.html',
  styleUrls: ['./campaign-item.component.scss']
})
export class CampaignItemComponent implements OnInit {
  @Input() campaign?: Campaign;
  @Input() valueNumber?: any;
  urlApi?: string;
  isAdmin?: boolean;
  constructor(private userApi: AuthServiceService, private router: Router, private loadingService: LoadingServiceService) { }

  ngOnInit(): void {
    this.urlApi = this.loadingService.getApiGetLink.value;
    this.valueNumber = (Number(this.campaign?.org_id) * 100).toFixed(2);
    if (this.userApi.currentUserValue.role == 'admin') {
      this.isAdmin = true;
    }

  }
  goToDetail(id: any) {
 
    if (this.isAdmin) {
      this.router.navigate([`/admin/manage-campaign/campaign-details/${id}`])
    } else {
      this.router.navigate([`/manager/manage-campaign/campaign-details/${id}`])
    }
  }
}
