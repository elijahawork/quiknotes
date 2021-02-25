import { writeFileSync } from 'fs';
import { join } from 'path';
import SchemaField from '../decorators/SchemaField';
import Writable from '../interfaces/Writable';
import IAssignmentSchema from '../schema/IAssignmentSchema';
import { DataModel } from './DataModel';

export class AssignmentModel
  extends DataModel<IAssignmentSchema>
  implements IAssignmentSchema, Writable {
  protected schema: IAssignmentSchema;
  private static EXT = '.asmnt';
  
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
    const obj = JSON.parse(str) as { name: string; date: string };
    const date = new Date(obj.date);
    return new AssignmentModel(obj.name, date);
  }
  public updateFile() {
    writeFileSync(
      join(__dirname, '..', 'protected') + AssignmentModel.EXT,
      this.stringify()
    );
  }
}
