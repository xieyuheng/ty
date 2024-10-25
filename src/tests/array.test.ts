import { test } from "node:test"
import ty from "../index.js"

test("array", () => {
  const schema = ty.array(ty.number())
  const data0: Array<number> = schema.validate([])
  const data1: Array<number> = schema.validate([1])
  const data2: Array<number> = schema.validate([1, 2])
  const data3: Array<number> = schema.validate([1, 2, 3])
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
