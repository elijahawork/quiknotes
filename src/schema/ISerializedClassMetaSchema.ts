import { ISiteSchema } from './ISiteSchema';
import { ISerializedAssignmentSchema } from './ISerializedAssignmentSchema';

export interface ISerializedClassMetaSchema {
  className: string;
  assignments: ISerializedAssignmentSchema[];
  sites: ISiteSchema[];
};
