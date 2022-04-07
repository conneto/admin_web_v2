import { Injectable } from "@angular/core";
import { Adapter } from "src/app/interface/adapter";


export class Campaign {
    constructor(public id?: string,
        public name?: string,
        public description?: string,
        public cover?: string,
        public type?: string,
        public startDate?: number,
        public endDate?: number,
        public totalDonated?: number,
        public totalPaticipant?: number,
        public target?: number,
        public jobRequirement?: string,
        public jobDescription?: string,
        public jobBenefit?: string,
        public donation_documentents?: string,
        public is_active?: boolean,
        public org_name?: string,
        public org_id?: string,
        public org_logo?: string,
        public pro_id?: string,
        public pro_name?: string,
        public pro_code?: string,
        public result_note?: string,
        public result_name?: string,
        public result_code?:number,
        public createdDate?:number,
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
            item.cover,
            item.type,
            item.start_date,
            item.end_date,
            item.total_donated_money,
            item.total_participants,
            item.target_number,
            item.job_requirement,
            item.job_description,
            item.job_benefit,
            item.donation_documentents,
            item.is_active,
            item.organization_name,
            item.organization_id,
            item.organization_logo,
            item.project_id,
            item.project_name,
            item.project_code,
            item.result_note,
            item.result_message,
            item.result_code,
            item.created_at,
        )
    }

}
