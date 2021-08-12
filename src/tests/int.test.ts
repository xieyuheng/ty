import ty from ".."

{
  const schema = ty.int()
  const data: number = schema.validate(123)
  schema.assertInvalidate("123")
  schema.assertInvalidate(123.123)
}

{
  const schema = ty.int({ lt: 100 })
  const data0: number = schema.validate(99)
  const data2: number = schema.validate(-1)
  schema.assertInvalidate(99.99)
  schema.assertInvalidate(123)
  schema.assertInvalidate(100)
}

{
  const schema = ty.int({ gte: 0, lt: 100 })
  const data0: number = schema.validate(0)
  const data1: number = schema.validate(1)
  schema.assertInvalidate(99.99)
  schema.assertInvalidate(-1)
  schema.assertInvalidate(100)
  schema.assertInvalidate(123)
}
