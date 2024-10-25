import { test } from "node:test"
import ty from "../index.js"

test("tuple", () => {
  const schema = ty.tuple(ty.number(), ty.string(), ty.number())
  const data0: [number, string, number] = schema.validate([1, "a", 1])
  const data1: [number, string, number] = schema.validate([2, "b", 100])
  schema.expectInvalid([""])
  schema.expectInvalid(["1", "2", "3"])
  schema.expectInvalid([1, "2", "3"])
  schema.expectInvalid(["1", 2, "3"])
  schema.expectInvalid(["1", "2", 3])
  schema.expectInvalid([1, , 3])
  schema.expectInvalid([""])
  schema.expectInvalid({})
  schema.expectInvalid(null)
  schema.expectInvalid(0)
  schema.expectInvalid(false)
})
