import { Component, Input, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { Dashboard } from 'src/app/models/dashboard/dashboard.model';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {
  @Input() isChange?: boolean;
  @Input() card?: Dashboard;
  @Input() title?: string;
  @Input() isAmount?: boolean;
  @Input() number?: number;
  @Input() icon?:string;
  positionTooltip: TooltipPosition = 'above';
  constructor() { }

  ngOnInit(): void {
  }

}
