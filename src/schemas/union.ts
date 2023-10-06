import ty from ".."
import * as Errors from "../errors"
import { Schema } from "../schema"
import { isObject } from "../utils/isObject"

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

  json(): { $union: [any, any] } {
    return { $union: [this.left.json(), this.right.json()] }
  }

  validate(data: any): T | U {
    try {
      this.left.validate(data)
      return data
    } catch (leftError) {
      if (Errors.InvalidData.guard(leftError)) {
        try {
          this.right.validate(data)
          return data
        } catch (rightError) {
          if (Errors.InvalidData.guard(rightError)) {
            throw new Errors.InvalidData(data, {
              msg: [
                `I expect the data to be the union of left and right type.`,
                `  left msg: ${leftError.msg}`,
                `  left path: ${leftError.path}`,
                `  right msg: ${rightError.msg}`,
                `  right path: ${rightError.path}`,
              ].join("\n"),
            })
          } else {
            throw rightError
          }
        }
      } else {
        throw leftError
      }
    }
  }

  prune(data: any): T | U {
    const typedData = this.validate(data)

    if (isObject(typedData)) {
      return {
        ...this.left.prune(typedData),
        ...this.right.prune(typedData),
      }
    } else {
      return typedData
    }
  }
}
