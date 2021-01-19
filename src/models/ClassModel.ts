import { AssignmentModel } from "./AssignmentModel";
import { DataModel } from "./DataModel";

export class ClassModel extends DataModel {
    name: string;
    assignments: AssignmentModel[] = [];
    content: string;
    
    constructor(name: string, assignments: AssignmentModel[], content: string) {
        super();
        this.name = name;
        this.assignments = assignments;
        this.content = content;
    }
}