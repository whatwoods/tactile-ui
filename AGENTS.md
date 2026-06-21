# Tactile UI Agent Guide

This file is for AI coding agents that receive only the repository link and need
to understand how to run, use, and modify this project correctly.

Repository: https://github.com/whatwoods/tactile-ui

## 1. What This Repository Is

- Tactile UI is an AI-native React/Vite design system inspired by Smartisan OS
  design methods: order, proportion, depth, tactile feedback, and restrained
  craft.
- The npm package name is `tactile-ui`.
- Treat it as a component library plus a Vite demo site.
- Public package imports are available through `src/index.ts`, for example
  `import { Button } from 'tactile-ui'`, after running the library build.

## 2. First Steps From A Fresh Clone

If you only have the GitHub URL, start here:

```bash
git clone https://github.com/whatwoods/tactile-ui.git
cd tactile-ui
npm install
npm run dev
```

Open the Vite URL shown by the terminal, usually `http://localhost:5173`.

Useful commands:

```bash
npm run dev      # local demo and component playground
npm run lint     # ESLint plus design-token hardcoding guardrail
npm run test     # component behavior tests
npm run build    # library build plus Vite demo production build
npm run pack:check # verify npm package contents
npm run preview  # preview the production build
```

## 3. Required Reading Order

Before making design, component, or page changes:

1. Read `README.md` for project positioning and basic usage.
2. Read `DESIGN.md` for the visual principles, Smartisan calibration priority,
   golden-ratio rhythm, depth rules, and physical feedback model.
3. Read `src/styles/tokens.css` before editing any CSS.
4. Inspect the closest existing component in `src/components/` before adding a
   new component or new page markup.
5. If the task involves Smartisan source calibration, inspect
   `references/official-source/README.md` and
   `references/official-assets/README.md`.

## 4. How To Use The Components

Public package exports live in `src/index.ts`. Use the package entry when
documenting consumer usage:

```tsx
import { Button, Card, Switch } from 'tactile-ui';
import 'tactile-ui/style.css';
```

Inside unreleased source files in this repo, direct component imports are still
acceptable when they match nearby code:

Inside this repo:

```tsx
import { Button } from './components/Button/Button';
import { Card } from './components/Card/Card';
import { Switch } from './components/Switch/Switch';
```

At the application root, import global styles once:

```tsx
import './styles/global.css';
```

`global.css` already imports `tokens.css`. Do not import both unless you are
building a special partial setup and understand the cascade.

When consuming this repo from another app, keep the source structure intact or
copy the component and its dependencies together. Many components rely on
neighbor files, CSS Modules, `src/styles/`, `src/hooks/`, or `src/utils/`.
Adjust import paths to your app layout; do not change component behavior just to
make imports shorter.

Toast usage requires a provider:

```tsx
import { ToastProvider } from './components/Toast/Toast';
import { useToast } from './components/Toast/useToast';

function AppRoot() {
  return <ToastProvider>{/* app */}</ToastProvider>;
}

function SaveButton() {
  const { toast } = useToast();
  return <button onClick={() => toast('Saved')}>Save</button>;
}
```

## 5. Prefer Existing Components

Use these components before creating custom markup:

- Actions: `Button`
- Surfaces: `Card`, `Chassis`
- Forms: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`
- Navigation: `Tabs`, `SegmentedControl`, `TitleBar`, `SideNav`
- Feedback: `Alert`, `Badge`, `Progress`, `Spinner`, `Skeleton`, `Toast`
- Overlays: `Dialog`, `ActionSheet`, `Popover`, `Tooltip`, `ProgressDialog`
- Structured rows: `List`, `ListItem`, `SettingItem`
- Demo and documentation sections: `Hero`, `Header`, `Footer`,
  `ShowcaseSection`, `ComponentGallery`, `PlaygroundSection`, `TokensSection`

Only add a new component when composition of existing components cannot express
the required pattern cleanly.

## 6. Design Token Rules

`src/styles/tokens.css` is the only place where raw design values may be
defined.

Outside `tokens.css`, never hardcode:

- Colors: hex, `rgb()`, `rgba()`, `hsl()`, named colors
- Gradients
- Shadows
- Spacing scale values
- Radius scale values
- Typography scale values
- Motion durations or easing curves

Always use `var(--s-...)` tokens in CSS Modules and global CSS. If a required
token does not exist, ask the user before adding a new token to `tokens.css`.

Exception: dynamic runtime values that cannot reasonably be represented by a
class may use inline CSS variables, for example a drag progress custom property.
Static layout and visual styling must live in CSS Modules.

## 7. Styling Rules

- Use Vanilla CSS Modules named `[Component].module.css` for component styles.
- Use page-level CSS Modules for page-specific layout.
- Do not add CSS-in-JS, Tailwind, styled-components, or new styling systems.
- Use tokenized colors, shadows, spacing, radii, typography, durations, and
  easing.
- Keep layouts clean and dense enough for product UI. Avoid decorative clutter,
  excessive textures, glassmorphism, candy gradients, and one-off visual tricks.
- Depth should come from layered tokenized shadows: ambient shadow, drop shadow,
  and inner highlight.
- Use pure CSS transitions or keyframes. Prefer animating `transform`, `opacity`,
  and tokenized `box-shadow`.
- Preserve focus states, disabled states, hover states, pressed states, and
  reduced-motion behavior when touching interactive components.

## 8. Component API Conventions

- Boolean controls use React controlled-component conventions:
  `checked` plus `onChange` or `onCheckedChange`.
- Scalar controls use `value` plus `onChange`.
- Overlays use `isOpen` plus `onClose`.
- Keep uncontrolled fallbacks such as `defaultChecked` only where the component
  already supports them.
- Do not duplicate internal component behavior in pages. Compose the component
  and pass props instead.
- Preserve accessibility semantics: native form elements where possible,
  `role`, `aria-*`, keyboard behavior, focus trapping for dialogs, and labelled
  controls.

## 9. Design Direction

Tactile UI is not a Smartisan OS clone and not heavy skeuomorphism. The target
is:

- Flat, readable information structure
- Subtle physical affordance for controls
- Consistent proportion, radius, shadow direction, and motion rhythm
- Restrained material feeling from light and shadow, not bitmap texture
- Clear hierarchy before decoration

When official Smartisan source values exist, they take priority over inferred
golden-ratio values. Golden-ratio rhythm fills gaps; it does not override
source-calibrated dimensions.

## 10. Safe Modification Workflow

For component or UI work:

1. Read the relevant component `.tsx` and `.module.css`.
2. Check whether an existing token covers the needed visual value.
3. Make the smallest scoped change that fits existing patterns.
4. Update examples or demo sections only when the public behavior changes.
5. Run verification.

For docs-only changes, tests are optional unless you change documented commands,
installation instructions, or public API examples.

For code, style, hook, or app changes, run:

```bash
npm run lint
npm run build
```

If you change visible UI, also run the dev server and inspect the result in a
browser at desktop and mobile widths.

## 11. What Not To Do

- Do not hardcode design values outside `src/styles/tokens.css`.
- Do not create a new token without user approval.
- Do not add a public package API unless the task explicitly asks for it.
- Do not replace existing components with ad hoc page markup.
- Do not use static inline styles for layout or visual appearance.
- Do not introduce unrelated refactors while solving a narrow task.
- Do not remove Smartisan calibration comments or references unless replacing
  them with more accurate source-backed notes.
