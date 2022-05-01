import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading-service/loading.service';

@Component({
  selector: 'app-skeletion-loading',
  templateUrl: './skeletion-loading.component.html',
  styleUrls: ['./skeletion-loading.component.scss']
})
export class SkeletionLoadingComponent implements OnInit {
  @Input() count: any;
  constructor(public loading: LoadingService) { }

  ngOnInit(): void {
  }

}
