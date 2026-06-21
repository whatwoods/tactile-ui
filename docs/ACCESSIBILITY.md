# Accessibility Guide

This guide records the keyboard and ARIA contract for Tactile UI public
components. Keep it in sync with `docs/COMPONENTS.md` and component tests.

## General Rules

- Prefer native form controls and buttons before custom roles.
- Every interactive control must have a visible label, `aria-label`, or an
  equivalent accessible name.
- Preserve focus-visible states and disabled states when changing styles.
- Dialog-like overlays must close on Escape and return focus to the trigger
  when possible.
- Do not duplicate interaction ownership. If a row owns the click target, nested
  visual controls should be read-only.

## Keyboard Matrix

| Component | Role or native element | Keys | Expected behavior |
| --- | --- | --- | --- |
| Button | `button` | Enter, Space | Activate the button unless disabled or loading. |
| Checkbox | native checkbox | Space | Toggle checked state. |
| Radio | native radio | Arrow keys, Space | Follow browser radio-group behavior. |
| Switch | `switch` | Enter, Space | Toggle checked state. |
| Select | `combobox` + `listbox` | ArrowUp, ArrowDown | Open the menu or move the active option without committing. |
| Select | `combobox` + `listbox` | Enter, Space | Open the menu or commit the active option. |
| Select | `combobox` + `listbox` | Home, End | Move to first or last option while open. |
| Select | `combobox` + `listbox` | Escape, Tab | Close without changing the value. |
| Slider | `slider` | ArrowLeft, ArrowDown | Decrement by `step` or previous mark. |
| Slider | `slider` | ArrowRight, ArrowUp | Increment by `step` or next mark. |
| Slider | `slider` | PageDown, PageUp | Decrement or increment by a larger step. |
| Slider | `slider` | Home, End | Move to min or max. |
| Tabs | `tablist`, `tab`, `tabpanel` | Arrow keys | Move focus by orientation and skip disabled tabs. |
| Tabs | `tablist`, `tab`, `tabpanel` | Home, End | Move focus to first or last enabled tab. |
| Tabs | `tablist`, `tab`, `tabpanel` | Enter, Space | Activate focused tab in manual activation mode. |
| SegmentedControl | `radiogroup`, `radio` | Arrow keys | Move selection between enabled options. |
| Dialog | `dialog` | Escape | Close through `onClose`. |
| ActionSheet | `dialog` | Escape | Close through `onClose`. |
| Popover | `dialog` content | Escape | Close the popover. |
| Tooltip | `tooltip` | Escape | Hide tooltip content. |

## Test Coverage Expectations

- Every public component should have at least one rendering or semantic test.
- Complex controls need behavior tests for keyboard interaction and ARIA state.
- Overlay tests should cover Escape, outside close behavior, focus return, and
  body scroll locking when applicable.
- Visual smoke tests must cover desktop and mobile viewports and guard against
  blank first paint or page-level horizontal overflow.
