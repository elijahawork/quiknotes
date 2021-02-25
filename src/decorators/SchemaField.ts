import ISchema from "../schema/ISchema";

function SchemaField<Schema extends ISchema, Class extends Schema & { updateFile: () => any }>(details: Class, fieldName: keyof Schema) {
  Object.defineProperty(details.constructor.prototype, fieldName, {
    get() {
      return this.model[fieldName];
    },
    set(v) {
      this.model[fieldName] = v;
      this.updateFile();
    },
  });
}

export default SchemaField;