import ty from ".."

{
  const schema = ty.omitMany(
    ty.object({
      x: ty.number(),
      y: ty.number(),
      z: ty.number(),
    }),
    ["x", "y"] as const
  )
  type Data = { x: number; y: number; z: number }
  const data0: Omit<Data, "x" | "y"> = schema.validate({ z: 0 })
  const data1: Omit<Data, "x" | "y"> = schema.validate({ x: 0, z: 0 })
  // TODO
  // schema.assertInvalid({ x: 0 })
  // schema.assertInvalid({ x: 0, y: 0 })
}
