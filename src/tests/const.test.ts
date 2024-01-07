import { ty } from "../index.js"

const schema = ty.const({ x: 1, y: "a" })
const data: { x: number; y: string } = schema.validate({ x: 1, y: "a" })
schema.expectInvalid({})
schema.expectInvalid({ x: "1", y: "a" })
schema.expectInvalid({ x: 2, y: "a" })
schema.expectInvalid({ x: 1, y: "b" })
