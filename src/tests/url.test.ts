import { ty } from "../index.js"

const schema = ty.url()
const data0: string = schema.validate("https://tools.ietf.org/html/rfc3986")
const data1: string = schema.validate(encodeURI("https://网站.com"))
schema.expectInvalid("tools.ietf.org/html/rfc3986")
schema.expectInvalid("https://网站.com")
