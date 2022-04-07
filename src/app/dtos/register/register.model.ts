import { Injectable } from "@angular/core";
import { Adapter } from "src/app/interface/adapter";

export class Register {
    constructor(
        public username: string,
        public password: string,
        public first_name: string,
        public last_name: string,
        public number_phone: string,
        public role:string,
    ) { }
}

@Injectable({
    providedIn: 'root',
})

export class RegisterAdapter implements Adapter<Register>{
    adapt(item: any): Register {
        return new Register(item.username, item.password, item.first_name, item.last_name, item.number_phone,item.role);
    }

}