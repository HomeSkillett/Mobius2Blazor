# PageHeader SPEC (132px mode/page header band)

> The page-level header used at the top of configuration and mode screens. Not a control in Master; it is a repeated Border + TextBlock convention keyed off `Mobius_UI_Resources_Sizes_Header_Height`. 13 usages, all identical except two documented variants.

Canonical source: `Plugins/Common/Triggers/Asi.Triggers.Client/UI/TriggerManagerControl.xaml` lines 24-35
Height token: `Common/Asi.Resources.Client.UI/Themes/Sizes/SizesNew.xaml:49` → `--panel-header-height: 132px`

---

## 1. Component Hierarchy (XAML Source Map)

```
TriggerManagerControl.xaml (and 10 others, same shape)
  └─ Grid
       └─ Border [lines 24-28]  Grid.Row=0, Height=Header_Height (132), Background=BackgroundStrongStepOne
            └─ TextBlock [lines 29-34]  VerticalAlignment=Center, Margin.Horizontal=36, Style=HeadingMd

PlanOrganizer.xaml (variant A: divider) [lines 41-61]
  ├─ Border (same as above, title wrapped in a horizontal StackPanel — no visual difference)
  └─ Border ShadowEdgeBorderHorizontal [lines 58-61]  Grid.Row=0, VerticalAlignment=Bottom

ModeDiagnostics.xaml (variant B: status + back) [lines 35-108]
  └─ Grid  Height=Header_Height, Background=BackgroundStrongStepOne
       ├─ Col 0: StatusBorder [lines 44-47]  BorderThickness.Left=12, color from StatusIndicator state
       ├─ Col 1: ExpanderItem _backButtons [lines 48-85]  Margin.Left=24, ExpandLeft, IsOpened=False
       │    └─ Grid Margin.Right=12
       │         ├─ Button _backToAsset (SimpleIconButton, Icon_Arrow_DirectionLeft) [lines 56-70]  Collapsed
       │         └─ Button _backToSite  (SimpleIconButton, Icon_Arrow_DirectionLeft) [lines 72-84]  Visible
       └─ Col 2: StackPanel vertical, VerticalAlignment=Center [lines 86-107]
            ├─ TextBlock ServerName  HeadingMd, ForegroundStrong
            ├─ TextBlock ConnectionsSummary  default style, ForegroundStrong (when no asset selected)
            └─ TextBlock SelectedAsset.Name  default style, ForegroundStrong (when asset selected)
```

---

## 2. Resolved dimensions

| Element | Value | Source |
|---|---|---|
| Band height | 132px | SizesNew.xaml:49 → `--panel-header-height` |
| Band background | `--BackgroundStrongStepOne` | TriggerManagerControl.xaml:27 |
| Title horizontal margin | 36px left and right | TriggerManagerControl.xaml:31 (`Margin.Horizontal="36"`) → `--size-36` |
| Title vertical | centered | line 30 |
| Title font | HeadingMd: Light 24px / 30px, header-font | Typography.xaml:53-57 → `--font-hdrMd` |
| Title foreground | not set → inherits `--ForegroundPrimary` | Diagnostics explicitly sets `--ForegroundStrong` (ModeDiagnostics.xaml:93) |
| Title trimming | CharacterEllipsis | Typography.xaml:33 (default TextBlock style) |
| Divider (variant A) | 1px, `--InnerLineDividers`, bottom-aligned, not hit-testable | DefaultControls.xaml:805-808. **Note: InnerLineDividers is `rgba(0,0,0,0)` in LightTheme, so the divider is invisible in Light.** It is still in Master. |
| Status border (variant B) | 12px left stripe | ModeDiagnostics.xaml:45 (`BorderThickness.Left="12"`) → `--size-12` |
| Status border colors | Unknown=InnerLines, Critical=InformationRed, Warning=InformationOrange, Caution=InformationYellow, OK=InformationGreen | StatusBorder.xaml:32-56 |
| Status border render | solid stroke + 50% opacity fill of same color | StatusBorder.xaml:17-25 (at 12px left-only thickness the fill is hidden behind the stroke; stroke color is what you see) |
| Status fade | 500ms | GeneralFadeDuration → `--transition-fade` |
| Back-button group margin | 24px left, 12px right | ModeDiagnostics.xaml:52, 60 |
| Back button | SimpleIconButton: MinHeight 44, Padding 0,3, ForegroundPrimary | DefaultControls.xaml:2768-2770 |
| Back icon | `\E013` Arrow_DirectionLeft | font cmap, matches `Icon_Arrow_DirectionLeft` (ModeDiagnostics.xaml:66, 81) |
| Subtitle font | default TextBlock (no style) → `--font-default` | ModeDiagnostics.xaml:98, 103 |

### Horizontal contract

Default: `[36][ title ... ][36]`
Diagnostics: `[12 status][24][44 back][12][ title stack ... ]` → title text starts at x=92. There is no 36 margin on the Diagnostics title; the 24+44+12 chain replaces it.

---

## 3. States and variants

| Variant | Where | What changes |
|---|---|---|
| Default | 11 screens (Triggers, InCab, Mqtt, Joysticks, TeleopMapping, OfflinePlanner, AreaCoverage, DumpScripts, MonitoredAssets, TestAutomation, JausUdp) | none |
| With divider | PlanOrganizer | 1px bottom edge (`ShadowEdgeBorderHorizontal`) |
| Status + back + subtitle | ModeDiagnostics | 12px status stripe, back button, 2-line title stack, ForegroundStrong |
| Status stripe color | Diagnostics only | Unknown / OK / Caution / Warning / Critical |
| Back button collapsed | Diagnostics `_backToAsset` | ExpanderItem IsOpened=False hides the group entirely at site level |

Not in Master: no breadcrumbs, no search, no filter bar, no right-side action area inside the band. Every screen puts its tools in the row *below* the header (e.g. TriggerManagerControl Grid.Row=1). Don't add them to the header.

---

## 4. Element mapping

| HTML | XAML |
|---|---|
| `header.page-header` | Border (TriggerManagerControl.xaml:24) / Grid (ModeDiagnostics.xaml:35) |
| `h1.page-header__title` | TextBlock HeadingMd |
| `.page-header--divider::after` | Border ShadowEdgeBorderHorizontal (PlanOrganizer.xaml:58) |
| `span.page-header__status` | StatusBorder (ModeDiagnostics.xaml:44) |
| `button.page-header__back` | Button _backToSite (SimpleIconButton) |
| `i.page-header__back-icon` | Path Icon_Arrow_DirectionLeft |
| `div.page-header__title-stack` | StackPanel (ModeDiagnostics.xaml:86) |
| `p.page-header__subtitle` | TextBlock ConnectionsSummary / SelectedAsset.Name |
