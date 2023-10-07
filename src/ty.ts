import { Schema } from "./schema"
import * as Schemas from "./schemas"

const primitive = {
  string: Schemas.StringSchema.create,
  // uri: (constraints: Schemas.StringConstraints = {}) =>
  //   Schemas.FormatSchema.create("uri", constraints),
  // date: (constraints: Schemas.StringConstraints = {}) =>
  //   Schemas.FormatSchema.create("date", constraints),
  number: Schemas.NumberSchema.create,
  int: Schemas.IntSchema.create, // <: number
  null: Schemas.NullSchema.create,
  undefined: Schemas.UndefinedSchema.create,
  boolean: Schemas.BooleanSchema.create,
  any: Schemas.AnySchema.create,
  predicate: Schemas.PredicateSchema.create,
  instanceof: Schemas.InstanceofSchema.create,
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

const recursion = {
  lazy: Schemas.LazySchema.create,
}

const utilities = {
  optional: <T>(schema: Schema<T>) => sets.union(primitive.undefined(), schema),
  maybe: <T>(schema: Schema<T>) => sets.union(primitive.null(), schema),
}

export const ty = {
  ...primitive,
  ...collection,
  ...sets,
  ...recursion,
  ...utilities,
}
