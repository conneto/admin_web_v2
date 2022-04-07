import { Injectable } from "@angular/core";
import { Adapter } from "src/app/interface/adapter";


export class UserLoginRequest {
    constructor(public username?: string, public password?: string
    ) {

    }
}
@Injectable({
    providedIn:'root',
})

export class UserLoginRequestAdapter implements Adapter<UserLoginRequest>{
    adapt(item: any): UserLoginRequest {
        return new UserLoginRequest(item.username,item.password);
    }

}
