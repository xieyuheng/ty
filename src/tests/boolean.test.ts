import ty from ".."

{
  const schema = ty.boolean()
  const t: boolean = schema.validate(true)
  const f: boolean = schema.validate(false)
  schema.assertInvalidate("true")
  schema.assertInvalidate("false")
  schema.assertInvalidate("")
  schema.assertInvalidate(0)
  schema.assertInvalidate(1)
  schema.assertInvalidate(null)
  schema.assertInvalidate([])
  schema.assertInvalidate({})
  schema.assertInvalidate(undefined)
}
