import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserApiService } from 'src/app/services/user/user-api.service';
export interface Rank {
  volunteer_name: string;
  type: string;
  donated_amount: string;
  donated_campaign: string;
  donated_turn: string;
  no: string;
}
@Component({
  selector: 'app-table-rank',
  templateUrl: './table-rank.component.html',
  styleUrls: ['./table-rank.component.scss']
})
export class TableRankComponent implements OnInit {

  displayColumns: string[] = ['no', 'name', 'donated_turn', 'donated_campaign', 'donated_amount'];

  displayParticipateColumns: string[] = ['no', 'name', 'participated_turn', 'participated_campaign'];
  dataDonate: Rank[] = [];
  dataRecruitment: any;
  dataSource: any;
  dataOfRecruitment: any;
  isLoaded?: boolean;
  constructor(private userApi: UserApiService) { }

  ngOnInit(): void {
    this.getData();
    this.getDataOfRecruitment();

  }
  async getData() {
    this.dataDonate = await this.userApi.getRanking();
    for (var i = 0; i < this.dataDonate.length; i++) {
      Object.assign(this.dataDonate[i], { no: i + 1 });

    }
    this.dataSource = new MatTableDataSource(this.dataDonate);


    this.isLoaded = true;
  }
  async getDataOfRecruitment() {
    this.dataRecruitment = await this.userApi.getRanking('recruitment');
    for (var i = 0; i < this.dataRecruitment.length; i++) {
      Object.assign(this.dataRecruitment[i], { no: i + 1 });
    }
    this.dataOfRecruitment = new MatTableDataSource(this.dataRecruitment)
  }
}
