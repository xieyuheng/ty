import { ty } from "../index.js"

{
  const schema = ty.object({ first_name: ty.string(), last_name: ty.string() })
  type Data = { first_name: string; last_name: string }
  const data: Data = schema.validate({ first_name: "Yuheng", last_name: "Xie" })
  schema.expectInvalid({ first_name: "Yuheng", last_name: { x: "Xie" } })
  schema.expectInvalid({ first_name: "Yuheng", last_name: 666 })
}

{
  const schema = ty.object({ first_name: ty.string(), last_name: ty.string() })
  type Data = { first_name: string; last_name: string }
  const data: Data = schema.prune({
    first_name: "Yuheng",
    last_name: "Xie",
    unknown_field: 123,
  })

  ty.undefined().validate((data as any)["unknown_field"])
}
