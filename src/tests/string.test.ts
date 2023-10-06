import ty from ".."

{
  const schema = ty.string()
  const data: string = schema.validate("123")
  schema.assertInvalid(123)
}

{
  const schema = ty.string({ length: 3 })
  const data: string = schema.validate("123")
  schema.assertInvalid("12")
  schema.assertInvalid("1234")
}

{
  const schema = ty.string({ min: 1, max: 3 })
  const data1: string = schema.validate("1")
  const data2: string = schema.validate("12")
  const data3: string = schema.validate("123")
  schema.assertInvalid("")
  schema.assertInvalid("1234")
}

{
  const schema = ty.string({
    within: [
      "gray",
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
    ],
  })

  const data1: string = schema.validate("red")
  const data2: string = schema.validate("rose")
  const data3: string = schema.validate("sky")
  schema.assertInvalid("")
  schema.assertInvalid("no a color")
}
