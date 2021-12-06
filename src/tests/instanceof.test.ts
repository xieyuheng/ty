import ty from ".."

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
  schema.assertInvalid(0)
  schema.assertInvalid({ id: 0, name: "x" })
}

{
  const schema = ty.instanceof(Var, {
    generate: () => new Var(ty.string().generate()),
  })
  schema.testGeneration()
}
