import ty from ".."

{
  const schema = ty.undefined()
  const data: undefined = schema.validate(undefined)
  schema.assertInvalid("undefined")
  schema.assertInvalid("")
  schema.assertInvalid([])
  schema.assertInvalid({})
  schema.assertInvalid(null)
  schema.assertInvalid(0)
  schema.assertInvalid(false)
}

// generate

{
  const schema = ty.undefined()
  schema.testGeneration()
}
