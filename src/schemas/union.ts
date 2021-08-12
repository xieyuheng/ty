import { Schema } from "../schema"
import * as Errors from "../errors"

export class UnionSchema<T, U> extends Schema<T | U> {
  left: Schema<T>
  right: Schema<U>

  constructor(left: Schema<T>, right: Schema<U>) {
    super()
    this.left = left
    this.right = right
  }

  static create<T, U>(left: Schema<T>, right: Schema<U>): UnionSchema<T, U> {
    return new UnionSchema(left, right)
  }

  validate(data: any): T | U {
    try {
      this.left.validate(data)
      return data
    } catch (leftError) {
      if (leftError instanceof Errors.InvalidData) {
        try {
          this.right.validate(data)
          return data
        } catch (rightError) {
          throw new Errors.InvalidData(data, {
            msg: [
              `I expect the data to be the union of left and right type.`,
              `  left: ${JSON.stringify(this.left)}`,
              `  right: ${JSON.stringify(this.right)}`,
            ].join("\n"),
          })
        }
      } else {
        throw leftError
      }
    }
  }
}
