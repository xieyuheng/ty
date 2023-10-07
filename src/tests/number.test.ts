import ty from ".."

{
  const schema = ty.number()
  const data: number = schema.validate(123)
  schema.assertInvalid("123")
}

{
  const schema = ty.number({ constraint: (x) => x < 100 })
  const data0: number = schema.validate(99)
  const data1: number = schema.validate(99.99)
  const data2: number = schema.validate(-1)
  schema.assertInvalid(123)
}

{
  const schema = ty.number({ constraint: (x) => 0 <= x && x < 100 })
  const data0: number = schema.validate(0)
  const data1: number = schema.validate(1)
  const data2: number = schema.validate(99.99)
  schema.assertInvalid(-1)
  schema.assertInvalid(123)
}
