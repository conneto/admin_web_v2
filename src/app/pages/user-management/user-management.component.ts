import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { UserApiService } from 'src/app/services/user/user-api.service';
import 'lodash';
import { LoadingServiceService } from 'src/app/services/loading/loading-service.service';
declare var _: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  oldUsers: User[] = [];
  isEmpty: boolean = false;
  isNoMore: boolean = false;
  constructor(private loading: LoadingServiceService, private userApi: UserApiService) { }


  ngOnInit(): void {
    this.getListMangerAndVolunteer();
    this.checkShowMore();

  }
  ngAfterViewInit(): void {

  }
  async getListUsers() {
    this.users = await this.userApi.getListUsers();

  }
  async getListMangerAndVolunteer() {
    this.users = await this.userApi.getListUsers();
    this.users = this.users.filter(x => {
      return x.role_id === 'organization_manager' || x.role_id === 'volunteer';
    })
    this.oldUsers = this.users;
    this.users = this.users.slice(0, 8);
  }

  showMore() {
    this.loading.isLoading.next(true);
    setTimeout(() => {
      let newLength = this.users.length + 8;
      console.log(newLength);
      if (newLength > this.oldUsers.length) {
        newLength = this.oldUsers.length;
      }
      this.users = this.oldUsers.slice(0, newLength);
      this.loading.isLoading.next(false);
    }, 300)
  }
  checkShowMore() {
    if (this.users.length > 8) {
      if (this.users.length == this.oldUsers.length) {
        this.isNoMore = false;
      }
    }
  }
  searchName(e: any) {
    const fullName = '';
    setTimeout(() => {
      if (e.target.value.length < 0 || e.target.value == '') {
        this.getListMangerAndVolunteer();
        this.isEmpty = false;
      } else {
        this.users = this.oldUsers;
        this.isEmpty = false;
        this.users = _.filter(this.users, (x: any) => {
          console.log(e.target.value);
          this.users = x.first_name.concat(`${x.last_name}`).toLowerCase().includes(`${e.target.value}`);
          return this.users = x.first_name.concat(`${x.last_name}`).toLowerCase().includes(`${e.target.value}`);
        })
        if (this.users == [] || this.users.length == 0) {
          this.isEmpty = true;
        }
      }
    }, 1600)

  }
}
