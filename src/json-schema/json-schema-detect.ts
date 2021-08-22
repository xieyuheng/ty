import Ajv, { ErrorObject } from "ajv"

// NOTE
// - detect returns `null | Errors`
// - validation returns `boolean`

const ajv = new Ajv({ allErrors: true })
require("ajv-formats")(ajv)
require("ajv-formats-draft2019")(ajv)

export function jsonSchemaDetect(
  jsonSchema: Record<string, any>,
  data: any
): null | undefined | Array<ErrorObject> {
  const validator = ajv.compile(jsonSchema)
  if (validator(data)) {
    return null
  } else {
    return validator.errors
  }
}
