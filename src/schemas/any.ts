import { Schema } from "../schema"
import * as Errors from "../errors"

export class AnySchema extends Schema<any> {
  static create(): AnySchema {
    return new AnySchema()
  }

  json(): "any" {
    return "any"
  }

  validate(data: any): any {
    return data
  }
}
