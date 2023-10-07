import { ValidationReport, isValidationReport } from "../errors"
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

  validate(data: any): T | U {
    try {
      this.left.validate(data)
      return data
    } catch (leftError) {
      if (isValidationReport(leftError)) {
        try {
          this.right.validate(data)
          return data
        } catch (rightError) {
          if (isValidationReport(rightError)) {
            throw new ValidationReport(data, {
              message: [
                `I expect the data to be the union of left and right type.`,
                ``,
                `  left message: ${leftError.message}`,
                `  right message: ${rightError.message}`,
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
