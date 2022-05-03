import {Component, Input, OnInit} from '@angular/core';
import {Campaign} from 'src/app/models/campaign/campaign.model';
import {LoadingService} from 'src/app/services/loading-service/loading.service';
import {UtilService} from "../../services/util-service/util.service";

@Component({
  selector: 'app-campaign-card-info',
  templateUrl: './campaign-card-info.component.html',
  styleUrls: ['./campaign-card-info.component.scss']
})
export class CampaignCardInfoComponent implements OnInit {
  @Input() campaign?: any;
  @Input() valueNumber?: any;
  urlApi?: string;
  @Input() receivedValue?:any

  constructor(private loadingService: LoadingService, public utilService: UtilService) {
  }

  ngOnInit(): void {
    this.urlApi = this.loadingService.getApiGetLink.value;
    this.valueNumber = (Number(this.campaign?.value) * 100).toFixed(2);
    console.log(this.valueNumber);
    
  }

}
