import { Injectable } from "@angular/core";
import { Adapter } from "src/app/interface/adapter";


export class Campaign {
    constructor(public id?: string,
        public name?: string,
        public description?: string,
        public thubmnail?: string,
        public type?: string,
        public startDate?: number,
        public endDate?: number,
        public totalDonated?: number,
        public target?: number,
        public jobRequirement?: string,
        public jobDescription?: string,
        public jobBenefit?: string,
        public creationCode?: number,
        public creationMessage?: string,
        public is_active?: boolean,
    ) {

    }
}

@Injectable({
    providedIn: 'root',
})

export class CampaignAdapter implements Adapter<Campaign>{
    adapt(item: any): Campaign {
        return new Campaign(
            item.id,
            item.name,
            item.description,
            item.thubmnail,
            item.type,
            item.start_date,
            item.end_date,
            item.total_donated_money,
            item.target_amount,
            item.job_requirement, 
            item.job_description,
            item.job_benefit,
            item.creationCode,
            item.createtionMessage,
            item.is_active,

        )
    }

}
