import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/organization/organization';

@Component({
  selector: 'app-organization-infor-card',
  templateUrl: './organization-infor-card.component.html',
  styleUrls: ['./organization-infor-card.component.scss']
})
export class OrganizationInforCardComponent implements OnInit {
  @Input() organizations?: Organization;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  viewDetails(id:string) {
    console.log(id);
    this.router.navigate(['admin/organization-request/organization-request-detail/:'+id]);
  }
}
