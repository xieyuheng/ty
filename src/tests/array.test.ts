import ty from ".."

{
  const schema = ty.array(ty.number())
  const data0: Array<number> = schema.validate([])
  const data1: Array<number> = schema.validate([1])
  const data2: Array<number> = schema.validate([1, 2])
  const data3: Array<number> = schema.validate([1, 2, 3])
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
