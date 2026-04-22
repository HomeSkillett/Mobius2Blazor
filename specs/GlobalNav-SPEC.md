# GlobalNav SPEC

> Covers the top-right navigation bar in MainWindow: UserDetailsAndSwitchControl, NotificationToggleButton, and the UserWindow chrome buttons.

---

## 1. Component Hierarchy (XAML Source Map)

```
MainWindow.xaml (Asi.Miscellaneous.Client.UI)
  └─ Grid (WindowGrid) [line 36]
       └─ Grid [line 124] ← TOP BAR: Height="50", VerticalAlignment="Top", Grid.ColumnSpan="2"
            ├─ Col 0: BrandedModeBarColumnWidth (70px) [line 130]
            ├─ Col 1: * (flexible) [line 131]
            └─ Col 2: Auto [line 132]
                 └─ Grid [line 135] ← RIGHT-SIDE NAV: Height="50"
                      ├─ Col 0: Auto — ConnectionStatus / UserDetailsAndSwitchControl [lines 144-155]
                      ├─ Col 1: Auto — NotificationToggleButton [lines 156-194]
                      └─ Col 2: Auto (MinWidth=WindowControlWidth) — Window chrome fill rect [lines 195-198]

UserWindow.xaml (Asi.CommonControls.Client.UI)
  └─ StackPanel ← WINDOW CONTROLS: Height="50", HorizontalAlignment="Right", Orientation="Horizontal"
       ├─ WindowControlsVisibilityToggleContainer (50x50) [line 87]
       ├─ ExpanderItem → StackPanel (WindowControls) [line 122]
       │    ├─ WindowFullScreen button (50x50) [line 126]
       │    ├─ WindowMinimize button (50x50) [line 159]
       │    ├─ WindowMaximize button (50x50) [line 172]
       │    └─ WindowClose button (50x50, via ConfirmInteraction) [line 205]
```

### Figma-to-XAML Mapping

| Figma name | XAML component | XAML file |
|---|---|---|
| Nav/Global Nav/.Profile | `UserDetailsAndSwitchControl` → `UserCard` | SingleControls/UserDetailsAndSwitchControl.xaml |
| Nav/Global Nav/.Alert | `NotificationToggleButton` | Asi.CustomControls.Client.UI/NotificationToggleButton.xaml |
| Nav/Global Nav/.Window Options | `UserWindow` template chrome | Asi.CommonControls.Client.UI/UserWindow.xaml |

---

## 2. Resolved Dimensions

### 2.1 Top Bar Container
| Property | Value | Source |
|---|---|---|
| Height | **50px** | MainWindow.xaml line 126 |
| VerticalAlignment | Top | MainWindow.xaml line 127 |
| Grid.ColumnSpan | 2 | MainWindow.xaml line 125 |
| Col 0 width | **70px** | ASIBrand.xaml → `BrandedModeBarColumnWidth = 70.0` |
| Col 1 width | `*` (fill) | MainWindow.xaml line 131 |
| Col 2 width | Auto | MainWindow.xaml line 132 |

