import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-card-info',
  templateUrl: './campaign-card-info.component.html',
  styleUrls: ['./campaign-card-info.component.scss']
})
export class CampaignCardInfoComponent implements OnInit {

  constructor() { }
  current=60000000;
  total = 120000000;
  ngOnInit(): void {
  }

}
