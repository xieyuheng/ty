import ty from ".."

{
  const schema = ty.semver()
  const data0: string = schema.validate("1.2.3")
  const data1: string = schema.validate("1.2.3-alpha")
  const data2: string = schema.validate("1.2.3--beta")
  schema.assertInvalid("a.b.c")
  schema.assertInvalid("1.2")
  schema.assertInvalid("1")
}

// generate

{
  const schema = ty.semver()
  schema.testGeneration()
}
