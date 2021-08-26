- any -- `generate` -- use `ty.union`

- omit -- `generate`
- omit-many -- `generate`

- pick -- `generate`
- pick-many -- `generate`

- guard -- `generate` -- user provide optional `generate` function

- `Schema.generate` -- should be abstract

# later

- minimalist homepage for docs

- string -- `generate` -- use context free grammar to generate sentences

# refactor

- [refactor] the structure of `InvalidData` not well designed and is overloaded

  - `omit` and `pick` need well structured error
