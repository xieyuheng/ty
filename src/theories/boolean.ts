export function imply(x: boolean, y: boolean): boolean {
  return !x || y
}

export function iff(x: boolean, y: boolean): boolean {
  return imply(x, y) && imply(y, x)
}
