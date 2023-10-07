import { ty } from ".."

const schema = ty.date()
const data0: string = schema.validate("1893-12-26")
const data1: string = schema.validate("1893-12")
const data3: string = schema.validate("2018-11-13 20:20:39")
const data4: string = schema.validate("2018-11-13T20:20:39+00:00")
const data5: string = schema.validate("2022-08-03T19:29:52.325Z")
const data6: string = schema.validate(new Date().toISOString())
schema.expectInvalid("20:20:39+00:00")
schema.expectInvalid("20:20:39")
schema.expectInvalid("20:20")
