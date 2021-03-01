import { readFileSync, writeFile } from 'fs';
import { join } from 'path';
import { __PROJ_NAME } from '..';
import SchemaField from '../decorators/SchemaField';
import IClassSchema from '../schema/IClassSchema';
import { AssignmentModel } from './AssignmentModel';
import { DataModel } from './DataModel';

export class ClassModel extends DataModel<IClassSchema> {
  public static readonly EXT = '.cls';

  public updateFile(): void {
    console.log(`Updating file ${this.id}, "${this.name}"`);
    const path = join(__PROJ_NAME, this.id + ClassModel.EXT);
    writeFile(path, this.stringify(), (err) => {
      if (err) console.error(err);
    });
  }

  schema: IClassSchema;

  @SchemaField
  id!: number;

  @SchemaField
  name!: string;

  @SchemaField
  assignments!: number[];

  @SchemaField
  content!: string;

  constructor(
    name: string,
    assignments: number[],
    content: string,
    id: number = DataModel.generateUniqueID()
  ) {
    super(id);
    this.schema = {
      id,
      name,
      assignments,
      content,
    };
    this.updateFile();
  }

  public stringify() {
    const name = this.name;
    const assignments = this.assignments;
    const content = this.content;
    const id = this.id;
    return JSON.stringify({ name, assignments, content, id });
  }
  public static fromPath(id: number) {
    const path = join(__PROJ_NAME, id + ClassModel.EXT);
    const meta = readFileSync(path, 'utf8');
    return ClassModel.from(meta);
  }

  private static from(meta: string) {
    const { assignments, content, name, id } = JSON.parse(meta) as IClassSchema;
    return new ClassModel(name, assignments, content, id);
  }

  public addAssignment(newAssignment: AssignmentModel) {
    this.assignments = [...this.assignments, newAssignment.id];
    this.updateFile();
  }
}
