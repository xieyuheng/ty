import ty from ".."

{
  const schema = ty.object({
    id: ty.number(),
    name: ty.optional(ty.string()),
  })
  const data0: { id: number; name?: string } = schema.validate({
    id: 1,
    name: "xie",
  })
  const data1: { id: number; name?: string } = schema.validate({ id: 2 })
  schema.assertInvalid({ name: "xie" })
  schema.assertInvalid({})
}
