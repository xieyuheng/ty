import ty from ".."
import { Schema } from "../schema"

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
    opts: { generation: GenerationConfig } = { generation: { depth: 3 } },
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
}
