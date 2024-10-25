import { test } from "node:test"
import ty from "../index.js"

test("intersection", () => {
  const schema = ty.intersection(
    ty.object({
      x: ty.string(),
      y: ty.string(),
    }),
    ty.intersection(
      ty.object({
        x: ty.string(),
        z: ty.string(),
      }),
      ty.object({
        x: ty.string(),
        y: ty.string(),
      }),
    ),
  )
  type Data = { x: string; y: string; z: string }
  const data: Data = schema.validate({ x: "x", y: "y", z: "z" })
  schema.expectInvalid({ y: "y", z: "z" })
  schema.expectInvalid({ x: "x", z: "z" })
  schema.expectInvalid({ x: "x", y: "y" })
  schema.expectInvalid({ x: "x" })
  schema.expectInvalid({ y: "y" })
  schema.expectInvalid({ z: "z" })
  schema.expectInvalid({})
})
