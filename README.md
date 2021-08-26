# Ty

Write schema to bring TypeScript's types to runtime.

Which can be used to:
- Validate untyped data and return well typed result.
- Generate random data of a given schema, to do property-based testing.
  - It also provides a library of logic theories, to be used as target of models.

## Install

``` bash
npm i @xieyuheng/ty
```

## Examples

### Validation untyped data

``` typescript
import ty from "@xieyuheng/ty"

const userSchema = ty.object({
  id: ty.int({ min: 0 }),
  first_name: ty.string(),
  last_name: ty.string(),
})

type User = {
  id: number
  first_name: string
  last_name: string
}

{
  const data: any = {
    id: 1,
    first_name: "Yuheng",
    last_name: "Xie",
  }

  const user: User = userSchema.validate(data)
}

{
  const data: any = {
    id: 2,
    first_name: "Yuxie",
    last_name: "Heng",
  }

  const user: User = userSchema.validate(data)
}

{
  const data: any = {
    id: 3,
    first_name: "Xieheng",
    last_name: "Yu",
  }

  const user: User = userSchema.validate(data)
}

{
  const data: any = {
    first_name: "Yuheng",
    last_name: "Xie",
  }

  const userOmitId: Omit<User, "id"> = ty.omit(userSchema, "id").validate(data)
}
```

### Generate random data of a given schema

``` typescript
{
  const user: User = userSchema.generate()

  userSchema.validate(user)

  console.log(user)
  // Will print something like:
  //   { id: 0, first_name: 'ada4a39ab0', last_name: '73be' }
}
```

### Property-based testing

```
TODO
```

## API Docs

**Primitive:**
- [ty.string()](src/tests/string.test.ts)
- [ty.format(foramtName)](src/tests/format.test.ts)
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
- [ty.union(leftSchema, rigthSchema)](src/tests/union.ts)
- [ty.intersection(leftSchema, rigthSchema)](src/tests/intersection.test.ts)

**Structural:**
- [ty.omit(schema, key)](src/tests/omit.ts)
- [ty.omitMany(schema, keys)](src/tests/omit-many.ts)
- [ty.pick(schema, key)](src/tests/pick.ts)
- [ty.pickMany(schema, keys)](src/tests/pick-many.ts)
- [ty.optional(schema)](src/tests/optional.ts)

**Recursion:**
- [ty.lazy(() => schema)](src/tests/lazy.ts)

## Contributions

> Be polite, do not bring negative emotion to others.

- [TODO.md](TODO.md)
- [STYLE-GUIDE.md](STYLE-GUIDE.md)
- [CODE-OF-CONDUCT.md](CODE-OF-CONDUCT.md)
- When contributing, add yourself to [AUTHORS](AUTHORS)

## License

- [GPLv3](LICENSE)
