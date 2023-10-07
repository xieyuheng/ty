import { Schema } from "./schema"

export type Obtain<S extends Schema<any>> = ReturnType<S["validate"]>
