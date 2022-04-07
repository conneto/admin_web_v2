import { Component, Input, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/campaign/campaign.model';

@Component({
  selector: 'app-campaign-card-info',
  templateUrl: './campaign-card-info.component.html',
  styleUrls: ['./campaign-card-info.component.scss']
})
export class CampaignCardInfoComponent implements OnInit {
@Input() campaign?:Campaign;
  constructor() { }
  current=60000000;
  total = 120000000;
  ngOnInit(): void {
  }

}
