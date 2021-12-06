import * as Errors from "../errors"
import { Schema } from "../schema"

type Constructor = abstract new (...args: Array<any>) => any

export class InstanceofSchema<T extends Constructor> extends Schema<
  InstanceType<T>
> {
  givenClass: T
  private gen?: () => InstanceType<T>

  constructor(givenClass: T, opts: { generate?: () => InstanceType<T> } = {}) {
    super()
    this.givenClass = givenClass
    this.gen = opts.generate
  }

  static create<T extends Constructor>(
    givenClass: T,
    opts: { generate?: () => InstanceType<T> } = {}
  ): InstanceofSchema<T> {
    return new InstanceofSchema(givenClass, opts)
  }

  json(): { $instanceof: string } {
    return { $instanceof: this.givenClass.name }
  }

  validate(data: any): InstanceType<T> {
    if (!(data instanceof this.givenClass)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the data to be instance of given class: ${this.givenClass.name}`,
      })
    }

    return data
  }

  prune(data: any): InstanceType<T> {
    return this.validate(data)
  }

  generate(): InstanceType<T> {
    if (this.gen) {
      return this.gen()
    } else {
      throw new Error(
        "The generate function of InstanceofSchema is not provided."
      )
    }
  }
}
