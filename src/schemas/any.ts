import { Schema } from "../schema"
import * as Errors from "../errors"

export class AnySchema extends Schema<any> {
  static create(): AnySchema {
    return new AnySchema()
  }

  validate(data: any): any {
    return data
  }
}
