---
name: tactile-ui
description: Use the Tactile UI design system in the smartisan-ui React/Vite source library. Use when adding or revising components, pages, demos, docs examples, styles, or consumer code that should follow Smartisan OS-inspired tactile UI rules, CSS Modules, src/styles/tokens.css tokens, component composition, controlled state conventions, accessibility states, and npm lint/build verification. Do not use for unrelated generic frontend work.
---

# Tactile UI

## Overview

Use this skill to build or revise UI that belongs to the Tactile UI design system: ordered React components with restrained tactile depth, source-level imports, strict design-token styling, and complete interaction states.

## Workflow

1. Start at the repository root. Follow `AGENTS.md` when present, then read `DESIGN.md` before creating a new component, page, or visual pattern.
2. Read `src/styles/tokens.css` and the closest existing components before writing styles. Use the established `Component.tsx` plus `Component.module.css` pattern.
3. Prefer composition over new markup. Use existing components first: `Button`, `Card`, `Chassis`, form controls, navigation, feedback, overlays, `List`, `ListItem`, and `SettingItem`.
4. Put static styling in CSS Modules. Use `var(--s-*)` tokens for colors, gradients, shadows, spacing, radii, typography, durations, and easing. Do not introduce raw design values outside `src/styles/tokens.css`; ask the user before adding a token.
5. Preserve tactile behavior: default, hover, active, focus, disabled, and loading/error states where relevant. Depth should come from layered tokenized shadows, inner highlights, borders, and small transforms.
6. Follow local React state conventions: boolean controls use `checked` plus `onChange` or `onCheckedChange`; scalar controls use `value` plus `onChange`; overlays use `isOpen` plus `onClose`.
7. Verify code changes with `npm run lint` and `npm run build`. For documentation-only changes, tests are optional unless documented commands or public API examples changed.

## Reference

Read `references/usage-guide.md` when you need component selection rules, source imports, API conventions, or the final review checklist.

## Boundaries

Use this skill for Tactile UI work only. Do not route generic frontend redesigns, unrelated React apps, broad visual inspiration requests, or package publishing work here unless the request explicitly targets this design system.
