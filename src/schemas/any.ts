import { Schema } from "../schema"

export class AnySchema extends Schema<any> {
  constructor() {
    super()
  }

  static create(): AnySchema {
    return new AnySchema()
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
