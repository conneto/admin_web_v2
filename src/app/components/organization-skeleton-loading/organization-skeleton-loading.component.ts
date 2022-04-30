import { LoadingService } from 'src/app/services/loading/loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-skeleton-loading',
  templateUrl: './organization-skeleton-loading.component.html',
  styleUrls: ['./organization-skeleton-loading.component.scss']
})
export class OrganizationSkeletonLoadingComponent implements OnInit {

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
  }

}
