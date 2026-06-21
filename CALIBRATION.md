# Smartisan Calibration Ledger

Tactile UI uses Smartisan OS source assets as a calibration layer where they are
available. This ledger records which parts of the system are source-calibrated
and which parts are still inferred from Tactile UI principles.

## Source Material

- `references/official-source/README.md`
- `references/official-assets/README.md`
- SmartisanTech `android_frameworks_smartisanos-base` snapshot:
  `3489bd5cd1dd0177e285fbe337f70b44fc777e4c`

Reference assets are for calibration only. They should not become runtime UI
assets unless licensing and package impact are reviewed separately.

## Calibration Levels

- `A`: calibrated from official Smartisan source or asset dimensions.
- `B`: inferred from `DESIGN.md` rules and token semantics.
- `C`: temporary engineering value that must be revisited before V1.0.

## Current Component Status

| Area | Level | Evidence | Notes |
| --- | --- | --- | --- |
| Button gradients and states | A | `references/official-assets/smartisanos-base/buttons/` | Tokens include 9-patch calibrated gradients and border colors. |
| Switch proportions and layers | A | `references/official-assets/smartisanos-base/switch-ex/` | Tokens capture SwitchEx dimensions, thumb travel, dot positions, and layer shadows. |
| Menu/action dialog buttons | A | `references/official-assets/smartisanos-base/menu-dialog/` | Gradients and disabled/pressed states are tokenized. |
| Title bar typography and actions | A/B | Official title button assets plus `DESIGN.md` | Layout behavior still needs broader viewport tests. |
| Setting/List row rhythm | A/B | Official dp values in `tokens.css` comments | Needs component-level source notes before V1.0. |
| Slider | B | `DESIGN.md` physical control model | ARIA and keyboard behavior are now tested; visual calibration remains inferred. |
| Select | B | `DESIGN.md` form/menu principles | Combobox semantics are tested; menu dimensions still use project tokens. |
| Chassis/demo surfaces | C | Demo-specific visual composition | Raw visual values have been removed from component CSS; source calibration is still incomplete. |
| Showcase/Tokens demo sections | C | Demo-only layouts | Should move out of public package source boundary. |

## Open Calibration Work

- Promote `C` level demo values to calibrated tokens only when the visual role is
  stable and source-backed enough to justify a token.
- Add source-backed notes to component files only where they clarify a calibrated
  value that would otherwise look arbitrary.
- Keep runtime package output free of official bitmap assets unless separately
  approved.
