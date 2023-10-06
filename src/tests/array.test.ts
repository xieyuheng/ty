import ty from ".."

{
  const schema = ty.array(ty.number())
  const data0: Array<number> = schema.validate([])
  const data1: Array<number> = schema.validate([1])
  const data2: Array<number> = schema.validate([1, 2])
  const data3: Array<number> = schema.validate([1, 2, 3])
  schema.assertInvalid([""])
  schema.assertInvalid(["1", "2", "3"])
  schema.assertInvalid([1, "2", "3"])
  schema.assertInvalid(["1", 2, "3"])
  schema.assertInvalid(["1", "2", 3])
  schema.assertInvalid([1, , 3])
  schema.assertInvalid([""])
  schema.assertInvalid({})
  schema.assertInvalid(null)
  schema.assertInvalid(0)
  schema.assertInvalid(false)
}

{
  const schema = ty.array(ty.number(), { max: 3 })
  const data0: Array<number> = schema.validate([])
  const data1: Array<number> = schema.validate([1])
  const data2: Array<number> = schema.validate([1, 2])
  const data3: Array<number> = schema.validate([1, 2, 3])
  schema.assertInvalid([1, 2, 3, 4])
}
