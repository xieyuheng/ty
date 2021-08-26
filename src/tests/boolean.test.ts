import ty from ".."

{
  const schema = ty.boolean()
  const t: boolean = schema.validate(true)
  const f: boolean = schema.validate(false)
  schema.assertInvalid("true")
  schema.assertInvalid("false")
  schema.assertInvalid("")
  schema.assertInvalid(0)
  schema.assertInvalid(1)
  schema.assertInvalid(null)
  schema.assertInvalid([])
  schema.assertInvalid({})
  schema.assertInvalid(undefined)
}

// generate

{
  const schema = ty.boolean()
  schema.validate(schema.generate())
  schema.validate(schema.generate())
  schema.validate(schema.generate())
}
