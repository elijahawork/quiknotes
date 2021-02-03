import { ISite } from '../interfaces/ISite';
import { AssignmentModel } from '../models/AssignmentModel';

export type ClassMetaModel = { className: string; assignments: AssignmentModel[]; sites: ISite[]; };
