# Official Reference Assets

These files are copied from `SmartisanTech/android_frameworks_smartisanos-base` for local design calibration only.
They are not imported by the app build and should not be treated as runtime UI assets unless licensing and usage are reviewed separately.

Source root used during collection:

```txt
/tmp/smartisan_sources/android_frameworks_smartisanos-base/core/res/res
```

## smartisanos-base/switch-ex

Official `SwitchEx` bitmap layers:

| File | Source density | Size |
| --- | --- | --- |
| `switch_ex_bottom.png` | `drawable-xxhdpi` | `338 x 144` |
| `switch_ex_frame.png` | `drawable-xxhdpi` | `224 x 144` |
| `switch_ex_mask.png` | `drawable-xxhdpi` | `224 x 144` |
| `switch_ex_unpressed.png` | `drawable-xxhdpi` | `338 x 144` |

Use these to calibrate switch proportions, layer order, dot positions, mask size, and thumb travel.

## smartisanos-base/buttons

Title/action button and long action references:

| File group | Source density | Notes |
| --- | --- | --- |
| `title_btn*.9.png` | `drawable-xxhdpi` | Title bar and compact physical buttons. |
| `blue_long_button*.9.png` | `drawable-xxhdpi` | Positive long action button reference. |
| `delete_button*.9.png` | `drawable-xxhdpi` | Destructive action button reference. |

## smartisanos-base/menu-dialog

Menu dialog action button references are preserved by density to avoid filename collisions:

| Directory | Notes |
| --- | --- |
| `drawable-xxhdpi/` | Blue, gray, and red menu dialog buttons. |
| `drawable-560dpi/` | Gray and red menu dialog buttons at higher density. |

## smartisanos-base/search

System search surface references:

| File group | Source density | Notes |
| --- | --- | --- |
| `search_bg.9.png` | `drawable-xxhdpi` | Search window background reference. |
| `search_btn*.9.png` | `drawable-xxhdpi` | Search button states. |
