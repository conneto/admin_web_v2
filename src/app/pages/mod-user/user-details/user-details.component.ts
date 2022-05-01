import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util-service/util.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  urlApi?: string = "";
  user?: User;
  userId?: string;
  campaign_participations: Array<any> = [];

  constructor(
    public utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private loadingService: LoadingService
  ) {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.urlApi = this.loadingService.getApiGetLink.value;
   }

  ngOnInit(): void {
    this.getUserDetails(this.userId || "");
    this.getCampaignParticipations(this.userId || "");
  }

  async getUserDetails(id: string) {
    this.user = await this.userService.getById(id);
  }

  async getCampaignParticipations(id: string) {
    this.campaign_participations = await this.userService.getCampaignParticipations(id);
  }

  public getFirstCover(fullCover: string) {
    return fullCover.split('|')[0];
  }

  enableUser() {

  }

  disableUser() {
    
  }

}
