import { UtilService } from 'src/app/services/util-service/util.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(
    public utilService: UtilService
  ) { }

  ngOnInit(): void {
  }

}
