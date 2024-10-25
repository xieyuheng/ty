import { test } from "node:test"
import ty from "../index.js"

test("null", () => {
  const schema = ty.null()
  const data: null = schema.validate(null)
  schema.expectInvalid("null")
  schema.expectInvalid("")
  schema.expectInvalid(0)
  schema.expectInvalid(false)
  schema.expectInvalid([])
  schema.expectInvalid({})
  schema.expectInvalid(undefined)
})
