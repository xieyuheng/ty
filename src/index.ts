import * as Schemas from "./schemas"

export default {
  // NOTE primitive
  string: Schemas.StringSchema.create,
  number: Schemas.NumberSchema.create,
  null: Schemas.NullSchema.create,
  undefined: Schemas.UndefinedSchema.create,
  boolean: Schemas.BooleanSchema.create,
  any: Schemas.AnySchema.create,
  // NOTE compound
  object: Schemas.ObjectSchema.create,
  array: Schemas.ArraySchema.create,
  dict: Schemas.DictSchema.create,
}
