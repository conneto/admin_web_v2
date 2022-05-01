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
  @Input() isAmount?: boolean;
  @Input() item?: any;
  numberShow: number = 0;
  positionTooltip: TooltipPosition = 'above';
  constructor() { }

  counting: any = setInterval(() => {
    this.numberShow++;
    if (this.numberShow == this.item.number) {
      clearInterval(this.counting);
    }
  }, 40)
  ngOnInit(): void {
  }

}
