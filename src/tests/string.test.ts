import ty from ".."

{
  const schema = ty.number()
  const data: number = schema.validate(123)
  schema.assertInvalidate("123")
}
