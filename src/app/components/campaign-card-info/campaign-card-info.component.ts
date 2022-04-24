import {Component, Input, OnInit} from '@angular/core';
import {Campaign} from 'src/app/models/campaign/campaign.model';
import {LoadingServiceService} from 'src/app/services/loading/loading-service.service';

@Component({
  selector: 'app-campaign-card-info',
  templateUrl: './campaign-card-info.component.html',
  styleUrls: ['./campaign-card-info.component.scss']
})
export class CampaignCardInfoComponent implements OnInit {
  @Input() campaign?: Campaign;
  @Input() valueNumber?: any;
  urlApi?: string;

  constructor(private loadingService: LoadingServiceService) {
  }

  ngOnInit(): void {
    this.urlApi = this.loadingService.getApiGetLink.value;
    this.valueNumber = (Number(this.campaign?.org_id) * 100).toFixed(2);

  }

}
