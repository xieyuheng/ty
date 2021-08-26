import { Schema } from "../schema"
import * as Errors from "../errors"
import ty from ".."

type GenerationConfig = {
  depth: number
}

export class AnySchema extends Schema<any> {
  generation: GenerationConfig

  constructor(opts: { generation: GenerationConfig }) {
    super()
    this.generation = opts.generation
  }

  static create(
    opts: { generation: GenerationConfig } = { generation: { depth: 3 } }
  ): AnySchema {
    return new AnySchema(opts)
  }

  json(): "any" {
    return "any"
  }

  validate(data: any): any {
    return data
  }

  prune(data: any): any {
    return data
  }

  generate(): any {
    const primitive = ty.union(
      ty.union(ty.null(), ty.undefined()),
      ty.union(ty.boolean(), ty.union(ty.number(), ty.string()))
    )
    const compound = ty.union(
      ty.dict(
        ty.lazy(() =>
          ty.any({ generation: { depth: this.generation.depth - 1 } })
        )
      ),
      ty.array(
        ty.lazy(() =>
          ty.any({ generation: { depth: this.generation.depth - 1 } })
        )
      )
    )

    if (this.generation.depth === 0) {
      return primitive.generate()
    } else {
      return ty.union(primitive, compound).generate()
    }
  }
}
