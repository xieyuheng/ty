import { appendReport } from "../errors"
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
        throw appendReport(rightError, {
          message: `[IntersectionSchema] I fail in the right of the intersecion.`,
        })
      }
    } catch (leftError) {
      throw appendReport(leftError, {
        message: `[IntersectionSchema] I fail in the left of the intersecion.`,
      })
    }
  }

  prune(data: any): T & U {
    return this.left.prune(this.right.prune(this.validate(data))) as T & U
  }
}
