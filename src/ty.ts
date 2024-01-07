import { Schema } from "./schema/index.js"
import * as Schemas from "./schemas/index.js"

const primitive = {
  string: Schemas.StringSchema.create,
  url: () =>
    Schemas.StringSchema.create({
      description: "String should be valid URL.",
      constraint: (url) => {
        try {
          new URL(url)
          return true
        } catch (error) {
          return false
        }
      },
    }),
  date: () =>
    Schemas.StringSchema.create({
      description: "String should be valid date.",
      constraint: (date) => !isNaN(new Date(date).getTime()),
    }),
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
