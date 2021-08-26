import { Schema } from "../schema"
import * as Errors from "../errors"

export interface NumberConstraints {
  gt?: number
  lt?: number
  gte?: number
  lte?: number
}

function validateNumberConstraints({
  gt,
  lt,
  gte,
  lte,
}: NumberConstraints): boolean {
  // NOTE comparing `undefined` with number, will always return `false`.
  if ((gt as any) >= (lt as any)) return false
  if ((gt as any) >= (lte as any)) return false
  if ((gte as any) >= (lt as any)) return false
  if ((gte as any) > (lte as any)) return false
  else return true
}

export class NumberSchema extends Schema<number> {
  constraints: NumberConstraints

  constructor(constraints: NumberConstraints) {
    super()
    if (validateNumberConstraints(constraints)) {
      this.constraints = constraints
    } else {
      throw new Error(
        `Invalid NumberConstraints: ${JSON.stringify(constraints)}`
      )
    }
  }

  static create(constraints: NumberConstraints = {}): NumberSchema {
    return new NumberSchema(constraints)
  }

  json(): any {
    return "number"
  }

  validate(data: any): number {
    if (typeof data !== "number") {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be number.",
      })
    }

    const { gt, lt, gte, lte } = this.constraints

    if (gt !== undefined && !(data > gt)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the number to be greater than ${gt}`,
      })
    }

    if (lt !== undefined && !(data < lt)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the number to be less than ${lt}`,
      })
    }

    if (gte !== undefined && !(data >= gte)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the number to be greater than or equal to ${gte}`,
      })
    }

    if (lte !== undefined && !(data <= lte)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the number to be less than or equal to ${lte}`,
      })
    }

    return data
  }

  prune(data: any): number {
    return this.validate(data)
  }

  generate(): number {
    const { gt, lt, gte, lte } = this.constraints

    let min = gt || gte
    let max = lt || lte

    if (min !== undefined && max !== undefined) {
      return Math.random() * (max - min) + min
    } else if (min !== undefined) {
      max = min + Math.abs(1 / Math.random())
      return Math.random() * (max - min) + min
    } else if (max !== undefined) {
      min = max - Math.abs(1 / Math.random())
      return Math.random() * (max - min) + min
    } else {
      min = -Math.abs(1 / Math.random())
      max = Math.abs(1 / Math.random())
      return Math.random() * (max - min) + min
    }
  }
}
