export type Json = JsonAtom | JsonArray | JsonObject

export type JsonAtom = string | number | boolean | null | undefined

export type JsonArray = Array<Json>

export type JsonObject = { [x: string]: Json }

export function isJsonAtom(json: Json): json is JsonAtom {
  if (typeof json === "string") return true
  if (typeof json === "number") return true
  if (typeof json === "boolean") return true
  if (json === null) return true
  if (json === undefined) return true
  return false
}

export function isJsonObject(json: Json): json is JsonObject {
  return typeof json === "object" && json !== null && !isJsonArray(json)
}

export function isJsonArray(json: Json): json is JsonArray {
  return json instanceof Array
}
