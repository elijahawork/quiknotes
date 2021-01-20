import { readFileSync, writeFile, writeFileSync } from "fs";
import { join } from "path";
import { __PROJ_NAME } from "..";
import { DataModel } from "./DataModel";

export class ClassModel extends DataModel {
    name: string;
    assignments: number[] = [];
    content: string;

    constructor(name: string, assignments: number[], content: string, id?: number) {
        super(id);
        this.name = name;
        this.assignments = assignments;
        this.content = content;
    }

    public stringify() {
        const { name, assignments } = this;
        return JSON.stringify({ name, assignments });
    }
    public write() {
        this.writeMetadata();
        this.writeContent();
    }
    public writeMetadata() {
        const path = join(__PROJ_NAME, this.id.toString());
        writeFile(path, this.stringify(), (err) => {
            if (err)
                throw err;
        });
    }
    public writeContent() {
        const path = join(__PROJ_NAME, this.id.toString() + 'c');
        writeFile(path, this.content, (err) => {
            if (err)
                throw err;
        });
    }
    public static fromPath(id: number) {
        const path = join(__PROJ_NAME, id.toString());
        const pathc = join(__PROJ_NAME, id.toString() + 'c');
        
        const md = readFileSync(path, 'utf-8')
        const content = readFileSync(pathc, 'utf-8');

        const mdJson = JSON.parse(md);

        const { name, assignments } = mdJson;

        return new ClassModel(name, assignments, content, id);
    }
}