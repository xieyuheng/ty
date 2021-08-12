import * as Schemas from "./schemas"

export default {
  string: Schemas.StringSchema.create,
  object: Schemas.ObjectSchema.create,
  number: Schemas.NumberSchema.create,
  null: Schemas.NullSchema.create,
  undefined: Schemas.UndefinedSchema.create,
  boolean: Schemas.BooleanSchema.create,
  array: Schemas.ArraySchema.create,
}
