- string -- generate -- how to? -- optional sentences?

- dict -- generate -- need `string.generate()`

- format -- generate -- use third party library

- any -- generate -- how to?
- guard -- generate -- user provide optional `generate` function

- union -- generate

- lazy -- generate -- to test this, we need `union.generate()`

- intersection -- generate

- omit -- generate
- omit-many -- generate

- pick -- generate
- pick-many -- generate

- `Schema.generate` -- should be abstract

# refactor

- [refactor] the structure of `InvalidData` not well designed and is overloaded

  - `omit` and `pick` need well structured error
