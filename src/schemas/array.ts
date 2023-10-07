import * as Errors from "../errors"
import { Schema } from "../schema"

export interface ArrayConstraints {
  max?: number
  min?: number
  length?: number
}

export class ArraySchema<T> extends Schema<Array<T>> {
  item: Schema<T>
  constraints: ArrayConstraints

  constructor(item: Schema<T>, constraints: ArrayConstraints) {
    super()
    this.item = item
    this.constraints = constraints
  }

  static create<T>(
    item: Schema<T>,
    constraints: ArrayConstraints = {},
  ): ArraySchema<T> {
    return new ArraySchema(item, constraints)
  }

  validate(data: any): Array<T> {
    if (!(data instanceof Array)) {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be array.",
      })
    }

    const { max, min, length } = this.constraints

    if (max !== undefined && !(data.length <= max)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the max array length to be ${max}, length: ${data.length}`,
      })
    }

    if (min !== undefined && !(data.length >= min)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the min array length to be ${min}, length: ${data.length}`,
      })
    }

    if (length !== undefined && !(data.length === length)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the array length to be ${length}, length: ${data.length}`,
      })
    }

    for (const [i, item] of data.entries()) {
      try {
        this.item.validate(item)
      } catch (error) {
        if (Errors.InvalidData.guard(error)) {
          error.keys.push(i)
        }
        throw error
      }
    }

    return data
  }

  prune(data: any): Array<T> {
    return this.validate(data).map((e) => this.item.prune(e))
  }
}
