import ty from ".."

{
  const schema = ty.tuple(ty.number(), ty.string(), ty.number())
  const data0: [number, string, number] = schema.validate([1, "a", 1])
  const data1: [number, string, number] = schema.validate([2, "b", 100])
  schema.assertInvalidate([""])
  schema.assertInvalidate(["1", "2", "3"])
  schema.assertInvalidate([1, "2", "3"])
  schema.assertInvalidate(["1", 2, "3"])
  schema.assertInvalidate(["1", "2", 3])
  schema.assertInvalidate([1, , 3])
  schema.assertInvalidate([""])
  schema.assertInvalidate({})
  schema.assertInvalidate(null)
  schema.assertInvalidate(0)
  schema.assertInvalidate(false)
}
