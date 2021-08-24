import ty from ".."

{
  const schema = ty.pick(
    ty.object({
      id: ty.string(),
      name: ty.string(),
    }),
    "id"
  )
  type Data = { id: string; name: string }
  const data0: Pick<Data, "id"> = schema.validate({ id: "abc" })
  const data1: Pick<Data, "id"> = schema.validate({ id: "abc", name: "xyh" })
  schema.assertInvalid({})
  schema.assertInvalid({ name: "xyh" })
}
