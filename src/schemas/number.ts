import { Schema } from "../schema"

export class NumberSchema extends Schema<number> {
  static create(): NumberSchema {
    return new NumberSchema()
  }

  check(data: any): number {
    if (typeof data !== "number") {
      throw new Error("expecting number")
    }

    return data
  }
}
