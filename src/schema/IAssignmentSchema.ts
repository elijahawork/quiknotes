import { ISiteSchema } from './ISiteSchema';

export interface IAssignmentSchema {
  name: string;
  site: ISiteSchema;
  date: Date;
}
