import ty from ".."

{
  const schema = ty.omit(
    ty.object({
      id: ty.string(),
      name: ty.string(),
    }),
    "id"
  )
  type Data = { id: string; name: string }
  const data0: Omit<Data, "id"> = schema.validate({ name: "xieyuheng" })
  const data1: Omit<Data, "id"> = schema.validate({ id: "abc", name: "xyh" })
  schema.assertInvalid({})
  schema.assertInvalid({ id: "abc" })
}
