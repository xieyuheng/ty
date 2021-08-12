import ty from "../main"

{
  const schema = ty.string()
  const data: string = schema.validate("123")
  schema.assertInvalidate(123)
}
