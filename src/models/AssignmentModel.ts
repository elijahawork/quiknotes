import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { __PROJ_NAME } from '..';
import SchemaField from '../decorators/SchemaField';
import Writable from '../interfaces/Writable';
import IAssignmentSchema from '../schema/IAssignmentSchema';
import { DataModel } from './DataModel';

export class AssignmentModel
  extends DataModel<IAssignmentSchema>
  implements IAssignmentSchema, Writable {
  protected schema: IAssignmentSchema;
  public static readonly EXT = '.asmnt';

  @SchemaField
  id!: number;

  @SchemaField
  assignmentName!: string;

  @SchemaField
  dueDate!: Date;

  constructor(
    assignmentName: string,
    dueDate: Date,
    id: number = DataModel.generateUniqueID()
  ) {
    super(id);
    this.schema = {
      id,
      assignmentName,
      dueDate,
    };
  }

  public static from(str: string): AssignmentModel {
    const obj = JSON.parse(str) as IAssignmentSchema;
    const date = new Date(obj.dueDate);
    return new AssignmentModel(obj.assignmentName, date, obj.id);
  }
  public static fromPath(id: number): AssignmentModel {
    const path = join(__PROJ_NAME, id + AssignmentModel.EXT);
    const meta = readFileSync(path, 'utf8');
    return AssignmentModel.from(meta);
  }
  public updateFile() {
    writeFileSync(
      __PROJ_NAME + this.id + AssignmentModel.EXT,
      this.stringify()
    );
  }
}
