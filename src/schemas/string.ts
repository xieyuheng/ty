import { Schema } from "../schema"

export class StringSchema extends Schema<string> {
  static create(): StringSchema {
    return new StringSchema()
  }

  check(data: any): string {
    if (typeof data !== "string") {
      throw new Error("expecting string")
    }

    return data
  }
}
