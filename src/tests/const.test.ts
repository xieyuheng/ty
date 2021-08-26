import ty from ".."

{
  const schema = ty.const({ x: 1, y: "a" })
  const data: { x: number; y: string } = schema.validate({ x: 1, y: "a" })
  schema.assertInvalid({})
  schema.assertInvalid({ x: "1", y: "a" })
  schema.assertInvalid({ x: 2, y: "a" })
  schema.assertInvalid({ x: 1, y: "b" })
}

// generate

{
  const schema = ty.const({ x: 1, y: "a" })
  schema.validate(schema.generate())
  schema.validate(schema.generate())
  schema.validate(schema.generate())
}
