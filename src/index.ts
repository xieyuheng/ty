import * as Schemas from "./schemas"

export default {
  // NOTE primitive
  string: Schemas.StringSchema.create,
  // email: Schemas.EmailSchema.create, // <: string
  // uri: Schemas.UriSchema.create, // <: string
  number: Schemas.NumberSchema.create,
  int: Schemas.IntSchema.create, // <: number
  null: Schemas.NullSchema.create,
  undefined: Schemas.UndefinedSchema.create,
  boolean: Schemas.BooleanSchema.create,
  any: Schemas.AnySchema.create,

  // NOTE compound
  object: Schemas.ObjectSchema.create,
  array: Schemas.ArraySchema.create,
  dict: Schemas.DictSchema.create,

  // NOTE set theory
  // const: Schemas.ConstSchema.create,
  // enum: Schemas.EnumSchema.create,
  // union: Schemas.UnionSchema.create,
  // intersection: Schemas.IntersectionSchema.create,
}
