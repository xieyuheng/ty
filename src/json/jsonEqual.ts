import { Json, isJsonArray, isJsonObject } from "./Json"

export function jsonEqual(x: Json, y: Json): boolean {
  if (x === y) return true

  if (isJsonArray(x) && isJsonArray(y)) {
    if (x.length !== y.length) return false
    for (const [index, xValue] of x.entries()) {
      const yValue = y[index]
      if (!jsonEqual(xValue, yValue)) return false
    }

    return true
  }

  if (isJsonObject(x) && isJsonObject(y)) {
    for (const [key, xValue] of Object.entries(x)) {
      const yValue = y[key]
      if (!jsonEqual(xValue, yValue)) return false
    }

    return true
  }

  return false
}
