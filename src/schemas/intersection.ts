import { Schema } from "../schema"
import * as Errors from "../errors"

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
    right: Schema<U>
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
        if (rightError instanceof Errors.InvalidData) {
          throw new Errors.InvalidData(data, {
            msg: [
              `I expect the data to be the interseciton of left and right type.`,
              `but it is not of right type:`,
              `  right msg: ${rightError.msg}`,
              `  right path: ${rightError.path}`,
            ].join("\n"),
          })
        } else {
          throw rightError
        }
      }
    } catch (leftError) {
      if (leftError instanceof Errors.InvalidData) {
        throw new Errors.InvalidData(data, {
          msg: [
            `I expect the data to be the interseciton of left and right type.`,
            `but it is not of left type:`,
            `  left msg: ${leftError.msg}`,
            `  left path: ${leftError.path}`,
          ].join("\n"),
        })
      } else {
        throw leftError
      }
    }
  }
}