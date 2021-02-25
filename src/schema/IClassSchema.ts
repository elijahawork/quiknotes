import ISchema from "./ISchema";

interface IClassSchema extends ISchema {
  name: string;
  assignments: number[];
  content: string;
}
export default IClassSchema;