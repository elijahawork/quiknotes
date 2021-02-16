import { ISiteSchema } from './ISiteSchema';

export interface ISerializedAssignmentSchema {
  name: string;
  site: ISiteSchema;
  date: string;
}
