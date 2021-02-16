import { AssignmentModel } from '../models/AssignmentModel';
import { ISiteSchema } from './ISiteSchema';

export interface IClassMetaSchema {
  className: string;
  assignments: AssignmentModel[];
  sites: ISiteSchema[];
}
