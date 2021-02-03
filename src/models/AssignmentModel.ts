import { IAssignmentModel } from "../interfaces/IAssignmentModel";
import { ISite } from "../interfaces/ISite";
import { SerializedAssignmentModel } from "../types/SerializedAssignmentModel";

export class AssignmentModel implements IAssignmentModel {
    readonly name: string;
    readonly site: ISite;
    readonly date: Date;

    constructor(name: string, site: ISite, date: Date) {
        this.name = name;
        this.site = site;
        this.date = date;
    }
    static deserialize(assignment: string) {
        const { name, site, date } = JSON.parse(assignment) as SerializedAssignmentModel;
        const parsedDate = new Date(date);
        return new AssignmentModel(name, site as unknown as ISite, parsedDate);
    }
}
