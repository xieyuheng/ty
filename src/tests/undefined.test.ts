import { ty } from ".."

const schema = ty.undefined()
const data: undefined = schema.validate(undefined)
schema.expectInvalid("undefined")
schema.expectInvalid("")
schema.expectInvalid([])
schema.expectInvalid({})
schema.expectInvalid(null)
schema.expectInvalid(0)
schema.expectInvalid(false)
