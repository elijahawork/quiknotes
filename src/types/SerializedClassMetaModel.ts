import { ISite } from '../interfaces/ISite';
import { SerializedAssignmentModel } from './SerializedAssignmentModel';

export type SerializedClassMetaModel = {
  className: string;
  assignments: SerializedAssignmentModel[];
  sites: ISite[];
};
