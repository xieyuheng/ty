- format -- `generate` -- use third party library

- any -- `generate` -- how to?
- guard -- `generate` -- user provide optional `generate` function

- union -- `generate`

- lazy -- `generate` -- to test this, we need `union.generate()`

- intersection -- `generate`

- omit -- `generate`
- omit-many -- `generate`

- pick -- `generate`
- pick-many -- `generate`

- `Schema.generate` -- should be abstract

# later

- int -- `generate` -- cover all the edge cases

- string -- `generate` -- use context free grammar to generate sentences

# refactor

- [refactor] the structure of `InvalidData` not well designed and is overloaded

  - `omit` and `pick` need well structured error
