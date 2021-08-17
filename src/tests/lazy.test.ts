import ty from ".."
import { Schema } from ".."

type Nat = "zero" | { prev: Nat }

const zero: Nat = "zero"

function succ(n: Nat): Nat {
  return { prev: n }
}

function natSchema(): Schema<Nat> {
  const zeroSchema = ty.same("zero" as const)
  const succSchema = ty.object({ prev: ty.lazy(natSchema) })
  return ty.union(zeroSchema, succSchema)
}

{
  const schema = natSchema()
  const data0: Nat = schema.validate("zero")
  const data1: Nat = schema.validate(succ(zero))
  const data2: Nat = schema.validate(succ(succ(zero)))
  schema.assertInvalidate({})
  schema.assertInvalidate("")
  schema.assertInvalidate("z")
  schema.assertInvalidate({ prev: "z" })
  schema.assertInvalidate({ prev: { prev: "z" } })
}

// generic `List<T>`

type List<T> = null | { head: T; tail: List<T> }

function cons<T>(head: T, tail: List<T>): List<T> {
  return { head, tail }
}

function listSchema<T>(itemSchema: Schema<T>): Schema<List<T>> {
  const nullSchema = ty.null()
  const consSchema = ty.object({
    head: itemSchema,
    tail: ty.lazy(() => listSchema(itemSchema)),
  })
  return ty.union(nullSchema, consSchema)
}

{
  const schema = listSchema(ty.string())
  const data0: List<string> = schema.validate(null)
  const data1: List<string> = schema.validate(cons("a", null))
  const data2: List<string> = schema.validate(cons("a", cons("b", null)))
  const data3: List<string> = schema.validate(
    cons("a", cons("b", cons("c", null)))
  )
  schema.assertInvalidate(cons(1, null))
  schema.assertInvalidate(cons(1, cons(2, null)))
  schema.assertInvalidate(cons(1, cons(2, cons(3, null))))
}

{
  const schema = listSchema(ty.number())
  const data0: List<number> = schema.validate(null)
  const data1: List<number> = schema.validate(cons(1, null))
  const data2: List<number> = schema.validate(cons(1, cons(2, null)))
  const data3: List<number> = schema.validate(cons(1, cons(2, cons(3, null))))
  schema.assertInvalidate(cons("a", null))
  schema.assertInvalidate(cons("a", cons("b", null)))
  schema.assertInvalidate(cons("a", cons("b", cons("c", null))))
}
