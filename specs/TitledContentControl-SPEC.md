# TitledContentControl SPEC (50px panel header)

> The smallest reusable header in mobius-master. A 50px title bar docked to the top of a content panel, with optional back/navigation button and optional editable title. Used by Command & Control asset list, PathBuilder, MapBuilder, Playlist, UserAssetManagement, InternalNotificationPanel, ModeConfigurationSetup.

Source: `Common/Asi.CommonControls.Client.UI/TitledContentControl.xaml`

---

## 1. Component Hierarchy (XAML Source Map)

```
TitledContentControl.xaml
  └─ DockPanel RootElement [line 15]
       ├─ DockPanel TitleBar [lines 16-67]  Height="50", Dock=Top, Background={TemplateBinding Background}
       │    ├─ Rectangle (24px transparent left spacer) [lines 23-28]  Width="24", Dock=Left
       │    ├─ Button NavigationButton [lines 29-44]  Width="44", Margin.Left="-12", Dock=Left, IconButton style
       │    │    └─ Path NavigationButtonIcon [lines 39-43]  Data=NavigationButtonIconData (default Icon_Arrow_DirectionLeft, line 71)
       │    ├─ TextBlock StaticTitle [lines 45-52]  HeadingSm, CharacterEllipsis, fills remaining dock space
       │    └─ FieldInput EditableTitle [lines 53-66]  Width="333", Margin="-20,0,-50,0", InlineFieldInput style
       └─ ContentPresenter [line 68]  (panel body — not part of this component)
```

---

## 2. Resolved dimensions

| Element | Value | Source |
|---|---|---|
| TitleBar height | 50px | TitledContentControl.xaml:18 |
| TitleBar background | `--BackgroundInvertStepTwo` | line 73 (default style setter) |
| Left spacer | 24px | line 25 |
| NavigationButton width | 44px | line 31 (= `--touch`) |
| NavigationButton margin-left | -12px | line 32 → net left edge sits at 12px |
| NavigationButton min-height | 44px | DefaultControls.xaml:2782 (IconButton MinHeight = TouchSize) |
| NavigationButton padding | 0 3px vertical | DefaultControls.xaml:2783 (`Padding="0,3"`, applied as Margin on `_templateRoot`, line 1326) |
| Icon glyph | `\E013` Arrow_DirectionLeft | Mobius-System-Icons.woff cmap, name matches `Icon_Arrow_DirectionLeft` (line 71) |
| Icon size | 20px | `--icon` (Icon standard, Sizes) — Path has no explicit size in XAML, inherits default icon size |
| Title font | HeadingSm: Light 18px / 22px, header-font | Typography.xaml:59-63 → `--font-hdrSm` |
| Title alignment | VerticalAlignment=Center, HorizontalAlignment=Left | Typography.xaml:26-29 (Font_DefaultAlignment) |
| Title trimming | CharacterEllipsis | line 50 |
| Title foreground | `{TemplateBinding Foreground}` — set per usage | ModeCommandAndControl.xaml:342 uses `ForegroundInvertPrimary` |
| Editable title width | 333px | line 57 |
| Editable title margin | -20px left, -50px right | line 58 |
| Hover icon color | `--MouseOverPrimary` | DefaultControls.xaml:1352 (IconButton MouseOver state) |
| Hover transition | 500ms (mouse-out), 160ms (mouse-over) | DefaultControls.xaml:1346,1353 |

### Horizontal layout contract (DockPanel, left to right)

```
[24 spacer][ -12 ][44 NavigationButton][ StaticTitle → fills ]
            └─ net: button occupies x=12..56
```
With ShowNavigationButton=False the title starts at x=24.

Editable state: FieldInput is 333px wide with `-20,0,-50,0` margin, so it starts 20px *left* of where the static title would start (x=4 with no nav button, x=36 with) and overhangs the right edge by 50px. That negative-right margin is in Master; preserved here.

---

## 3. States and variants

| State | XAML property | Default | Notes |
|---|---|---|---|
| Title shown / hidden | `ShowTitle` | True | Whole TitleBar collapses when false (line 21). Omit element. |
| Navigation button | `ShowNavigationButton` | False | line 70 |
| Editable title | `IsTitleEditable` | False | Swaps StaticTitle ↔ EditableTitle (lines 51, 63) |
| Nav button hover | IconButton VisualState MouseOver | — | Foreground → MouseOverPrimary |
| Nav button pressed | IconButton VisualState Pressed | — | Same color as hover (line 1358) |

Not in Master: no divider line under the bar, no right-side actions slot, no breadcrumbs. Don't add them.

---

## 4. Element mapping

| HTML | XAML |
|---|---|
| `header.titled-header` | DockPanel `TitleBar` |
| `button.titled-header__nav` | Button `NavigationButton` |
| `span.titled-header__nav-icon` | Path `NavigationButtonIcon` |
| `h2.titled-header__title` | TextBlock `StaticTitle` |
| `input.titled-header__title-input` | FieldInput `EditableTitle` (InlineFieldInput / OnDemandTextBox) |

The 24px Rectangle spacer is expressed as `padding-left: 24px` on the header. The XAML element only exists because DockPanel has no Padding (its own x:Name says so, line 24). The -12 margin on the button is kept as a real negative margin so the math reads the same as the XAML.
