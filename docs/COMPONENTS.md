# Component Documentation

Import public components from the package entry and import package styles once:

```tsx
import { Button, Card, Switch } from 'tactile-ui';
import 'tactile-ui/style.css';
```

Public types are exported from the same entry:

```tsx
import type { ButtonProps, SelectOption, SliderProps } from 'tactile-ui';
```

## Actions

### Button

Use `Button` for primary, secondary, and destructive actions.

Key props:

- `variant`: `primary | secondary | danger`
- `size`: `sm | md | lg`
- `loading`: disables the button and shows a spinner
- Native button props are supported.

States:

- Default, hover, active, focus-visible, disabled, loading

Accessibility:

- Renders a native `button`.
- Defaults to `type="button"` to avoid accidental form submission.
- For loading actions, exposes `aria-busy`.
- Supports refs for focus management.

## Surfaces

### Card

Use `Card` for grouped content and panel surfaces.

Key props:

- `title`
- `padding`: `none | sm | md | lg`
- `onBack`
- `className`

Accessibility:

- Does not impose a landmark role.
- Pair `title` with surrounding heading structure where page hierarchy matters.

### Chassis

Use `Chassis` for demo-grade tactile device frames and composed control panels.

Key props:

- `title`
- `model`
- `ledColor`: `green | blue | red | orange | cyan | violet`
- `audioEnabled`
- `onPowerChange`

Accessibility:

- Power control is a native button with an accessible label.
- This component is visually expressive and should be used sparingly in product UI.

## Forms

### Input

Use `Input` for single-line text input.

Key props:

- Native input props
- `label`
- `error`

Accessibility:

- Generates an id when one is not supplied.
- Connects `label` with the input.
- Supports refs for form libraries and focus management.
- Password inputs include a show/hide toggle with an accessible label.

### Textarea

Use `Textarea` for multi-line input.

Key props:

- Native textarea props
- `label`
- `error`
- `resize`: `none | vertical | horizontal | both`

Accessibility:

- Generates an id when one is not supplied.
- Sets `aria-invalid` and `aria-describedby` when `error` is present.
- Supports refs.

### Select

Use `Select` for compact single-value selection.

Key props:

- `options: SelectOption[]`
- `value`
- `defaultValue`
- `onChange`
- `placeholder`
- `label`
- `ariaLabel`

States:

- Closed, open, selected, active option, disabled

Keyboard:

- `ArrowDown` / `ArrowUp`: open or move active option
- `Home` / `End`: move to first or last option while open
- `Enter` / `Space`: open or commit active option
- `Escape` / `Tab`: close

Accessibility:

- Trigger uses `role="combobox"`.
- Menu uses `role="listbox"` and options use `role="option"`.
- Active option is tracked with `aria-activedescendant`.
- Direction keys do not commit until Enter or Space.

### Checkbox

Use `Checkbox` for boolean form fields.

Key props:

- Native checkbox props
- `label`

Accessibility:

- Renders a native checkbox input.
- Generates an id when one is not supplied.
- Supports refs.

### Radio

Use `Radio` for native radio inputs.

Key props:

- Native radio props
- `label`

Accessibility:

- Renders a native radio input.
- Generates an id when one is not supplied.
- Supports refs.

### Switch

Use `Switch` for immediate boolean settings.

Key props:

- `checked`
- `defaultChecked`
- `onChange`
- `disabled`
- `variant`: `positive | negative`
- `size`: `sm | md`
- `readOnly`

Keyboard:

- `Space` / `Enter`: toggle

Accessibility:

- Interactive mode uses `role="switch"` and `aria-checked`.
- Supports pointer drag and click toggle.
- Use `readOnly` when a parent row owns the interaction.

### Slider

Use `Slider` for scalar values and stepped marked values.

Key props:

- `min`
- `max`
- `step`
- `value`
- `defaultValue`
- `onChange`
- `marks`
- `ariaLabel`
- `getAriaValueText`

Keyboard:

- `ArrowLeft` / `ArrowDown`: decrement
- `ArrowRight` / `ArrowUp`: increment
- `PageDown` / `PageUp`: large decrement/increment
- `Home` / `End`: min/max

Accessibility:

