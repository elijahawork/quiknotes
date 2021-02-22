import { DataModel } from "./DataModel";

export class AssignmentModel extends DataModel {
    name: string;
    date: Date;

    constructor(name: string, duedate: Date, id?: number) {
        super(id);
        this.name = name;
        this.date = duedate;
    }

    public static from(str: string): AssignmentModel {
        const obj = JSON.parse(str) as { name: string; date: string; };
        const date = new Date(obj.date);
        return new AssignmentModel(obj.name, date);
    }
    public stringify() {
        return JSON.stringify(this);
    }
}