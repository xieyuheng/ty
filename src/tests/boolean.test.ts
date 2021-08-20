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
