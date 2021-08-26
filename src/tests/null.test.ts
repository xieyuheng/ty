import ty from ".."

{
  const schema = ty.null()
  const data: null = schema.validate(null)
  schema.assertInvalid("null")
  schema.assertInvalid("")
  schema.assertInvalid(0)
  schema.assertInvalid(false)
  schema.assertInvalid([])
  schema.assertInvalid({})
  schema.assertInvalid(undefined)
}

// generate

{
  const schema = ty.null()
  schema.validate(schema.generate())
  schema.validate(schema.generate())
  schema.validate(schema.generate())
}
