import { Schema } from "../schema"
import * as Errors from "../errors"
import * as Schemas from "../schemas"

export class UnionIntoSchema<I, T> extends Schema<I | T> {
  itemSchema: Schema<I>
  targetSchema: Schema<T>

  constructor(itemSchema: Schema<I>, targetSchema: Schema<T>) {
    super()
    this.itemSchema = itemSchema
    this.targetSchema = targetSchema
  }

  static create<I, T>(
    itemSchema: Schema<I>,
    targetSchema: Schema<T>
  ): UnionIntoSchema<I, T> {
    return new UnionIntoSchema(itemSchema, targetSchema)
  }

  validate(data: any): I | T {
    try {
      this.itemSchema.validate(data)
    } catch (itemError) {
      if (!(itemError instanceof Errors.InvalidData)) throw itemError

      try {
        this.targetSchema.validate(data)
      } catch (targetError) {
        if (!(targetError instanceof Errors.InvalidData)) throw targetError

        for (const key in data) {
          try {
            this.validate(data[key])
          } catch (propError) {
            if (propError instanceof Errors.InvalidData) {
              propError.keys.push(key)
            }
            throw propError
          }
        }
      }
    }

    return data
  }
}
