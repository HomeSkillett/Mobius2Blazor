# Alerts & Notifications — SPEC

Written retroactively after a dev accuracy review of `alerts.html` found real drift from Master.
This documents the corrected, sourced truth for all five patterns plus what's still open.

Master XAML sources:
- `Common/Asi.CustomControls.Client.UI/NotificationItem.xaml` — Toast + Notification Item
- `Common/Asi.CustomControls.Client.UI/NotificationToggleButton.xaml` — sidebar toggle button
- `Common/Asi.Miscellaneous.Client.UI/SingleControls/InternalNotificationPanel.xaml` — panel
- `Plugins/Agriculture/Agriculture/ActiveAlert/Asi.Ag.ActiveAlert/ActiveAlertUI.xaml` — Active Alert
- `Common/Asi.CustomControls.Client.UI/OkCancelDialog.xaml` — Confirmation Dialog
- Icon paths: `Common/Asi.Resources.Client.UI/Themes/Paths/Icons.xaml`
- Durations/shadow: `Common/Asi.Resources.Client.UI/Themes/Sizes/Sizes.xaml`, `LightTheme.xaml`

## 1. Toast (NotificationItem.xaml, IsToast=True trigger)

- Level chip: `Width="4"` default, overridden to `Width="14"` and `Margin="0"` by the `IsToast=True` trigger (lines 419-421).
- Content column padding traces to per-element XAML margins, not a single uniform value (see Notification Item below for the same row structure).
- Icon: DismissButton uses `Icon_XSm` → font glyph **XSm** at `0xE567` (plain X). Not `Icon_Status_XSm` (circled X, `0xE454`) — those are two different vector paths in Icons.xaml.

## 2. Notification Item (NotificationItem.xaml, default/panel mode)

Row 0 (label header) structure, traced to lines 98-154:
- Label-side StackPanel: `Margin="0,10"` + attached `Margin.Bottom=Size6` → top 10px, bottom 16px (10+6), left/right 0.
- Error-code side: `Margin="0,10,10,0"` → top 10px, right 10px.
- DismissButton: `Margin="0,-8"` → intentionally oversized click target (8px taller than its visual icon on each side). Not currently replicated in CSS — open item.
- Row 1 (title): `Margin.Bottom=Size12`.
- Row 2 (message, inside ExpanderItem): `Margin.Bottom=Size12`, only visible when selected/opened.
- Row 3 (actions): `Margin="0,-8"` on the ItemsControl, 20px gap between action buttons (`Margin="0,0,20,0"` per button).

## 3. Notification Toggle Button (NotificationToggleButton.xaml)

- Button: `Width=62 Height=50`.
- Left accent bar (mouseover/selection/critical): `Width=4`, left-aligned.
- Inner icon grid: `50x50`, `Margin="6,0"` (centers the 50-box inside the 62-wide button).
- Icon canvas: `20x20`, `Margin="0,0,0,2"`, centered in the 50x50 grid → top-left at `(21, 14)` relative to the button.
- **Alert count badge is a font-overlay, not a corner badge.** Nested `Canvas.Left=12, Canvas.Top=12` inside the icon canvas (lines 123-127) → absolute position `(33, 26)` from the button's top-left. This is the same base-icon + offset-status-glyph pattern called out for StatusIcon elsewhere in this project — previous CSS treated it as a generic `top:8px; right:10px` corner badge, which was wrong.
- Critical state: second nested canvas at `Canvas.Left=10, Canvas.Top=14` inside a *second* 20x20 "critical" icon canvas, holding `Icon_Status_CriticalSm`. Not yet built out in alerts.css — open item if/when the critical toggle state gets its own markup.

## 4. Notification Panel (InternalNotificationPanel.xaml)

- Row 0: 24px spacer.
- Filter tabs: only one of "All" or "Hybrid" is visible at a time (mutually exclusive `Visibility` bindings) alongside "Recent" and "Dismissed" — so 3 tabs visible in the common case, matching the current markup.
- VehicleFilterButton icon: `Icon_VehicleAdorned` → font glyph **VehicleAdorned** at `0xEC16`.
- TimeFilterButton icon: `Icon_Clock` — **no matching glyph found in mobius-system-icons.ttf.** Open item, needs design/font-maintainer input.
- DismissAllRecentNotificationsButton icon: `Icon_ClearNotifications` — **also no matching glyph in the font.** Currently left as `0xE454` (wrong, but flagged) rather than silently guessing further.
- Splitter/divider: `Margin="0, 17.5"`.

