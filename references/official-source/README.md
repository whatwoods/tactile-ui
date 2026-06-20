# Official Source References

This directory stores local source snapshots from SmartisanTech repositories for design and implementation reference.
The files are not imported by the app build and should not be modified as project source.

## android_frameworks_smartisanos-base

Source:

```txt
https://github.com/SmartisanTech/android_frameworks_smartisanos-base.git
```

Snapshot commit:

```txt
3489bd5cd1dd0177e285fbe337f70b44fc777e4c
```

Primary uses:

- `core/java/smartisanos/widget/` for reusable Smartisan OS widgets.
- `core/java/smartisanos/app/` for system dialogs and search activity code.
- `core/res/res/layout/` for official XML layout structure.
- `core/res/res/drawable*` for selector, bitmap, and 9-patch visual references.
- `core/res/res/values/` for dimensions, colors, and public resource names.

Keep this as a reference snapshot. If it needs to be refreshed, replace the directory from a clean upstream checkout and update the commit above.
