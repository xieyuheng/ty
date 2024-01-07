import { ty } from "../index.js"

const schema = ty.boolean()
const t: boolean = schema.validate(true)
const f: boolean = schema.validate(false)
schema.expectInvalid("true")
schema.expectInvalid("false")
schema.expectInvalid("")
schema.expectInvalid(0)
schema.expectInvalid(1)
schema.expectInvalid(null)
schema.expectInvalid([])
schema.expectInvalid({})
schema.expectInvalid(undefined)