- Uses `role="slider"`.
- Exposes `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and optional `aria-valuetext`.
- Mark labels are buttons and can commit a marked value.

## Navigation

### Tabs

Use `Tabs` for switching between related panels.

Key props:

- `items: TabItem[]`
- `value`
- `defaultValue`
- `onChange`
- `orientation`: `horizontal | vertical`
- `activationMode`: `automatic | manual`
- `ariaLabel`

Keyboard:

- Arrow keys move focus by orientation.
- `Home` / `End` move to first or last enabled tab.
- In manual mode, `Enter` / `Space` activates the focused tab.

Accessibility:

- Uses `tablist`, `tab`, and `tabpanel` roles.
- Skips disabled tabs during keyboard navigation.
- Roving focus is maintained on enabled tabs.

### SegmentedControl

Use `SegmentedControl` for small mutually exclusive choices.

Key props:

- `options: SegmentedControlOption[]`
- `value`
- `defaultValue`
- `onChange`
- `disabled`

Keyboard:

- Arrow keys move between enabled options.

Accessibility:

- Uses `radiogroup` and `radio` roles.
- Disabled options are skipped in keyboard navigation.

### TitleBar

Use `TitleBar` for Smartisan-style panel or app headers.

Key props:

- `title`
- `backLabel`
- `confirmLabel`
- `onBack`
- `onConfirm`
- `confirmDisabled`

Accessibility:

- Back and confirm actions are native buttons.
- Long titles automatically switch from centered to left-aligned layout.

## Feedback

### Alert

Use `Alert` for inline status, warning, or error messaging.

Key props:

- `tone`: `neutral | info | success | danger | warning`
- `title`
- `action`
- `onClose`
- `banner`

Accessibility:

- Danger and warning alerts use `role="alert"`.
- Other tones use `role="status"`.
- Close button has an accessible label.

### Badge

Use `Badge` for counts, compact labels, or status dots.

Key props:

- `variant`: `neutral | primary | success | danger`
- `size`: `sm | md`
- `dot`
- `count`
- `max`

Accessibility:

- Dot badges can expose a label when children are a string.

### Progress

Use `Progress` for determinate progress.

Key props:

- `value`: clamped from `0` to `100`

Accessibility:

- Uses `role="progressbar"`.
- Exposes `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.

### Spinner

Use `Spinner` for indeterminate loading.

Key props:

- `size`: `sm | md | lg`
- `label`

Accessibility:

- Uses `role="progressbar"`.
- Exposes an accessible label.

### Skeleton

Use `Skeleton` for loading placeholders.

Key props:

- `variant`: `text | rect | circle`
- `animated`
- `width`
- `height`

Accessibility:

- Rendered as decorative with `aria-hidden="true"`.

### ToastProvider and useToast

Use `ToastProvider` at the app root and `useToast` inside descendants.

Key APIs:

- `toast(content, options)`
- `close(id)`
- `clear()`

Accessibility:

- Default toasts use `role="status"` and polite live region behavior.
- Danger toasts use `role="alert"` and assertive live region behavior.
- Toasts with actions do not auto-dismiss before action resolution.

## Overlays

### Dialog

Use `Dialog` for modal content that requires user attention.

Key props:

- `isOpen`
- `onClose`
- `title`
- `children`

Accessibility:

- Uses `role="dialog"` and `aria-modal="true"`.
- Focus is trapped while open.
- Escape closes through `onClose`.
- Body scrolling is locked while open.

### ActionSheet

Use `ActionSheet` for stacked modal actions.

Key props:

- `isOpen`
- `onClose`
- `title`
- `actions`
- `cancelLabel`
- `cancelPosition`

Accessibility:

- Uses modal dialog semantics.
- Focus is trapped while open.
- Action buttons are native buttons.

### ProgressDialog

Use `ProgressDialog` for modal blocking progress.

Key props:

- `isOpen`
- `title`
- `message`
- `tone`: `light | dark`

Accessibility:

- Uses `role="dialog"`, `aria-modal`, `aria-busy`, and polite live region behavior.

### Popover

Use `Popover` for non-critical floating content tied to a trigger.

Key props:

- `trigger`
- `open`
- `defaultOpen`
- `onOpenChange`
- `side`: `top | right | bottom | left`
- `align`: `start | center | end`
- `modal`

Accessibility:

- Trigger receives `aria-haspopup`, `aria-expanded`, and `aria-controls`.
- Content uses dialog role.
- Escape and outside pointer down close the popover.

### Tooltip

Use `Tooltip` for short supplemental text.

Key props:

- `content`
- `children`
- `side`
- `align`
- `delay`
- `disabled`

Accessibility:

- Content uses `role="tooltip"`.
- Trigger receives `aria-describedby` while open.
- Opens on hover or focus and closes on blur, mouse leave, or Escape.

## Structured Rows

### List and ListItem

Use `List` and `ListItem` for grouped rows.

Key props:

- `List`: `children`, `className`
- `ListItem`: `title`, `subtitle`, `value`, `icon`, `chevron`, `selected`, `disabled`, `onClick`

Accessibility:

- Clickable rows render as buttons.
- Disabled rows expose disabled state.

### SettingItem

Use `SettingItem` for settings rows with optional accessories.

Key props:

- `title`
- `summary`
- `value`
- `icon`
- `accessory`: `none | chevron | switch | check`
- `checked`
- `defaultChecked`
- `onCheckedChange`
- `selected`
- `onClick`

Accessibility:

- Clickable rows render as buttons.
- Switch accessories delegate visual state to `Switch` while the row owns interaction.
- Check accessories can expose pressed state for selectable rows.

## Icon

Use `Icon` as a consistent wrapper for SVG or icon content.

Key props:

- `size`: `xs | sm | md | lg`
- `tone`: `default | muted | primary | inverse`
- `surface`
- `label`

Accessibility:

- When `label` is present, renders with `role="img"`.
- Without `label`, the icon is decorative with `aria-hidden`.
