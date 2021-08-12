import ty from ".."

{
  const schema = ty.string()
  const data: string = schema.validate("123")
  schema.assertInvalidate(123)
}
