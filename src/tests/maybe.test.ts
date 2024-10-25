import { test } from "node:test"
import ty from "../index.js"

test("maybe", () => {
  const schema = ty.object({
    id: ty.number(),
    name: ty.maybe(ty.string()),
  })
  const data0: { id: number; name: string | null } = schema.validate({
    id: 1,
    name: "xie",
  })
  const data1: { id: number; name: string | null } = schema.validate({
    id: 2,
    name: null,
  })
  schema.expectInvalid({ id: 2 })
  schema.expectInvalid({ name: "xie" })
  schema.expectInvalid({})
})
