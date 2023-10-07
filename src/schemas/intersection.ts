import * as Errors from "../errors"
import { Schema } from "../schema"

export class IntersectionSchema<T, U> extends Schema<T & U> {
  left: Schema<T>
  right: Schema<U>

  constructor(left: Schema<T>, right: Schema<U>) {
    super()
    this.left = left
    this.right = right
  }

  static create<T, U>(
    left: Schema<T>,
    right: Schema<U>,
  ): IntersectionSchema<T, U> {
    return new IntersectionSchema(left, right)
  }

  validate(data: any): T & U {
    try {
      this.left.validate(data)
      try {
        this.right.validate(data)
        return data
      } catch (rightError) {
        if (Errors.InvalidData.guard(rightError)) {
          throw new Errors.InvalidData(data, {
            msg: [
              `I expect the data to be the interseciton of left and right type.`,
              `but it is not of right type:`,
              ``,
              `  right msg: ${rightError.msg}`,
            ].join("\n"),
          })
        } else {
          throw rightError
        }
      }
    } catch (leftError) {
      if (Errors.InvalidData.guard(leftError)) {
        throw new Errors.InvalidData(data, {
          msg: [
            `I expect the data to be the interseciton of left and right type.`,
            `but it is not of left type:`,
            ``,
            `  left msg: ${leftError.msg}`,
          ].join("\n"),
        })
      } else {
        throw leftError
      }
    }
  }

  prune(data: any): T & U {
    return this.left.prune(this.right.prune(this.validate(data))) as T & U
  }
}
