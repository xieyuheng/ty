import ty from ".."

{
  const schema = ty.pickMany(
    ty.object({
      x: ty.number(),
      y: ty.number(),
      z: ty.number(),
    }),
    ["x", "y"] as const,
  )
  type Data = { x: number; y: number; z: number }
  const data0: Pick<Data, "x" | "y"> = schema.validate({ x: 0, y: 0 })
  const data1: Pick<Data, "x" | "y"> = schema.validate({ z: 0, x: 0, y: 0 })
  schema.assertInvalid({ x: 0 })
  schema.assertInvalid({ y: 0 })
  schema.assertInvalid({ z: 0 })
  schema.assertInvalid({ x: 0, z: 0 })
  schema.assertInvalid({ y: 0, z: 0 })

  const prunedData: Pick<Data, "x" | "y"> = schema.prune({ z: 0, x: 0, y: 0 })
  ty.undefined().validate((prunedData as any)["z"])
}

{
  const schema = ty.pickMany(
    ty.object({
      x: ty.number(),
      y: ty.number(),
      z: ty.number(),
    }),
    ["x", "y"] as const,
  )

  schema.testGeneration()
}
