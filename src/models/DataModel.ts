import fs from 'fs';

const fileMap = new Map<number, DataModel>();
export abstract class DataModel {
    public readonly id: number;

    constructor(id?: number) {
        if (id === undefined) {
            // creates a unique ID. May hypothetically run into a bug if the math doesn't work out but IDK yet
            while (!fileMap.has(this.id = Math.floor(Math.random() * (fileMap.size + 1) * 2)));
        } else {
            this.id = id;
        }
        fileMap.set(this.id, this);
    }

    static getById(id: number): DataModel | null {
        if (fileMap.has(id))
            return fileMap.get(id)!;
        return null;
    }
    public abstract stringify(): string;
}