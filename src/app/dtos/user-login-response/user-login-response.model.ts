import { Injectable } from "@angular/core";
import { Adapter } from "src/app/interface/adapter";

export class UserLoginResponse {
    constructor(public id: string, public username: string,public email: string,public gender: string,public birthday: string, public role: string, public token: string, public first_name: string,public last_name: string, public number_phone: string, public operating_unit: string,public is_active: boolean,public is_block: boolean) {

    }
}

@Injectable({
    providedIn: 'root',
})

export class UserLoginResponseApdater implements Adapter<UserLoginResponse>{
    adapt(item: any): UserLoginResponse {
        return new UserLoginResponse(item.id, item.username, item.email, item.gender, item.birthday, item.role, item.token, item.first_name, item.last_name, item.number_phone, item.operating_unit, item.is_active, item.is_block);
    }


    
}

