import {Component, Input, OnInit} from '@angular/core';
import {Dashboard} from 'src/app/models/dashboard/dashboard.model';
import {UserService} from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  cards?: Dashboard;


  ngOnInit(): void {
    this.getStatistics();
  }

  async getStatistics() {
    this.cards = await this.userService.getStatistics();
    console.log(this.cards);
  }
}
