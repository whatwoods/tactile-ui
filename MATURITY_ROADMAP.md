# Tactile UI Maturity Roadmap

This roadmap tracks the work needed to turn Tactile UI from a Vite demo plus
source components into a mature React design system package.

## Done

- Package name changed to `tactile-ui`.
- Public package entry added at `src/index.ts`.
- Library build added with ESM, CSS, and declaration output in `dist/`.
- Demo build split into `dist-demo/`.
- `react` and `react-dom` declared as peer dependencies.
- `npm run pack:check` verifies npm tarball contents.
- Public component prop types exported through the package entry.
- `Button`, `Input`, `Textarea`, `Checkbox`, and `Radio` forward refs.
- `Slider` has slider ARIA semantics and keyboard interaction.
- `Select` has combobox/listbox semantics and active-descendant keyboard flow.
- Vitest and Testing Library cover every public component, with focused
  keyboard, ARIA, overlay, form, and status behavior for interactive surfaces.
- CI verifies lint, tests, visual smoke, runtime audit, build, package
  contents, and package size.
- Changesets are configured for release notes and versioning.
- Design-token hardcoding guardrail is in place with zero legacy baseline
  entries.
- Demo-only components live under `src/demo/components`; public package
  components live under `src/components`.
- Public component API, state, keyboard, and accessibility documentation exists
  in `docs/COMPONENTS.md`.
- Keyboard and ARIA interaction matrices exist in `docs/ACCESSIBILITY.md`.
- Desktop and mobile Playwright visual smoke tests guard against blank first
  paint and page-level horizontal overflow.
- Desktop and mobile Playwright screenshot baselines cover the component
  gallery state.

## Next

- Broaden edge-case coverage as individual components gain new variants.
- Add per-component visual baselines when a dedicated docs/playground renderer
  exists.

## V1.0 Exit Criteria

- No non-token raw colors, gradients, shadows, spacing, radii, typography, or
  motion values outside `tokens.css`, except dynamic runtime CSS variables.
- Every public component has documented props, states, usage, and accessibility
  behavior.
- Every complex interactive component has keyboard and ARIA tests.
- Package tarball contains only intended runtime files.
- Release workflow uses changesets and has a reproducible publish procedure.
