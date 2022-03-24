import { Injectable } from "@angular/core";
import { Adapter } from "src/app/interface/adapter";

export class Project {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public logo?: string,
        public cover?: string,
        public startDate?: number,
        public endDate?: number,
        // public totalDonated?: number,
        // public target?: number,
        // public jobRequirement?: string,
        // public jobDescription?: string,
        // public jobBenefit?: string,
        // public creationCode?: number,
        // public creationMessage?: string,
        public is_active?: boolean,
    ) { }
}


@Injectable({
    providedIn: 'root',
})

export class ProjectAdapter implements Adapter<Project>{
    adapt(item: any): Project {
        return new Project(item.id,
            item.name,
            item.description,
            item.logo,
            item.cover,
            item.start_date,
            item.end_date,
            // item.total_donated_money,
            // item.target_amount,
            // item.job_requirement,
            // item.job_description,
            // item.job_benefit,
            // item.creationCode,
            // item.createtionMessage,
            item.is_active)
    }

}