import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { __PROJ_PATH } from '../index';
import { IAssignmentModel } from '../interfaces/IAssignmentModel';
import { ISite } from '../interfaces/ISite';
import { SerializedClassMetaModel } from "../types/SerializedClassMetaModel";
import { AssignmentModel } from './AssignmentModel';
import { ClassMetaModel } from "../types/ClassMetaModel";

export class ClassModel implements Iterable<AssignmentModel> {
    private readonly assignments: AssignmentModel[] = [];
    private readonly className: string;
    private classContent: string;
    private sites: ISite[] = [];

    addSite(site: ISite) {
        // make sure there are no duplicates (SLOW)
        this.sites = Array.from(new Set([...this.sites, site]));
    }
    getSiteList() {
        return this.sites;
    }

    static deserializeByName(name: string) {
        const path = join(__PROJ_PATH, name);
        const metaString = readFileSync(path + '.meta', 'utf-8');
        const contentString = readFileSync(path + '.md', 'utf-8');
        const meta = ClassModel.deserializeMeta(metaString);
        return new ClassModel(meta, contentString);
    }
    static deserializeMeta(meta: string): ClassMetaModel {
        const { className, assignments, sites } = JSON.parse(meta) as SerializedClassMetaModel;

        const parsedAssignments: AssignmentModel[] = assignments.map(assignment => AssignmentModel.deserialize(JSON.stringify(assignment)));

        return { className, assignments: parsedAssignments, sites };
    }

    constructor(className: string, classContent?: string);
    constructor(meta: ClassMetaModel, classContent?: string);
    constructor(metaOrName: string | ClassMetaModel, classContent = '') {
        if (typeof metaOrName === 'string') {
            this.className = metaOrName;
        } else {
            const { className, assignments, sites } = metaOrName;
            this.className = className;
            this.assignments = assignments;
            this.sites = sites;
        }

        this.classContent = classContent;

        this.update();
    }

    [Symbol.iterator](): Iterator<AssignmentModel, any, undefined> {
        const { assignments } = this;
        let i = 0;
        return ({
            next() {
                return ({
                    value: assignments[i++],
                    done: i < assignments.length
                });
            }
        });
    }

    getClassesOn(month: number, day: number, year: number = new Date().getFullYear()) {
        return this.assignments.filter(assignment => assignment.date.getMonth() === month && assignment.date.getDay() === day && assignment.date.getFullYear() === year);
    }

    addAssignment(assignment: IAssignmentModel) {
        this.assignments.push(assignment);
        this.addSite(assignment.site);
        this.updateMeta();
    }
    getAssignmentByName(name: string): AssignmentModel | -1 {
        return this.assignments.find(({ name: assignmentName }) => assignmentName === name) ?? -1;
    }
    removeAssignmentByName(assignmentName: string) {
        const indexOfAssignmentBySameName = this.assignments.findIndex(({ name }) => name === assignmentName);

        if (indexOfAssignmentBySameName > -1) {
            this.assignments.splice(indexOfAssignmentBySameName, 1);
            this.updateMeta();
        } else {
            throw new RangeError(`Could not find assignment with name "${assignmentName}"`);
        }
    }
    update() {
        this.updateMeta();
        this.updateContent();
    }
    updateMeta() {
        const path = join(__PROJ_PATH, this.className + '.meta');
        writeFileSync(path, this.serialize());
    }
    updateContent(content: string = this.classContent) {
        const path = join(__PROJ_PATH, this.className + '.md');
        this.classContent = content;
        writeFileSync(path, content);
    }
    getContent() {
        return this.classContent;
    }
    serialize() {
        const { className, assignments, sites } = this;
        return JSON.stringify({ className, assignments, sites });
    }
    getAssignments() {
        return this.assignments;
    }
}
