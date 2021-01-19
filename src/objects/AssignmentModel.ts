import { DataModel } from "./DataModel";

export class AssignmentModel extends DataModel {
    name: string;
    date: Date;

    constructor(name: string, duedate: Date) {
        super();
        this.name = name;
        this.date = duedate;
    }

    static from(str: string): AssignmentModel {
        const obj = JSON.parse(str) as { name: string, date: string };
        const date = new Date(obj.date);
        return new AssignmentModel(obj.name, date);
    }
    static stringify() {
        return JSON.stringify(this);
    }
}