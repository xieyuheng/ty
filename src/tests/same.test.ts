import ty from ".."

{
  const schema = ty.const({ x: 1, y: "a" })
  const data: { x: number; y: string } = schema.validate({ x: 1, y: "a" })
  schema.assertInvalidate({})
  schema.assertInvalidate({ x: "1", y: "a" })
  schema.assertInvalidate({ x: 2, y: "a" })
  schema.assertInvalidate({ x: 1, y: "b" })
}
