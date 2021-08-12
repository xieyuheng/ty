import * as Schemas from "./schemas"

export default {
  // NOTE primitive
  string: Schemas.StringSchema.create,
  format: Schemas.FormatSchema.create, // <: string
  email: (constraints: Schemas.StringConstraints = {}) =>
    Schemas.FormatSchema.create("email", constraints),
  uri: (constraints: Schemas.StringConstraints = {}) =>
    Schemas.FormatSchema.create("uri", constraints),
  date: (constraints: Schemas.StringConstraints = {}) =>
    Schemas.FormatSchema.create("date", constraints),
  time: (constraints: Schemas.StringConstraints = {}) =>
    Schemas.FormatSchema.create("time", constraints),
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
  same: Schemas.SameSchema.create,
  union: Schemas.UnionSchema.create,
  // intersection: Schemas.IntersectionSchema.create,
}
