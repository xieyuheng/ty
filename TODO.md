- intersection -- `generate`

- union -- `generate`

- any -- `generate` -- use `ty.union`

- lazy -- `generate` -- to test this, we need `union.generate()`

- omit -- `generate`
- omit-many -- `generate`

- pick -- `generate`
- pick-many -- `generate`

- guard -- `generate` -- user provide optional `generate` function

- `Schema.generate` -- should be abstract

# later

- string -- `generate` -- use context free grammar to generate sentences

# refactor

- [refactor] the structure of `InvalidData` not well designed and is overloaded

  - `omit` and `pick` need well structured error
