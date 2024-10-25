import ty from "../index.js"

const schema = ty.dict(ty.number())
const data0: Record<string, number> = schema.validate({})
const data1: Record<string, number> = schema.validate({ a: 1 })
const data2: Record<string, number> = schema.validate({ a: 1, b: 2 })
const data3: Record<string, number> = schema.validate({ a: 1, b: 2, c: 3 })
// NOTE keys are always string, `{ 1: 1 }` will be `{ '1': 1 }`
const data4: Record<string, number> = schema.validate({ 1: 1, 2: 2, 3: 2 })
schema.expectInvalid([""])
schema.expectInvalid(["1", "2", "3"])
schema.expectInvalid([1, "2", "3"])
schema.expectInvalid(["1", 2, "3"])
schema.expectInvalid(["1", "2", 3])
schema.expectInvalid([1, , 3])
schema.expectInvalid([""])
schema.expectInvalid(null)
schema.expectInvalid(0)
schema.expectInvalid(false)
