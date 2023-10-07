import ty from ".."

{
  const schema = ty.int()
  const data: number = schema.validate(123)
  schema.assertInvalid("123")
  schema.assertInvalid(123.123)
}

{
  const schema = ty.int({ constraint: (x) => x < 100 })
  const data0: number = schema.validate(99)
  const data2: number = schema.validate(-1)
  schema.assertInvalid(99.99)
  schema.assertInvalid(123)
}

{
  const schema = ty.int({ constraint: (x) => 0 <= x && x < 100 })
  const data0: number = schema.validate(0)
  const data1: number = schema.validate(1)
  schema.assertInvalid(99.99)
  schema.assertInvalid(-1)
  schema.assertInvalid(123)
}
