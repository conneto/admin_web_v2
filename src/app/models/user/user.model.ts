import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/interface/adapter';

export class User {
  constructor(
    public id?: string,
    public username?: string,
    public email?: string,
    public gender?: string,
    public birthday?: string,
    public token?: string,
    public first_name?: string,
    public last_name?: string,
    public number_phone?: string,
    public avatar?: string,
    public donated_amount?: number,
    public donated_turn?: number,
    public participated_turn?: number,
    public donated_campaign?: number,
    public participated_campaign?: number,
    public is_active?: boolean,
    public is_block?: boolean,
    public created_at?: number,
    public updated_at?: number,
    public role_id?: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class UserAdapter implements Adapter<User> {
  adapt(item: any): User {
    return new User(
      item.id,
      item.username,
      item.email,
      item.gender,
      item.birthday,
      item.token,
      item.first_name,
      item.last_name,
      item.number_phone,
      item.avatar,
      item.donated_amount,
      item.donated_turn,
      item.participated_turn,
      item.donated_campaign,
      item.participated_campaign,
      item.is_active,
      item.is_block,
      item.created_at,
      item.updated_at,
      item.role_id
    );
  }
}
