import { jsonSchemaDetect } from "../json-schema"

export function jsonSchemaFormatValidation(
  format: string,
  str: string,
): boolean {
  const errors = jsonSchemaDetect({ type: "string", format }, str)
  if (errors) return false
  else return true
}
