# Smartisan UI AI Guidance

Welcome, AI Agent. This repository contains the Smartisan UI/UX design system. You must adhere to the following rules when reading, analyzing, or modifying the code in this project:

## 1. Design Token Strictness
- **NEVER** hardcode color values (hex, rgb, hsl) or shadow values in your CSS.
- **ALWAYS** use the design tokens provided in `src/styles/tokens.css`.
- If a component requires a new token, consult the user before adding it to `tokens.css`.

## 2. Reading Order
- Before creating a new component or page, you MUST read `DESIGN.md` to understand the visual principles (Refined Skeuomorphism, depth, and physical feedback).
- Review existing components to understand the patterns before proposing new ones.

## 3. Styling Approach
- Use Vanilla CSS Modules (`[name].module.css`) for component-specific styles.
- Animations and transitions should rely on pure CSS (transitions on `transform`, `box-shadow`, `opacity` or keyframes) for performance.

## 4. Skeuomorphism Constraints
- Emphasize depth using multiple layers of box-shadows (ambient shadow + drop shadow + inner highlight).
- Maintain clean layouts without excessive textures; rely on light and shadow to create the material feel.

## 5. How to Use This Component Library
- This repository is currently a source-level React/Vite component library, not a published npm package.
- Import components directly from `src/components/<Component>/<Component>` unless a public `src/index.ts` export is added later.
- Import `src/styles/global.css` once at the application root. It already imports `tokens.css`.
- Prefer existing components before creating new markup:
  - Actions: `Button`
  - Surfaces: `Card`, `Chassis`
  - Forms: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`
  - Navigation: `Tabs`, `SegmentedControl`, `TitleBar`, `SideNav`
  - Feedback: `Alert`, `Badge`, `Progress`, `Spinner`, `Skeleton`, `Toast`
  - Overlays: `Dialog`, `ActionSheet`, `Popover`, `Tooltip`, `ProgressDialog`
  - Structured rows: `List`, `ListItem`, `SettingItem`
- Wrap app roots that use toast notifications with `ToastProvider`, then call `useToast()` from child components.

## 6. Component State Conventions
- Boolean controls should follow React controlled-component conventions: `checked` plus `onChange` or `onCheckedChange`.
- Scalar controls should use `value` plus `onChange`.
- Overlays should use `isOpen` plus `onClose`.
- Do not duplicate internal component behavior in pages. Compose existing components first, then add a new component only if the pattern is missing.

## 7. Styling Scope for Consumers
- Use CSS Modules for page-level and component-level styles.
- Use design tokens for colors, shadows, spacing, radii, typography, durations, and easing.
- `src/styles/tokens.css` is the only place where raw color, gradient, shadow, spacing-scale, radius-scale, typography-scale, duration, or easing values may be defined.
- Avoid inline styles except for dynamic values that cannot reasonably be represented by a class. Static layout should live in CSS Modules.

## 8. Verification
- After modifying components, styles, hooks, or app code, run:
  - `npm run lint`
  - `npm run build`
- For documentation-only changes, tests are optional unless the edit changes documented commands or public API examples.
