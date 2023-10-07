import ty from ".."

{
  const schema = ty.string()
  const data: string = schema.validate("123")
  schema.expectInvalid(123)
}

{
  const schema = ty.string({
    constraint: (x) => x.length === 3,
    description: "Lenght must be 3.",
  })

  const data: string = schema.validate("123")
  schema.expectInvalid("12")
  schema.expectInvalid("1234")
}

{
  const schema = ty.string({
    constraint: (x) => 1 <= x.length && x.length <= 3,
  })
  const data1: string = schema.validate("1")
  const data2: string = schema.validate("12")
  const data3: string = schema.validate("123")
  schema.expectInvalid("")
  schema.expectInvalid("1234")
}

{
  const schema = ty.string({
    constraint: (x) =>
      [
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
      ].includes(x),
  })

  const data1: string = schema.validate("red")
  const data2: string = schema.validate("rose")
  const data3: string = schema.validate("sky")
  schema.expectInvalid("")
  schema.expectInvalid("no a color")
}
