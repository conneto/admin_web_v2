import { Component, Input, OnInit } from '@angular/core';
import { DashboardCardInformation } from 'src/app/models/card/dashboard-card-information';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  constructor() { }
  cards: Array<DashboardCardInformation> = [
    {
      "title": "TOP DONATION 2",
      "value": "100000",
      "status": "Increase",
      "date": "last month",
      "icon": "assets/icon/donation-icon.png",
    },
    {
      "title": "TOP DONATION 1",
      "value": "100000",
      "status": "Increase",
      "date": "last year",
      "icon": "assets/icon/project-icon.png",
    },
    {
      "title": "TOP DONATION 3",
      "value": "100000",
      "status": "Increase",
      "date": "last month",
      "icon": "assets/icon/environment.png",
    },
    {
      "title": "TOP DONATION",
      "value": "100000",
      "status": "Decrease",
      "date": "last week",
      "icon": "assets/icon/organization-icon.png",
    },
  ];


  ngOnInit(): void {
  }

}
