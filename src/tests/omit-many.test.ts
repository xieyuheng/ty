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
  const data1: Omit<Data, "x" | "y"> = schema.validate({ z: 0, x: 0 })
  const data2: Omit<Data, "x" | "y"> = schema.validate({ z: 0, x: 0, y: 0 })
  schema.assertInvalid({ x: 0 })
  schema.assertInvalid({ x: 0, y: 0 })

  const prunedData: Omit<Data, "x" | "y"> = schema.prune({ z: 0, x: 0, y: 0 })
  ty.undefined().validate((prunedData as any)["x"])
  ty.undefined().validate((prunedData as any)["y"])
}

{
  const schema = ty.omitMany(
    ty.object({
      x: ty.number(),
      y: ty.number(),
      z: ty.number(),
    }),
    ["x", "y"] as const
  )

  schema.testGeneration()
}
