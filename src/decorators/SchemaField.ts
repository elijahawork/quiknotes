import { DataModel } from '../models/DataModel';

function SchemaField<Schema>(
  details: DataModel<Schema>,
  fieldName: keyof Schema
) {
  Object.defineProperty(details.constructor.prototype, fieldName, {
    get() {
      return this.schema[fieldName];
    },
    set(v) {
      this.schema[fieldName] = v;
      this.updateFile();
    },
  });
}

export default SchemaField;
