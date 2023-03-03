import ty from ".."

{
  const schema = ty.tuple(ty.number(), ty.string(), ty.number())
  const data0: [number, string, number] = schema.validate([1, "a", 1])
  const data1: [number, string, number] = schema.validate([2, "b", 100])
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

// generate

{
  const schema = ty.tuple(ty.number(), ty.number(), ty.number())
  schema.testGeneration()
}

{
  const schema = ty.tuple(
    ty.tuple(ty.int(), ty.int(), ty.int()),
    ty.tuple(ty.int(), ty.int(), ty.int()),
    ty.tuple(ty.int(), ty.int(), ty.int()),
    ty.tuple(ty.int(), ty.int(), ty.int()),
    ty.tuple(ty.int(), ty.int(), ty.int()),
    ty.tuple(ty.int(), ty.int(), ty.int()),
    ty.tuple(ty.int(), ty.int(), ty.int()),
    ty.tuple(ty.int(), ty.int(), ty.int()),
    ty.tuple(ty.int(), ty.int(), ty.int()),
  )

  schema.testGeneration()
}
