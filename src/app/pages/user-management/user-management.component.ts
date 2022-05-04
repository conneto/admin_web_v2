import { Component, Injectable, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user-service/user.service';
import 'lodash';
import { LoadingService } from 'src/app/services/loading-service/loading.service';

declare var _: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  usersFull: User[] = [];
  oldUsers: User[] = [];
  isEmpty: boolean = false;
  isNoMore: boolean = false;
  isLoaded: boolean = false;
  isList?: boolean = false;
  isFilter?: boolean;
  saveEntity?: any;
  isSearch?:boolean;
  constructor(private loading: LoadingService, private userService: UserService) {
  }


  ngOnInit(): void {
    this.getListMangerAndVolunteer();


  }
  getFilterUser(e: any) {
    this.isFilter = true;
    if (e) {
      this.saveEntity = e;
      if (e.length > 8) {
        this.users = e.splice(0, 8);
        this.isEmpty = false;
        this.isNoMore = false;
      } else {
        this.users = e;
        this.isEmpty = false;
        this.isNoMore = true;
      }
    }
  }
  async getListUsers() {
    this.users = await this.userService.getListUsers();

  }

  handleTitle(e: any) {
    if (e == 'list') {
      this.isList = true;
    } else {
      this.isList = false;
    }
  }

  async getListMangerAndVolunteer() {
    this.usersFull = await this.userService.getListUsers();
    this.users = this.usersFull.filter(x => {
      return x.role_id === 'organization_manager' || x.role_id === 'volunteer';
    })
    this.oldUsers = this.users;
    this.isLoaded = true;
    this.users = this.users.slice(0, 8);
  }

  showMore() {
    this.loading.isLoading.next(true);
    setTimeout(() => {
      let newLength = this.users.length + 8;

      if (newLength > this.oldUsers.length) {
        newLength = this.oldUsers.length;
      }
      this.users = this.oldUsers.slice(0, newLength);
      this.checkShowMore();
      this.loading.isLoading.next(false);
    }, 300)
  }

  checkShowMore() {
    if (this.users.length > 8) {
      if (this.users.length == this.oldUsers.length) {
        this.isNoMore = true;
      }
    }
  }

  searchName(e: any) {
    this.isSearch=true;
    setTimeout(() => {


      if (e.target.value.length <= 0 || e.target.value == '') {
        if(this.saveEntity){
          this.users=this.saveEntity;
          this.isEmpty = false;
          this.isNoMore = false;
        }
    
   
      } else {
        if (this.saveEntity) {
          this.isEmpty = false;
          this.users = _.filter(this.saveEntity, (x: any) => {
            return this.users = x.last_name.concat(` ${x.first_name}`).toLowerCase().includes(`${e.target.value}`.toLowerCase().trim());
          })
          if (this.users == [] || this.users.length == 0) {
            this.isEmpty = true;
          }
        } else {
          this.isNoMore = true;
          this.users=this.oldUsers
          this.isEmpty = false;
          this.users = _.filter(this.users, (x: any) => {
            return this.users = x.last_name.concat(` ${x.first_name}`).toLowerCase().includes(`${e.target.value}`.toLowerCase().trim());
          })
          if (this.users == [] || this.users.length == 0) {
            this.isEmpty = true;
          }
        }
      }
    }, 500)

  }
}
