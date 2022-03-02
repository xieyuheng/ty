import ty from ".."

{
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
  schema.assertInvalid({ id: 2 })
  schema.assertInvalid({ name: "xie" })
  schema.assertInvalid({})
}
