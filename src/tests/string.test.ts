import ty from "../main"

{
  const schema = ty.number()
  const data: number = schema.validate(123)
  schema.assertInvalidate("123")
}
