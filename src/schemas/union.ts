import { appendReport } from "../errors/index.js"
import { Schema } from "../schema/index.js"
import { isObject } from "../utils/isObject.js"

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
      try {
        this.right.validate(data)
        return data
      } catch (rightError) {
        throw appendReport(leftError, {
          message: `[UnionSchema] I fail on both left and right of the union.`,
          data,
        })
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
