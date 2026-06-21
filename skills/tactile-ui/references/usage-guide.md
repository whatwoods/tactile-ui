# Tactile UI Usage Guide

## Source Context

Tactile UI is a source-level React/Vite component library, not a published npm package. Consumers import components directly from `src/components/<Component>/<Component>` unless a public `src/index.ts` is added later. Import `src/styles/global.css` once at the app root; it already imports `tokens.css`.

Before creating a component, page, or visual pattern, read:

- `AGENTS.md` for repository rules.
- `DESIGN.md` for tactile UI principles, official Smartisan resource calibration, and component-specific boundaries.
- `src/styles/tokens.css` for available `--s-*` tokens.
- The closest existing `.tsx` and `.module.css` files for local API and styling patterns.

## Component Selection

Prefer existing components before new markup:

- Actions: `Button`.
- Surfaces: `Card`, `Chassis`.
- Forms: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`.
- Navigation: `Tabs`, `SegmentedControl`, `TitleBar`, `SideNav`.
- Feedback: `Alert`, `Badge`, `Progress`, `Spinner`, `Skeleton`, `Toast`.
- Overlays: `Dialog`, `ActionSheet`, `Popover`, `Tooltip`, `ProgressDialog`.
- Structured rows: `List`, `ListItem`, `SettingItem`.

Important boundaries:

- Use `TitleBar` for system-page tops; `Header`, `Hero`, and `SideNav` are demo-site shell components.
- Use `SettingItem` for settings rows, especially switch/check/chevron accessories; use `ListItem` for general information rows.
- Use `ActionSheet` for bottom decision menus; use `Dialog` for centered modal content.
- Use `ProgressDialog` for blocking processing states; use `Progress` for inline progress.
- Use `Card` for web layout surfaces, not as a replacement for setting/list row structures.

## Implementation Rules

Use Vanilla CSS Modules named `[Component].module.css`. Keep static layout and styling in CSS, not inline styles. Inline styles are acceptable only for dynamic values that cannot reasonably be represented by a class.

Use `var(--s-*)` tokens for all design values outside `tokens.css`: colors, gradients, shadows, spacing, sizing, radii, typography, opacity, durations, and easing. If a component needs a missing design token, stop and ask the user before adding it to `src/styles/tokens.css`.

Keep animations in CSS and prefer transitions on `transform`, `box-shadow`, `opacity`, `background`, and `border-color`. Do not use broad `transition: all`.

Make tactile depth restrained and consistent: top/inner highlights, ambient shadow, drop shadow, and pressed inset shadow should use existing tokens and the same light direction.

## API Conventions

Use local controlled-component conventions:

- Boolean controls: `checked` with `onChange` or `onCheckedChange`.
- Scalar controls: `value` with `onChange`.
- Overlays: `isOpen` with `onClose`.
- Toasts: wrap the app root with `ToastProvider`, then call `useToast()` from children.

Keep accessibility behavior with the component pattern:

- Interactive rows should use real buttons when clickable.
- Popovers, selects, dialogs, and action sheets should expose ARIA roles/state and keyboard behavior.
- Focus-visible states must be clear and tokenized.
- Disabled tactile controls should remain visible as physical objects; follow existing component-specific opacity tokens.

## Tactile Review Checklist

Before finishing UI code, check:

- The information hierarchy is clear before decorative detail.
- The result uses existing components unless a pattern is truly missing.
- CSS has no hardcoded color, gradient, shadow, spacing, radius, font-size, duration, or easing values outside `tokens.css`.
- Interactive states include default, hover, active, focus, disabled, and loading/error where applicable.
- The component keeps the Smartisan/Tactile tone: ordered, restrained, physical, modern, and not leather/wood/metal texture heavy.
- Keyboard, ARIA, body scroll locking, focus trap, or escape handling are present where the pattern requires them.
- `npm run lint` and `npm run build` pass for code changes.
