import ISchema from "./ISchema";

interface IAssignmentSchema extends ISchema {
  assignmentName: string;
  dueDate: Date;
}

export default IAssignmentSchema;