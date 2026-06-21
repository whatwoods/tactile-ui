# Contributing

## Local Workflow

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run pack:check
```

Use `npm run build:lib` when validating only the package output, and
`npm run build:demo` when validating the demo site.

## Component Changes

- Prefer existing components and patterns before adding a new public component.
- Export public prop types from the component file and `src/index.ts`.
- Preserve controlled React conventions: `value/onChange`, `checked/onChange`,
  and overlay open/close props.
- Keep accessibility behavior close to WAI-ARIA patterns for custom controls.
- Add focused tests for keyboard behavior, ARIA state, and controlled updates
  when a component has custom interaction logic.

## Design Tokens

`src/styles/tokens.css` is the only place for raw design values. Component CSS
must use `var(--s-...)` tokens. `npm run lint:tokens` blocks new raw colors,
gradients, and shadows outside the token file.

The token lint baseline is currently empty. If a legacy exception is ever added,
it must be temporary, explicit, and removed in the same follow-up track that
introduces the replacement token.

## Releases

For user-facing package changes:

```bash
npm run changeset
```

Before publishing:

```bash
npm run lint
npm run test
npm run build
npm run pack:check
```

Version changelogs with:

```bash
npm run version
```

Publishing is intentionally explicit:

```bash
npm run release
```
