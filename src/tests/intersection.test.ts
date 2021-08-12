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
      })
    )
  )
  type Data = { x: string; y: string; z: string }
  const data: Data = schema.validate({ x: "x", y: "y", z: "z" })
  schema.assertInvalidate({ y: "y", z: "z" })
  schema.assertInvalidate({ x: "x", z: "z" })
  schema.assertInvalidate({ x: "x", y: "y" })
  schema.assertInvalidate({ x: "x" })
  schema.assertInvalidate({ y: "y" })
  schema.assertInvalidate({ z: "z" })
  schema.assertInvalidate({})
}
