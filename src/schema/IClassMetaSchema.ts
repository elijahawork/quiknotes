import { ISiteSchema } from './ISiteSchema';
import { AssignmentModel } from '../models/AssignmentModel';

export interface IClassMetaSchema {
  className: string;
  assignments: AssignmentModel[];
  sites: ISiteSchema[];
};
