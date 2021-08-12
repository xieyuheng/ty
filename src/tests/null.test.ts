import ty from ".."

{
  const schema = ty.null()
  const data: null = schema.validate(null)
  schema.assertInvalidate("null")
  schema.assertInvalidate("")
  schema.assertInvalidate(0)
  schema.assertInvalidate(false)
  schema.assertInvalidate([])
  schema.assertInvalidate({})
  schema.assertInvalidate(undefined)
}
