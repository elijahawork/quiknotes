import Writable from '../interfaces/Writable';
import ISchema from '../schema/ISchema';

const dataModelRegistry = new Map<number, DataModel<any>>();
export abstract class DataModel<Schema> implements Writable {
  protected abstract schema: Schema;

  constructor(id: number) {
    dataModelRegistry.set(id, this);
  }
  abstract updateFile(): void;

  public static generateUniqueID(id?: number) {
    if (id === undefined)
      // creates a unique ID. May hypothetically run into a bug if the math doesn't work out but IDK yet
      while (
        dataModelRegistry.has((id = Math.floor(Math.random() * (dataModelRegistry.size + 1) * 2)))
      );

    return id;
  }

  static getById(id: number): DataModel<ISchema> | null {
    if (dataModelRegistry.has(id)) return dataModelRegistry.get(id)!;
    return null;
  }
  public stringify(): string {
    return JSON.stringify(this.schema);
  }
}