### 2.2 UserDetailsAndSwitchControl (Profile)
| Property | Value | Source |
|---|---|---|
| Container bg | `--BackgroundStepTwo` (#F6F6F6) | UserDetailsAndSwitchControl.xaml line 31 |
| Connection status bar | **4px wide**, left-aligned | UserDetailsAndSwitchControl.xaml line 35 (ColumnDefinition Width="4") |
| Connection status color (Connected) | `--InformationGreen` (#92D400) | UserDetailsAndSwitchControl.xaml line 59 |
| Connection status color (Disconnected) | `--InformationRed` (#E62333) | UserDetailsAndSwitchControl.xaml line 57 |
| Connection status color (Unknown/default) | `--InformationYellow` (#FED100) | UserDetailsAndSwitchControl.xaml line 54 |
| Separator line (right side) | **1px wide** | UserDetailsAndSwitchControl.xaml line 37 (ColumnDefinition Width="1") |
| Expander width (opened) | **215px** | UserDetailsAndSwitchControl.xaml line 72 |
| Popup placement rect | **220px wide** | UserDetailsAndSwitchControl.xaml line 86 |

### 2.3 UserCard (inside UserDetailsAndSwitchControl)
| Property | Value | Source |
|---|---|---|
| Margin | **-4, 6, 0, 0** (Left=-4, Top=6) | UserDetailsAndSwitchControl.xaml line 43 |
| Padding (style default) | **24px left/right, 0 top/bottom** | UserCard.xaml line 58 (Padding="24,0") |
| Connection status rect | **4px wide**, Column 0 | UserCard.xaml line 14-15 |
| Background | `--BackgroundStepTwo` (#F6F6F6) | UserCard.xaml line 12 |
| Text foreground | `--ForegroundPrimary` (#555555) | UserCard.xaml line 59 |
| Username binding | `ConnectedUsername` | UserDetailsAndSwitchControl.xaml line 44 |

### 2.4 ServerSiteName TextBlock
| Property | Value | Source |
|---|---|---|
| Margin | **24, 6, 8, 0** (Left=24, Top=6, Right=8) | UserDetailsAndSwitchControl.xaml line 47 |
| Text binding | `ServerSiteName` | UserDetailsAndSwitchControl.xaml line 48 |
| Font | Default (`--default-font`, Roboto Condensed, 14px) | Inherited |

### 2.5 NotificationToggleButton (Alert)
| Property | Value | Source |
|---|---|---|
| Width | **62px** | NotificationToggleButton.xaml line 15 |
| Height | **50px** | NotificationToggleButton.xaml line 16 |
| Background | `--BackgroundStrong` (#FFFFFF) | NotificationToggleButton.xaml line 17 |
| MouseOver left bar | **4px wide**, `--MouseOverPrimary` (#0CD0FF) | NotificationToggleButton.xaml line 22-26 |
| Selection left bar | **4px wide**, `--SelectionPrimary` (#009FDA) | NotificationToggleButton.xaml line 28-33 |
| Icon canvas | **20x20px**, centered, margin-bottom=2px | NotificationToggleButton.xaml lines 97-106 |
| Icon path data | `Icon_Notifications` resource | NotificationToggleButton.xaml line 111 |
| Icon foreground | `--ForegroundPrimary` (#555555) | NotificationToggleButton.xaml line 292 (style) |
| Alert count position | Canvas.Left=**12**, Canvas.Top=**12** | NotificationToggleButton.xaml lines 125-126 |
| Alert count text size | Width=**40**, Height=**20** | NotificationToggleButton.xaml lines 131-132 |
| Inner grid | **50x50px**, Margin="6,0" | NotificationToggleButton.xaml lines 89-91 |
| Checked icon color | `--SelectionPrimary` (#009FDA) | NotificationToggleButton.xaml line 268 |

#### Alert Visual States
| State | Background | Icon set | Alert count | Left bar |
|---|---|---|---|---|
| **NoNewAlert** | Default (white) | Non-critical | Hidden | Hidden |
| **NewAlert** | Default (white) | Non-critical | Visible | Hidden |
| **NewCriticalAlert** | `--InformationRedAlt` (#FF0000) solid + `--InformationRed` (#E62333) pulsing | Critical (white icon + critical glyph) | Hidden | `--InformationRed` |

#### Critical Background Pulse Animation
- Duration: **600ms**, repeats forever
- Opacity keyframes: 0.0 → 1.0 → 0.0 (triangular pulse)
- Source: NotificationToggleButton.xaml lines 63-80

### 2.6 Window Chrome Rectangle
| Property | Value | Source |
|---|---|---|
| Fill | `--BackgroundInvertStrong` (#F3F3F3) | MainWindow.xaml line 197 |
| Column | Grid.Column="2" | MainWindow.xaml line 196 |
| MinWidth | Bound to `WindowControlWidth` (dynamic) | MainWindow.xaml line 142 |

### 2.7 Window Control Buttons (UserWindow.xaml)
| Property | Value | Source |
|---|---|---|
| Container | StackPanel, Orientation=Horizontal | UserWindow.xaml line 122 |
| Container height | **50px** | UserWindow.xaml line 80 |
| Container background | `--BackgroundInvertStrong` (#F3F3F3) | UserWindow.xaml line 83 |
| Container alignment | Right, Top | UserWindow.xaml lines 81-82 |
| Each button size | **50x50px** | DefaultControls.xaml lines 2794-2795 |
| Button background (hover) | `--BackgroundInvertStrongStepOne` (#FFFFFF) | DefaultControls.xaml line 2796 |
| Button foreground | `--ForegroundInvertWatermark` (#707070) | DefaultControls.xaml line 2797 |
| Button foreground (hover) | `--MouseOverPrimary` (#0CD0FF) | DefaultControls.xaml line 2801 |

#### Button Order (left to right)
1. **FullScreen** — Icon: `Icon_Windows10_FullScreen` / `Icon_Windows10_NormalScreen` (toggled)
2. **Minimize** — Icon: `Icon_Windows10_Minimize`
3. **Maximize** — Icon: `Icon_Windows10_Maximize` / `Icon_Windows10_Restore` (toggled)
4. **Close** — Icon: `Icon_Windows10_Close`

#### Close Button Overrides
| Property | Value | Source |
|---|---|---|
| Background (hover) | `--InformationRed` (#E62333) | DefaultControls.xaml line 2807 |
| Foreground (hover) | `--InformationForegroundAlt` (#FFFFFF) | DefaultControls.xaml line 2810 |
| Close button has confirmation dialog wrapping it | `ConfirmInteraction`, Height=46 | UserWindow.xaml line 207 |

#### Window Visual States
| State | Maximize icon | Restore icon | FullScreen icon | NormalScreen icon |
|---|---|---|---|---|
| **Normal** | Visible | Collapsed | Visible | Collapsed |
| **Maximized** | Collapsed | Visible | Visible | Collapsed |
| **FullScreen** | Collapsed | Visible | Collapsed | Visible |

---

## 3. Color Token Map

| XAML Resource | CSS Token | Resolved Value |
|---|---|---|
| BackgroundStrongBrush | `--BackgroundStrong` | #FFFFFF |
| BackgroundStepTwoBrush | `--BackgroundStepTwo` | #F6F6F6 |
| BackgroundInvertStrongBrush | `--BackgroundInvertStrong` | #F3F3F3 |
| BackgroundInvertStrongStepOneBrush | `--BackgroundInvertStrongStepOne` | #FFFFFF |
| ForegroundPrimaryBrush | `--ForegroundPrimary` | #555555 |
| ForegroundInvertWatermarkBrush | `--ForegroundInvertWatermark` | #707070 |
| ForegroundInvertStrongBrush | `--ForegroundInvertStrong` | #002B45 |
| SelectionPrimaryBrush | `--SelectionPrimary` | #009FDA |
| SelectionSecondaryBrush | `--SelectionSecondary` | #0078A4 |
| SelectionForegroundBrush | `--SelectionForeground` | #FFFFFF |
| MouseOverPrimaryBrush | `--MouseOverPrimary` | #0CD0FF |
| InformationGreenBrush | `--InformationGreen` | #92D400 |
| InformationYellowBrush | `--InformationYellow` | #FED100 |
| InformationRedBrush | `--InformationRed` | #E62333 |
| InformationRedAltBrush | `--InformationRedAlt` | #FF0000 |
| InformationForegroundAltBrush | `--InformationForegroundAlt` | #FFFFFF |

---

## 4. Font & Typography

| Element | Font | Size | Weight | Line Height | Token |
|---|---|---|---|---|---|
| Username (UserCard) | Roboto Condensed | 14px | 400 | 20px | `--default-font`, `--size-default`, `--lh-default` |
| ServerSiteName | Roboto Condensed | 14px | 400 | 20px | `--default-font`, `--size-default`, `--lh-default` |
| Alert count text | Roboto Condensed | 14px | 400 | 20px | `--default-font`, `--size-default`, `--lh-default` |
| Window title (TitleBar) | Roboto Condensed | 14px | 400 | 20px | `--default-font`, `--size-default`, `--lh-default` |

---

## 5. Icon References (Mobius-System-Icons Font Glyphs)

All icons use the **Mobius-System-Icons** font (`--font-icon`). Glyph codes extracted via fonttools from `mobius-system-icons.ttf`.

### 5.1 Top Bar Icons

| XAML resource key | Font glyph name | Codepoint | CSS content | Used in |
|---|---|---|---|---|
| `Icon_Notifications` | Notifications | U+E55D | `\E55D` | NotificationToggleButton |
| `Icon_Status_CriticalSm` | Status_CriticalSm | U+E441 | `\E441` | NotificationToggleButton (critical state overlay) |
| `Icon_Windows10_FullScreen` | Windows10_FullScreen | U+EA05 | `\EA05` | Window chrome |
| `Icon_Windows10_NormalScreen` | Windows10_NormalScreen | U+EA02 | `\EA02` | Window chrome (exit fullscreen) |
| `Icon_Windows10_Minimize` | Windows10_Minimize | U+EA03 | `\EA03` | Window chrome |
| `Icon_Windows10_Maximize` | Windows10_Maximize | U+EA04 | `\EA04` | Window chrome |
| `Icon_Windows10_Restore` | Windows10_Restore | U+EA01 | `\EA01` | Window chrome |
| `Icon_Windows10_Close` | Windows10_Close | U+EA06 | `\EA06` | Window chrome |

### 5.2 Popup Panel Icons

| XAML resource key | Font glyph name | Codepoint | CSS content | Used in |
|---|---|---|---|---|
| `Icon_DocumentExclamation` | **NO MATCH** | -- | -- | Report an Issue button |
| `Icon_UserChangePassword` | Change_Password | U+E51A | `\E51A` | Change Password button |
| `Icon_UserLogout` | Logout | U+E522 | `\E522` | Sign Out button |
| `Icon_UserSwitch` | Switch_User | U+E303 | `\E303` | Switch User button |
| `Icon_Arrow_DirectionRight` | Arrow_DirectionRight | U+E012 | `\E012` | Login submit arrow |

> **WARNING: `Icon_DocumentExclamation` has no match in Mobius-System-Icons font.**
> Closest candidates: `Report_Error` (U+E409), `Report_Error_Alt` (U+E439), `Document` (U+E748).
> The XAML uses a Path.Data geometry for this icon. Needs manual review to determine which font glyph best matches, or this icon may require an inline SVG fallback.

### 5.3 Icon Rendering Pattern

```html
<!-- Standard icon (20x20, centered) -->
<span class="icon" aria-hidden="true">&#xE55D;</span>

<!-- CSS -->
.icon {
  font-family: var(--font-icon);
  font-size: var(--size-icons); /* 20px */
  line-height: var(--lh-icons); /* 20px */
}
```

---

## 6. Structural Notes

### MainWindow.xaml: ShowTitleBar="False"
The UserWindow template has a TitleBar row (Height="50"), but MainWindow sets `ShowTitleBar="False"` (line 28). This means the UserWindow's own TitleBar is **collapsed** via `TitleBarCollapsed` visual state. The 50px top bar visible in the app is the **custom Grid** at MainWindow.xaml line 124, NOT the UserWindow TitleBar.

### Window Controls Overlay
The window control buttons (FullScreen, Minimize, Maximize, Close) are rendered by the UserWindow template StackPanel (line 77), which sits at `Grid.Row="0" Grid.RowSpan="2"` with `HorizontalAlignment="Right" VerticalAlignment="Top"`. This means they overlay on top of MainWindow's content. The Rectangle at MainWindow.xaml line 195 (BackgroundInvertStrongBrush fill) acts as a background placeholder matching the chrome buttons' area.

### UserDetailsAndSwitchControl: Collapsed vs Visible
The entire right-side Grid (line 135) only appears when `LoginVM` is not null (line 147, NullToCollapsedConverter). Pre-login, it's hidden.

### NotificationToggleButton HorizontalAlignment
The button is `HorizontalAlignment="Left"` within Grid.Column="1" (line 158). This means it butts up against the UserDetailsAndSwitchControl on the left side.

---

## 7. Popup Panel (UserDetailsAndSwitchControl Expanded)

> **In scope.** Avatar is only shown in popup, not in the collapsed bar state.
> **Animation:** CSS-only (no JS). Use `transition` for the 450ms expand/slide.

### 7.1 Popup Container
| Property | Value | Source |
|---|---|---|
| Width | **220px** | UserDetailsAndSwitchControl.xaml lines 86, 102, 125 |
| Margin (inner grid) | **20px** | UserDetailsAndSwitchControl.xaml line 103 |
| Background | `--BackgroundStrong` (#FFFFFF) | UserDetailsAndSwitchControl.xaml line 110 |
| Shadow opacity | `Mobius_UI_Resources_Sizes_Doubles_ShadowOpacity` | UserDetailsAndSwitchControl.xaml line 107 |
| Shadow element margin | **2px** | UserDetailsAndSwitchControl.xaml line 108 |
| PopupAnimation | Fade | UserDetailsAndSwitchControl.xaml line 96 |

### 7.2 Header Banner (Online Status)
| Property | Value | Source |
|---|---|---|
| Height | **92px** | UserDetailsAndSwitchControl.xaml line 129 |
| Background | `--SelectionSecondary` (#0078A4) | UserDetailsAndSwitchControl.xaml line 134 |
| Padding | **24px horizontal** | UserDetailsAndSwitchControl.xaml line 137 |
| "Online" text foreground | `--SelectionForeground` (#FFFFFF) | UserDetailsAndSwitchControl.xaml line 142 |
| Logged-in time text | `--SelectionForeground` (#FFFFFF) | UserDetailsAndSwitchControl.xaml line 147 |
| Logged-in time style | HeadingMd (24px, `--size-hdrMd`) | UserDetailsAndSwitchControl.xaml line 148 |

### 7.3 Menu Items
Each menu item follows the same pattern. All items have:
- Margin: **24px horizontal, 17px vertical** (UserDetailsAndSwitchControl.xaml line 161, 189, 218, 244)
- Icon size: **24x24px** (UserDetailsAndSwitchControl.xaml lines 173-174, 202-203, 229-230, 258-259)
- Icon-to-text gap: **6px left margin** on TextBlock (lines 177, 205, 233, 262)
- Style: `LinkButton` style
- Separator: `EdgeBorderHorizontal` between items (lines 184, 211, 240)

| Menu item | Icon XAML key | Font glyph | Codepoint | Visibility |
|---|---|---|---|---|
| Report an Issue | `Icon_DocumentExclamation` | **NO MATCH** (see warning) | -- | Always |
| Change Password | `Icon_UserChangePassword` | Change_Password | U+E51A | Always |
| Sign Out | `Icon_UserLogout` | Logout | U+E522 | Always |
| Switch User | `Icon_UserSwitch` | Switch_User | U+E303 | Conditional: `CanSwitchUser` (line 248) |

### 7.4 UserCard Avatar
| Property | Value | Source |
|---|---|---|
| Location | **Popup only** (not visible in collapsed bar) | Decision: avatar in popup |
| Element | `<Image>` bound to `Avatar` property | UserCard.xaml line 26 |
| Grid column | Column 1 (after 4px status bar) | UserCard.xaml line 15 |

### 7.5 Expand/Collapse Animation (CSS-only)
| Property | Value | Source |
|---|---|---|
| ExpanderItem direction | ExpandLeft | UserDetailsAndSwitchControl.xaml line 69 |
| Animation duration | **450ms** | UserDetailsAndSwitchControl.xaml line 68 |
| Expanded width | **215px** | UserDetailsAndSwitchControl.xaml line 72 |
| CSS approach | `max-width` transition from 0 to 215px, `overflow: hidden` | CSS-only decision |

---

## 8. HTML Element Plan

```html
<!-- XAML: MainWindow.Grid (line 124) — Top Bar -->
<header class="global-nav">

  <!-- XAML: UserDetailsAndSwitchControl (line 149) -->
  <div class="global-nav__profile">
    <!-- XAML: Rectangle (connection status bar, line 51) — 4px wide -->
    <div class="global-nav__connection-status global-nav__connection-status--connected"></div>

    <!-- XAML: StackPanel (line 39) — username + site stacked vertically -->
    <div class="global-nav__profile-text">
      <!-- XAML: UserCard username (line 42-44) -->
      <span class="global-nav__username">AzureAD/Name</span>
      <!-- XAML: ServerSiteName TextBlock (line 46-48) -->
      <span class="global-nav__site-name">Site Name</span>
    </div>

    <!-- XAML: ExpanderItem (line 66) — expands 215px left on click, CSS-only 450ms transition -->
    <!-- XAML: ToggleButton (line 74) — click target spans full profile area -->
  </div>

  <!-- ============================================================ -->
  <!-- XAML: Popup (line 89) — UserDetailsAndSwitchControl popup     -->
  <!-- 220px wide, positioned below profile, fade animation          -->
  <!-- ============================================================ -->
  <div class="global-nav__popup" aria-hidden="true">
    <!-- XAML: BoxShadow (line 105) -->
    <!-- XAML: Grid (line 109) — popup content container -->

    <!-- XAML: Border row 0 (line 132) — Online status header, 92px tall -->
    <div class="global-nav__popup-header">
      <span class="global-nav__popup-online-label">Online</span>
      <span class="global-nav__popup-time">0:00:00</span>
    </div>

    <!-- XAML: StackPanel row 1 (line 154) — Menu items -->
    <nav class="global-nav__popup-menu">

      <!-- XAML: Report an Issue button (line 159) -->
      <button class="global-nav__popup-item">
        <!-- WARNING: Icon_DocumentExclamation has no font match. Using Report_Error (U+E409) as candidate -->
        <span class="icon" aria-hidden="true">&#xE409;</span>
        <span>Report an Issue</span>
      </button>

      <!-- XAML: EdgeBorderHorizontal (line 184) -->
      <hr class="global-nav__popup-divider" />

      <!-- XAML: Change Password button (line 188) -->
      <button class="global-nav__popup-item">
        <span class="icon" aria-hidden="true">&#xE51A;</span>
        <span>Change Password</span>
      </button>

      <hr class="global-nav__popup-divider" />

      <!-- XAML: Sign Out button (line 215) -->
      <button class="global-nav__popup-item">
        <span class="icon" aria-hidden="true">&#xE522;</span>
        <span>Sign Out</span>
      </button>

      <hr class="global-nav__popup-divider" />

      <!-- XAML: Switch User button (line 244) — conditional: CanSwitchUser -->
      <button class="global-nav__popup-item">
        <span class="icon" aria-hidden="true">&#xE303;</span>
        <span>Switch User</span>
      </button>

    </nav>
  </div>

  <!-- XAML: NotificationToggleButton (line 156) — 62x50px -->
  <button class="global-nav__alert-btn">
    <!-- XAML: _mouseOverElement Border (line 21) — 4px left bar -->
    <!-- XAML: _selectionElement Border (line 28) — 4px left bar -->
    <!-- XAML: _nonCriticalVisualElements Canvas (line 97) — 20x20 icon -->
    <span class="icon global-nav__alert-icon" aria-hidden="true">&#xE55D;</span>
    <!-- XAML: _alertCountVisualElement Canvas (line 123) — offset 12px right, 12px down -->
    <span class="global-nav__alert-count">0</span>
  </button>

  <!-- XAML: Rectangle (line 195) — BackgroundInvertStrong fill, window control placeholder -->

  <!-- XAML: UserWindow.xaml StackPanel (line 77) — Window chrome buttons -->
  <div class="global-nav__window-controls">
    <!-- XAML: WindowFullScreen (line 126) — 50x50 -->
    <button class="window-btn window-btn--fullscreen" aria-label="Full screen">
      <span class="icon" aria-hidden="true">&#xEA05;</span>
    </button>
    <!-- XAML: WindowMinimize (line 159) — 50x50 -->
    <button class="window-btn window-btn--minimize" aria-label="Minimize">
      <span class="icon" aria-hidden="true">&#xEA03;</span>
    </button>
    <!-- XAML: WindowMaximize (line 172) — 50x50 -->
    <button class="window-btn window-btn--maximize" aria-label="Maximize">
      <span class="icon" aria-hidden="true">&#xEA04;</span>
    </button>
    <!-- XAML: WindowClose (line 205) — 50x50, red hover -->
    <button class="window-btn window-btn--close" aria-label="Close">
      <span class="icon" aria-hidden="true">&#xEA06;</span>
    </button>
  </div>
</header>
```

---

## 9. Resolved Decisions

| # | Question | Decision |
|---|---|---|
| 1 | Icon rendering | **Font glyphs from Mobius-System-Icons.** All icons mapped to codepoints. See Section 5. |
| 2 | UserCard Avatar | **Popup only.** Avatar is not visible in collapsed bar state. |
| 3 | ExpanderItem animation | **CSS-only.** 450ms `max-width` transition, no JavaScript. |
| 4 | Popup panel | **In scope.** Full popup with menu items included. See Section 7. |

## 10. Resolved Details (EdgeBorderHorizontal & BoxShadow)

### EdgeBorderHorizontal (popup dividers)
Source: DefaultControls.xaml line 787

| Property | Value | Source |
|---|---|---|
| Height | `Mobius_UI_Resources_Sizes_Doubles_Size1` = **1px** | DefaultControls.xaml line 793 → `--size-1` |
| Background | `--InnerLines` (#E0E6E6) | DefaultControls.xaml line 794 → `InnerLinesBrush` |
| CSS | `border-top: var(--size-1) solid var(--InnerLines)` | |

### BoxShadow (popup drop shadow)
Source: BoxShadow.cs, BoxShadow.xaml, UserDetailsAndSwitchControl.xaml line 105

The WPF BoxShadow is a custom 9-slice grid with radial/linear gradient fills simulating a shadow. For CSS, approximate as:

| Property | Value | Source |
|---|---|---|
| CellSize (default) | **20px** | BoxShadow.cs line 10 |
| EdgeMargin (default) | **-20px** | BoxShadow.cs line 11 |
| Grid Opacity | **0.5** | BoxShadow.xaml line 21 |
| ShadowOpacity (LightTheme) | **0.1** | LightTheme.xaml line 2 |
| Effective opacity | 0.5 * 0.1 = **0.05** | BoxShadow.xaml Opacity * parent Opacity setter |
| Margin on usage | **2px** | UserDetailsAndSwitchControl.xaml line 108 |
| CSS equivalent | `box-shadow: 0 2px 20px rgba(0, 0, 0, 0.13)` | `--ShadowElements` token = rgba(0,0,0,0.133) |

> The `--ShadowElements` token (rgba(0,0,0,0.133)) from LightTheme.css is the best single-value CSS match for the composite BoxShadow effect. Use `box-shadow: 0 2px 20px var(--ShadowElements)`.

---

## 11. Remaining Open Questions

1. **`Icon_DocumentExclamation` font match.** No exact glyph in Mobius-System-Icons. Best candidate is `Report_Error` (U+E409). Need visual comparison to confirm, or this icon falls back to inline SVG from the XAML PathGeometry at Icons.xaml line 98.
