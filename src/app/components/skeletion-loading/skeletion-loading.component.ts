import { Component, Input, OnInit } from '@angular/core';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';

@Component({
  selector: 'app-skeletion-loading',
  templateUrl: './skeletion-loading.component.html',
  styleUrls: ['./skeletion-loading.component.scss']
})
export class SkeletionLoadingComponent implements OnInit {
  @Input() count: any;
  constructor(public loading: LoadingServiceService) { }

  ngOnInit(): void {
  }

}
