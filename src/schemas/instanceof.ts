import { createReport } from "../errors/index.js"
import { Schema } from "../schema/index.js"

type Constructor = abstract new (...args: Array<any>) => any

export class InstanceofSchema<T extends Constructor> extends Schema<
  InstanceType<T>
> {
  givenClass: T

  constructor(givenClass: T) {
    super()
    this.givenClass = givenClass
  }

  static create<T extends Constructor>(givenClass: T): InstanceofSchema<T> {
    return new InstanceofSchema(givenClass)
  }

  validate(data: any): InstanceType<T> {
    if (!(data instanceof this.givenClass)) {
      throw createReport({
        message: [
          `[InstanceofSchema] I expect the data to be instance of given class.`,
          ``,
          `  given class name: ${this.givenClass.name}`,
          `  data class name: ${data.constructor.name}`,
        ].join("\n"),
        data,
      })
    }

    return data
  }

  prune(data: any): InstanceType<T> {
    return this.validate(data)
  }
}
