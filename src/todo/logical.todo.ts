import { Schema } from "../schema/index.js"

export class Var {
  id: number
  name: string

  static counter = 0

  constructor(name: string) {
    this.id = Var.counter++
    this.name = name
  }
}

function isVar(data: any): data is Var {
  return data instanceof Var
}

export function v(strs: TemplateStringsArray): Var {
  const [name] = strs
  return new Var(name)
}

export type Logical<T> = Var | { [P in keyof T]: Logical<T[P]> }

function logicalSchema<T>(schema: Schema<T>): Schema<Logical<T>> {
  throw new Error("HOW TO?")
  // ty.predicate(isVar)
  // schema
  // ty.lazy(() => logicalSchema(schema))
}

// {
//   const schema = logicalSchema(ty.number())
//   const data0: Logical<number> = schema.validate(1)
//   const data1: Logical<number> = schema.validate(v`1`)
//   schema.expectInvalid(true)
//   schema.expectInvalid("1")
// }

// {
//   const schema = logicalSchema(
//     ty.object({
//       x: ty.number(),
//       y: ty.number(),
//     })
//   )
//   type T = { x: number; y: number }
//   const data0: Logical<T> = schema.validate({ x: 1, y: 2 })
//   const data1: Logical<T> = schema.validate({ x: v`1`, y: 2 })
//   const data2: Logical<T> = schema.validate({ x: v`1`, y: v`2` })
//   const data3: Logical<T> = schema.validate(v`object`)
//   // schema.expectInvalid(["x"])
//   // schema.expectInvalid({ x: "x" })
// }

// {
//   const schema = logicalSchema(ty.array(ty.number()))
//   type T = Array<number>
//   const data0: Logical<T> = schema.validate([1, 2, 3])
//   const data1: Logical<T> = schema.validate([v`1`, 2, 3])
//   const data2: Logical<T> = schema.validate([v`1`, v`2`, 3])
//   const data3: Logical<T> = schema.validate(v`array`)
//   // schema.expectInvalid(["x"])
//   // schema.expectInvalid({ x: "x" })
// }
