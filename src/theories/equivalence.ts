import { iff, imply } from "./boolean"

export type Equivalence<T> = (a: T, b: T) => boolean

export function EquivalenceLaws<T>(eq: Equivalence<T>) {
  return {
    reflexive: (x: T) => eq(x, x),
    symmetric: (a: T, b: T) => iff(eq(a, b), eq(b, a)),
    transitive: (a: T, b: T, c: T) => imply(eq(a, b) && eq(b, c), eq(a, c)),
  }
}
