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

  items?: any;


  ngOnInit(): void {
    this.getStatistics();
  }

  async getStatistics() {
    this.items = await this.userService.getStatistics();
  }
}
