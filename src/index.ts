import * as Schemas from "./schemas"

export default {
  // NOTE primitive
  string: Schemas.StringSchema.create,
  number: Schemas.NumberSchema.create,
  // float: Schemas.FloatSchema.create, // NOTE subtype of number
  // int: Schemas.IntSchema.create, // NOTE subtype of number
  null: Schemas.NullSchema.create,
  undefined: Schemas.UndefinedSchema.create,
  boolean: Schemas.BooleanSchema.create,
  any: Schemas.AnySchema.create,
  // NOTE compound
  object: Schemas.ObjectSchema.create,
  array: Schemas.ArraySchema.create,
  dict: Schemas.DictSchema.create,
}
