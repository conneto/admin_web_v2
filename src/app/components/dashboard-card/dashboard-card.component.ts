import { Component, Input, OnInit } from '@angular/core';
import { DashboardCardInformation } from 'src/app/models/card/dashboard-card-information';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {
  @Input() isChange?: boolean;
  @Input() card?: DashboardCardInformation;
  constructor() { }

  ngOnInit(): void {
  }

}
