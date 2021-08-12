import * as Schemas from "./schemas"

export default {
  // NOTE primitive
  string: Schemas.StringSchema.create,
  // email: Schemas.EmailSchema.create, // NOTE subtype of `string`
  // uri: Schemas.UriSchema.create, // NOTE subtype of `string`
  number: Schemas.NumberSchema.create,
  int: Schemas.IntSchema.create, // NOTE subtype of `number`
  null: Schemas.NullSchema.create,
  undefined: Schemas.UndefinedSchema.create,
  boolean: Schemas.BooleanSchema.create,
  any: Schemas.AnySchema.create,
  // NOTE compound
  object: Schemas.ObjectSchema.create,
  array: Schemas.ArraySchema.create,
  dict: Schemas.DictSchema.create,
}
