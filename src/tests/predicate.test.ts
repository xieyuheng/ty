import { test } from "node:test"
import ty from "../index.js"

test("predicate", () => {})

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

{
  const schema = ty.predicate(isVar, {
    description: "The data is of class Var.",
  })

  const data0: Var = schema.validate(v`0`)
  schema.expectInvalid(0)
  schema.expectInvalid({ id: 0, name: "x" })
}
