import { Schema } from "./schema/index.js"

export type Obtain<S extends Schema<any>> = ReturnType<S["validate"]>
