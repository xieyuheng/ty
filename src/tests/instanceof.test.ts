import { ty } from "../index.js"

export class Var {
  id: number
  name: string

  static counter = 0

  constructor(name: string) {
    this.id = Var.counter++
    this.name = name
  }
}

export function v(strs: TemplateStringsArray): Var {
  const [name] = strs
  return new Var(name)
}

{
  const schema = ty.instanceof(Var)
  const data0: Var = schema.validate(v`0`)
  schema.expectInvalid(0)
  schema.expectInvalid({ id: 0, name: "x" })
}
