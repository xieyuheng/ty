import ty from "../main"

{
  const schema = ty.object({ first_name: ty.string(), last_name: ty.string() })
  type Data = { first_name: string; last_name: string }
  const data: Data = schema.validate({ first_name: "Yuheng", last_name: "Xie" })
  schema.assertInvalidate({ first_name: "Yuheng", last_name: { x: "Xie" } })
  schema.assertInvalidate({ first_name: "Yuheng", last_name: 666 })
}
