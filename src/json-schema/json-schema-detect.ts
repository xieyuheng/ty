const schemasafe = require("@exodus/schemasafe")

// NOTE
// - detect returns `null | Errors`
// - validation returns `boolean`

type Errors = Array<any>

export function jsonSchemaDetect(jsonSchema: any, data: any): null | Errors {
  const validator = schemasafe.validator(jsonSchema, { includeErrors: true })
  if (validator(data)) {
    return null
  } else {
    return validator.errors
  }
}
