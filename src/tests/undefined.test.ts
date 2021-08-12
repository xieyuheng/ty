import ty from ".."

{
  const schema = ty.undefined()
  const data: undefined = schema.validate(undefined)
  schema.assertInvalidate("undefined")
  schema.assertInvalidate("")
  schema.assertInvalidate([])
  schema.assertInvalidate({})
  schema.assertInvalidate(null)
  schema.assertInvalidate(0)
  schema.assertInvalidate(false)
}
