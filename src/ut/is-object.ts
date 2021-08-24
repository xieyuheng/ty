export function isObject(x: any): x is { [key: string]: any } {
  return typeof x === "object" && x !== null && !(x instanceof Array)
}
