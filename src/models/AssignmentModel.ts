import { IAssignmentSchema } from '../schema/IAssignmentSchema';
import { ISerializedAssignmentSchema } from '../schema/ISerializedAssignmentSchema';
import { ISiteSchema } from '../schema/ISiteSchema';

export class AssignmentModel implements IAssignmentSchema {
  readonly name: string;
  readonly site: ISiteSchema;
  readonly date: Date;

  constructor(name: string, site: ISiteSchema, date: Date) {
    this.name = name;
    this.site = site;
    this.date = date;
  }
  static deserialize(assignment: string) {
    const { name, site, date } = JSON.parse(
      assignment
    ) as ISerializedAssignmentSchema;
    const parsedDate = new Date(date);
    return new AssignmentModel(
      name,
      (site as unknown) as ISiteSchema,
      parsedDate
    );
  }
}