## 5. Active Alert (ActiveAlertUI.xaml, Agriculture plugin)

- Root: `Height="54"`, two columns `60px | *`.
- Progress bar: `Height="4"`, `Margin="0,1,0,0"`, spans both columns. `Background="#11000000"` (~6.7% black) — matches `rgba(0,0,0,0.067)` already in CSS.
- Icon: `20x20`, centered in the 60px column.
- Text: `Margin="-1,0,20,0"`.
- Icon per state: Info → `Icon_Status_Info` (font **Status_Info**, `0xE416`); Warning → `Icon_Status_Warning` (`0xE410`); Critical → `Icon_Status_Critical` (`0xE412`); Inactive/OK → `Icon_Status_OkayThin` (`0xE44A`), and this state has **no progress bar at all** (no `<ProgressBar>` in the `InactiveVisual` Border).

## 6. Confirmation Dialog (OkCancelDialog.xaml)

**This is a native WPF Window (`common:UserWindow`), not a Border/Grid.** `Width=400 Height=300`, `ResizeMode=NoResize`, `WindowStartupLocation=CenterOwner`. Title bar, close button, and window shadow are OS-drawn chrome — none of it exists in the XAML content area. Content is just:

```
StackPanel (Vertical)
  TextBlock DialogText — Margin="10,30,10,30"
  StackPanel (Horizontal)
    Button OK — Margin="10,0,10,0", no Style override
    Button Cancel — Margin="10,0,10,0", no Style override
```

Both buttons render identically (default WPF Button style — no primary/outline distinction). Gap between them is 20px (10+10 from adjoining margins), not 10.

**Open question:** the previous markup invented a custom titlebar, close button, and box-shadow to make this usable as a web modal. That's been stripped since none of it traces to Master. But Blazor can't spawn a real OS window either, so this component still needs some way to show a title and let the user dismiss it outside of OK/Cancel. Recommend this becomes a shared modal-wrapper concern rather than something re-invented per-dialog. Not resolved here.

## Token notes

- `--font-bodyMd` / `--font-bodySm` were undefined everywhere; already corrected in this file to `--font-default` (14px/20px, matches `TextBlock_Paragraph` style) and `--font-Sm` (11px/14px, matches `TextBlock_Sm` style) before this pass.
- `--duration-mouse-over` doesn't exist; the real, already-sourced token is `--transition-mouse-over` (160ms, `GeneralMouseOverDuration`, `Sizes.xaml:78`). Fixed.
- `--shadow-lg-offset` is a real, correctly-defined token in `box-shadow/box-shadow.css`, it was just never imported into `main.css`. Import added. Not used on the dialog anymore since Master's dialog shadow is OS chrome, not a sourced XAML value.

## Still open (not resolved in this pass)

1. `Icon_Clock`, `Icon_ClearNotifications`, and `Icon_DocumentExclamation` have no matching glyph anywhere in `mobius-system-icons.ttf` (checked the full cmap). Affects: Time filter + Dismiss-all buttons in the Notification Panel, and the Error-report nav button in Notification Item. Needs design/font-maintainer follow-up before those three can show the right icon — left at their previous (wrong) codepoints and flagged in-line rather than guessing further.
2. Dialog title/dismiss affordance for the web (see Confirmation Dialog section above) — needs a product/design decision.
3. All five pages in this folder (`alerts.html`, `alerts-toast.html`, `alerts-notification.html`, `alerts-panel.html`, `alerts-active.html`, `alerts-dialog.html`) use `<script>` for interactive demo behavior (toast triggering, dismiss animation, expand/collapse, modal open/close), which conflicts with this project's "vanilla HTML only, no JavaScript" output rule. Left as-is since ripping out working demos is a bigger call than an accuracy fix — flagging for a decision on whether documentation/demo pages are held to the same no-JS rule as literal component markup meant for Blazor.
4. DismissButton's oversized click target (`Margin="0,-8"` in NotificationItem.xaml) isn't replicated in the flat header padding fix — worth a proper hit-target pass later.

## Status

Icon glyph codes, the two broken transition/shadow tokens, the fabricated dialog chrome, the
notification-toggle badge position, and the notification header spacing have all been corrected
across every file in this folder (not just `alerts.html`) as of this pass, except for the three
open items above.
