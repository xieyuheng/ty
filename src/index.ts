export * from "./schema"
export * as Schemas from "./schemas"
export * as Errors from "./errors"

import * as Schemas from "./schemas"
import { Schema } from "./schema"

const primitive = {
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
  guard: Schemas.GuardSchema.create,
}

const collection = {
  object: Schemas.ObjectSchema.create,
  array: Schemas.ArraySchema.create,
  tuple: Schemas.TupleSchema.create,
  dict: Schemas.DictSchema.create,
}

const sets = {
  const: Schemas.ConstSchema.create,
  union: Schemas.UnionSchema.create,
  intersection: Schemas.IntersectionSchema.create,
}

const structural = {
  omit: Schemas.OmitSchema.create,
  omitMany: Schemas.OmitManySchema.create,
}

const recursion = {
  lazy: Schemas.LazySchema.create,
}

const utilities = {
  optional: <T>(schema: Schema<T>) => sets.union(primitive.undefined(), schema),
}

export default {
  ...primitive,
  ...collection,
  ...sets,
  ...structural,
  ...recursion,
  ...utilities,
}
