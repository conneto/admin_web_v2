import { Component, Input, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/models/dashboard/dashboard.model';
import { UserApiService } from 'src/app/services/user/user-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userApi: UserApiService) { }
  cards?: Dashboard;



  ngOnInit(): void {
    this.getStatistics();
  }
  async getStatistics() {
    this.cards = await this.userApi.getStatistics();
    console.log(this.cards);
  }
}
