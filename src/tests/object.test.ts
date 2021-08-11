import ty from "../main"

{
  const data: { first_name: string; last_name: string } = ty
    .object({ first_name: ty.string(), last_name: ty.string() })
    .check({ first_name: "Yuheng", last_name: "Xie" })
}
