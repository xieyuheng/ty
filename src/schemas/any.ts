import { Schema } from "../schema"

export class AnySchema extends Schema<any> {
  constructor() {
    super()
  }

  static create(): AnySchema {
    return new AnySchema()
  }

  validate(data: any): any {
    return data
  }

  prune(data: any): any {
    return data
  }
}
