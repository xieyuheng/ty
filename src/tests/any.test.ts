import ty from "../index.js"

const schema = ty.any()
schema.validate(true)
schema.validate(false)
schema.validate("true")
schema.validate("false")
schema.validate("")
schema.validate(0)
schema.validate(1)
schema.validate(null)
schema.validate([])
schema.validate({})
schema.validate(undefined)
