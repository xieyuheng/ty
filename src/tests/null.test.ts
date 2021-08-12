import ty from ".."

{
  const schema = ty.null()
  const data: null = schema.validate(null)
  schema.assertInvalidate("null")
  schema.assertInvalidate(0)
  schema.assertInvalidate(false)
}
