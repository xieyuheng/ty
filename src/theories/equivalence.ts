import { imply, iff } from "./boolean"

export interface Equivalence<T> {
  (a: T, b: T): boolean
}

export const EquivalenceLaws = <T>(eq: Equivalence<T>) => ({
  reflexive: (x: T) => eq(x, x),
  symmetric: (a: T, b: T) => iff(eq(a, b), eq(b, a)),
  transitive: (a: T, b: T, c: T) => imply(eq(a, b) && eq(b, c), eq(a, c)),
})
