import { AssignmentModel } from "./AssignmentModel";
import { DataModel } from "./DataModel";

export class ClassModel extends DataModel {
    name: string;
    assignments: number[] = [];
    content: string;
    
    constructor(name: string, assignments: number[], content: string) {
        super();
        this.name = name;
        this.assignments = assignments;
        this.content = content;
    }

    public stringify() {
        return JSON.stringify(this);
    }
    public static from(str: string): ClassModel {
        const jsonOBJ = JSON.parse(str) as ClassModel;
        return new ClassModel(jsonOBJ.name, jsonOBJ.assignments, jsonOBJ.content);
    }
}