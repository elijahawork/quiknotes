import ISchema from "./ISchema";

interface IAssignmentSchema extends ISchema {
  name: string;
  dueDate: Date;
}

export default IAssignmentSchema;