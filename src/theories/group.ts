import { imply, iff } from "./boolean"
import { Equivalence } from "./equivalence"

export interface Group<G> {
  eq: Equivalence<G>
  mul(a: G, b: G): G
  id: G
  inv(a: G): G
}

export const GroupLaws = <G>({ eq, mul, id, inv }: Group<G>) => ({
  mul_associative: (a: G, b: G, c: G) =>
    eq(mul(mul(a, b), c), mul(a, mul(b, c))),
  id_respect_mul: (a: G) => eq(mul(id, a), a) && eq(mul(a, id), a),
  inv_respect_mul: (a: G) => eq(mul(inv(a), a), a) && eq(mul(a, inv(a)), a),
})
