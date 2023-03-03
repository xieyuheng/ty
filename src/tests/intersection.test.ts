import ty from ".."

{
  const schema = ty.intersection(
    ty.object({
      x: ty.string(),
      y: ty.string(),
    }),
    ty.intersection(
      ty.object({
        x: ty.string(),
        z: ty.string(),
      }),
      ty.object({
        x: ty.string(),
        y: ty.string(),
      }),
    ),
  )
  type Data = { x: string; y: string; z: string }
  const data: Data = schema.validate({ x: "x", y: "y", z: "z" })
  schema.assertInvalid({ y: "y", z: "z" })
  schema.assertInvalid({ x: "x", z: "z" })
  schema.assertInvalid({ x: "x", y: "y" })
  schema.assertInvalid({ x: "x" })
  schema.assertInvalid({ y: "y" })
  schema.assertInvalid({ z: "z" })
  schema.assertInvalid({})
}

// generate

{
  const schema = ty.intersection(
    ty.object({
      x: ty.string(),
      y: ty.string(),
    }),
    ty.intersection(
      ty.object({
        x: ty.string(),
        z: ty.string(),
      }),
      ty.object({
        x: ty.string(),
        y: ty.string(),
      }),
    ),
  )

  schema.testGeneration()
}
