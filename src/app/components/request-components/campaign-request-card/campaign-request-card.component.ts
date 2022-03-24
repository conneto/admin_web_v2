import { Component, Input, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/campaign/campaign.model';

@Component({
  selector: 'app-campaign-request-card',
  templateUrl: './campaign-request-card.component.html',
  styleUrls: ['./campaign-request-card.component.scss']
})
export class CampaignRequestCardComponent implements OnInit {
@Input() campaign?:Campaign;
  constructor() { }

  ngOnInit(): void {
  }
  viewDetails(){
    
  }
}
