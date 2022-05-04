import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadingService } from 'src/app/services/loading-service/loading.service';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit {
  @Input() oldData?: any;
  @Input() entity?: any;
  @Input() type?: any;
  @Output() passData = new EventEmitter<any>();
  isNoMore?: any;
  @Output() noMore = new EventEmitter<any>();
  constructor(private loading: LoadingService,) { }

  ngOnInit(): void {
  }
  sendData(e: any) {
    this.passData.emit(e);
  }
  sendNoMore(e: any) {
    this.noMore.emit(e);
  }
  showMore() {
    this.loading.isLoading.next(true);
    setTimeout(() => {
      let newLength = this.entity.length + 6;

      if (newLength > this.oldData.length) {
        newLength = this.oldData.length;
      }
      this.entity = this.oldData.slice(0, newLength);
      console.log(this.entity);
      this.sendData(this.entity);
      this.checkShowMore();
      this.loading.isLoading.next(false);
    }, 300)
  }

  checkShowMore() {
    if (this.entity.length > 8) {
      if (this.entity.length == this.oldData.length) {
        this.isNoMore = true;
        this.sendNoMore(this.isNoMore);
      }
    }
  }
}
