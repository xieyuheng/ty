import { test } from "node:test"
import ty from "../index.js"

test("union", () => {
  const schema = ty.union(ty.string(), ty.union(ty.number(), ty.null()))
  type Data = string | number | null
  const data0: Data = schema.validate("abc")
  const data1: Data = schema.validate(123)
  const data2: Data = schema.validate(null)
  schema.expectInvalid(false)
  schema.expectInvalid({})
  schema.expectInvalid([])
})
