import { Injectable } from "@angular/core";
import { Adapter } from "src/app/interface/adapter";

export class Dashboard {
    constructor(public numOrg?: number, public numPro?: number, public numCam?: number, public numLogin?: number, public totalDonatedMoney?: number, public totalParticipatedPeople?: number) {

    }
}

@Injectable({
    providedIn: 'root',
})

export class DashboardApdater implements Adapter<Dashboard>{
    adapt(item: any): Dashboard {
        return new Dashboard(item.num_of_org, item.num_of_pro, item.num_of_cam, item.num_of_login, item.total_donated_money, item.total_participated_people)
    }

}
