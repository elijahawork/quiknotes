import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";
import { __PROJ_NAME } from "..";
import { DataModel } from "./DataModel";

export class ClassContentModel extends DataModel {
    public static fromPath(id: number): ClassContentModel {
        const classContentModel = new ClassContentModel(id);
        classContentModel.content = readFileSync(join(__PROJ_NAME, `${id}c`), 'utf-8');
        return classContentModel;
    }

    constructor(id?: number) {
        super(id);
        this.content = '';
    }
    // this is used to get a speedier retrieval of content
    // and to avoid outdated contented due to asynchronous file writing
    private memoizedContent = '';
    
    set content(content: string) {
        this.memoizedContent = content;
        writeFile(this.filePath(), content);
    }
    get content() {
        return this.memoizedContent;
    }

    public filePath() {
        return `${super.filePath()}c`;
    }

    public stringify(): string {
        throw new Error("Method not implemented.");
    }
    
}