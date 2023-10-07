# Ty

Validate untyped data and return well typed result.

This package has NO dependencies.

## Install

```bash
npm i @xieyuheng/ty
```

## Examples

### Validation untyped data

```typescript
import ty, { Obtain } from "@xieyuheng/ty"

const userSchema = ty.object({
  id: ty.int({ min: 0 }),
  first_name: ty.string(),
  last_name: ty.string(),
})

type User = Obtain<typeof userSchema>

// NOTE We can extract a `User` type from the type of `userSchema`,
//   which will be the same as the following type definition:

// type User = {
//   id: number
//   first_name: string
//   last_name: string
// }

{
  const data: any = {
    id: 1,
    first_name: "Yuheng",
    last_name: "Xie",
  }

  const user: User = userSchema.validate(data)
  const userOmitId: Omit<User, "id"> = ty.omit(userSchema, "id").validate(data)
}
```

### Recursive and generic schema

```typescript
type List<T> = null | { head: T; tail: List<T> }

function cons<T>(head: T, tail: List<T>): List<T> {
  return { head, tail }
}

function listSchema<T>(itemSchema: Schema<T>): Schema<List<T>> {
  const nullSchema = ty.null()
  const consSchema = ty.object({
    head: itemSchema,
    tail: ty.lazy(() => listSchema(itemSchema)),
  })
  return ty.union(nullSchema, consSchema)
}

{
  const schema = listSchema(ty.string())
  const data0: List<string> = schema.validate(null)
  const data1: List<string> = schema.validate(cons("a", null))
  const data2: List<string> = schema.validate(cons("a", cons("b", null)))
  const data3: List<string> = schema.validate(
    cons("a", cons("b", cons("c", null))),
  )
  schema.assertInvalid(cons(1, null))
  schema.assertInvalid(cons(1, cons(2, null)))
  schema.assertInvalid(cons(1, cons(2, cons(3, null))))
}

{
  const schema = listSchema(ty.number())
  const data0: List<number> = schema.validate(null)
  const data1: List<number> = schema.validate(cons(1, null))
  const data2: List<number> = schema.validate(cons(1, cons(2, null)))
  const data3: List<number> = schema.validate(cons(1, cons(2, cons(3, null))))
  schema.assertInvalid(cons("a", null))
  schema.assertInvalid(cons("a", cons("b", null)))
  schema.assertInvalid(cons("a", cons("b", cons("c", null))))
}
```

## API Docs

**Primitive:**

- [ty.string()](src/tests/string.test.ts)
- [ty.number()](src/tests/number.test.ts)
- [ty.int()](src/tests/int.test.ts)
- [ty.boolean()](src/tests/boolean.test.ts)
- [ty.null()](src/tests/null.test.ts)
- [ty.undefined()](src/tests/undefined.test.ts)
- [ty.any()](src/tests/any.test.ts)

**Collection:**

- [ty.object({ ...schemas })](src/tests/object.test.ts)
- [ty.array(itemSchema)](src/tests/array.test.ts)
- [ty.tuple(...itemSchema)](src/tests/tuple.test.ts)
- [ty.dict(itemSchema)](src/tests/dict.test.ts)

**Set-Theoretic:**

- [ty.const(data as const)](src/tests/const.test.ts)
- [ty.union(leftSchema, rigthSchema)](src/tests/union.test.ts)
- [ty.intersection(leftSchema, rigthSchema)](src/tests/intersection.test.ts)

**Structural:**

- [ty.omit(schema, key)](src/tests/omit.test.ts)
- [ty.omitMany(schema, keys)](src/tests/omit-many.test.ts)
- [ty.pick(schema, key)](src/tests/pick.test.ts)
- [ty.pickMany(schema, keys)](src/tests/pick-many.test.ts)
- [ty.optional(schema)](src/tests/optional.test.ts)

**Recursion:**

- [ty.lazy(() => schema)](src/tests/lazy.test.ts)

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
