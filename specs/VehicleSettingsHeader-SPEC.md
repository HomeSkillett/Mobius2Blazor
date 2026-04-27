# SPEC: Vehicle Settings Header

**Scope:** The top region of the Vehicle Setup/Configuration view — everything above the MasterDetailControl list.

**Source files (mobius-master/):**

| File | Lines | Role |
|------|-------|------|
| `Asi.Miscellaneous.Client.UI/ModeControls/Children/VehicleSetupConfigurationControl.xaml` | 111–265 | Parent wrapper: background, spacing, "Vehicle profile…" toggle |
| `Asi.Miscellaneous.Client.UI/ModeControls/VehicleInformationControl.xaml` | 1–193 | Vehicle icon + name + status labels + linked asset row |
| `Asi.CommonControls.Client.UI/ActivityStateCircle.xaml` | 1–129 | Circular status ring (ResourceDictionary ControlTemplate) |

---

## 1. Structural Nesting (XAML → HTML mapping)

```
VehicleSetupConfigurationControl (Grid, 3 rows)
└── Row 0: Border (BackgroundStrongStepOne)
    └── Border (Margin 0,52,0,0)
        └── Border (Margin = ModeSectionTitleMargin → 36px left, 33px bottom)
            └── StackPanel (VerticalAlignment=Bottom)
                ├── Grid (MinWidth=100, Background=BackgroundInvertStepOne, ClipToBounds)
                │   └── VehicleInformationControl
                │       └── Border (Height=100, Background=BackgroundBrush)
                │           └── DockPanel "TheDoc"
                │               ├── [DockLeft] Border (Margin=4, CornerRadius=100000 → full circle)
                │               │   └── Grid
                │               │       ├── Viewbox (Margin=4)
                │               │       │   └── ActivityStateCircle (240×240, BorderThickness=20, CornerRadius=100000)
                │               │       └── Viewbox (Margin=8)
                │               │           └── Grid (RotateTransform -135°)
                │               │               └── ContentControl (Asset.Icon)
                │               └── [DockLeft] StackPanel (VerticalAlignment=Center)
                │                   ├── TextBlock "AssetName" (HeadingLg style, Margin.Horizontal=12)
                │                   ├── StackPanel (Orientation=Horizontal, Margin 0,5,0,0)
                │                   │   ├── TextBlock "ModeState" (HeadingSm style, Margin.Horizontal=12)
                │                   │   ├── TextBlock "VehicleStatus" (HeadingSm style, Margin.Horizontal=12)
                │                   │   └── TextBlock "VehicleStatusToolTip" (HeadingSm style, Margin.Horizontal=12)
                │                   └── Grid "LinkedAsset" (conditional visibility)
                │                       ├── Path Icon_Link (12×12, Margin 14,0,6,0)
                │                       └── TextBlock "LinkedAssetNames"
                └── Grid (Height=TouchSize=44px, conditional visibility)
                    └── ExpanderItem "_profileApplyRegion"
                        └── StackPanel (Horizontal)
                            ├── ExpanderItem "_profileExpander" (collapsed: profile select UI)
                            └── ExpanderItem (collapsed inverse: "Vehicle profile..." ToggleButton)
```

**Nesting depth: 8 levels.** Must be preserved per project rules.

---

## 2. Resolved Dimensions & Spacing

### VehicleSetupConfigurationControl (lines 111–265)

| XAML Element | Property | XAML Value | CSS Token | Resolved |
|-------------|----------|------------|-----------|----------|
| Grid Row 0 | height | Auto | — | content-sized |
| Grid Row 1 | height | SectionToSectionDistance | `--spacing-section-to-section` | 40px |
| Grid Row 2 | height | * | — | flex: 1 |
| Border (line 118) | background | BackgroundStrongStepOneBrush | `--BackgroundStrongStepOne` | rgba(240,240,240,1) |
| Border (line 122) | margin | 0,52,0,0 | **hardcoded** | margin-top: 52px |
| Border (line 123) | margin | ModeSectionTitleMargin | `--margin-mode-section-title` | 0 0 33px 36px |
| Grid (line 126) | min-width | 100 | **hardcoded** | min-width: 100px |
| Grid (line 127) | background | BackgroundInvertStepOneBrush | `--BackgroundInvertStepOne` | rgba(255,255,253,1) |
| Grid (line 140) | height | TouchSize | `--touch` | 44px |

### VehicleInformationControl (lines 20–193)

| XAML Element | Property | XAML Value | CSS Token | Resolved |
|-------------|----------|------------|-----------|----------|
| Border (line 20) | height | 100 | **hardcoded** | height: 100px |
| Border (line 20) | background | BackgroundBrush (bound) | `--BackgroundStrongStepOne` (passed from parent line 133) | rgba(240,240,240,1) |
| Icon Border (line 25) | margin | 4 | `--spacing-label-to-control-sm` (closest: 4px) | 4px |
| Icon Border (line 30) | corner-radius | 100000 | — | border-radius: 50% |
| Viewbox outer (line 45) | margin | 4 | same as above | 4px |
| ActivityStateCircle (line 46) | width/height | 240 | **hardcoded (inside Viewbox)** | scales to 84px (240 × [92-8]/240) |
| ActivityStateCircle (line 50) | border-thickness | 20 | **hardcoded** | border-width: 7px (20/240 × 84) |
| Viewbox inner (line 54) | margin | 8 | **hardcoded** | icon area = 76px (92-16), inset 4px from circle edge |
| Icon Grid (line 56) | rotate | -135° | — | transform: rotate(-135deg) |
| AssetName TextBlock (line 71) | margin-horizontal | 12 | `--size-12` | 0 12px |
| AssetName TextBlock (line 80) | line-height | 36 | `--lh-hdrLg` (closest: 40px) | 36px **hardcoded** |
| AssetName TextBlock (line 82) | style | HeadingLg | `--size-hdrLg` + `--header-font` | font: 400 36px/36px var(--header-font) |
| AssetName TextBlock (line 73) | max-height | 72 | **hardcoded** | max-height: 72px (2 lines) |
| Status StackPanel (line 98) | margin | 0,5,0,0 | **hardcoded** | margin-top: 5px |
| ModeState TextBlock (line 100) | margin-horizontal | 12 | `--size-12` | 0 12px |
| ModeState TextBlock (line 108) | line-height | 18 | `--size-hdrSm` (font=18px) | 18px |
| ModeState TextBlock (line 111) | style | HeadingSm | `--size-hdrSm` + `--default-font` | font: 400 18px/18px |
| ModeState TextBlock (line 102) | max-height | 24 | `--size-24` | 24px |
| VehicleStatus TextBlock (line 117) | same as ModeState | — | — | identical styling |
| VehicleStatusToolTip TextBlock (line 134) | same as ModeState | — | — | identical styling |
| LinkedAsset Grid (line 152) | margin | 0 | — | 0 |
| Link Icon Path (line 165) | width/height | 12 | `--icon-sm` | 12px |
| Link Icon Path (line 168) | margin | 14,0,6,0 | **hardcoded** | margin: 0 6px 0 14px |
| Link TextBlock (line 176) | margin-horizontal | 0 | — | 0 |

### ActivityStateCircle (ResourceDictionary)

| XAML Element | Property | XAML Value | CSS Token | Resolved |
|-------------|----------|------------|-----------|----------|
| Outer Border | corner-radius | 100000 | — | border-radius: 50% |
| Outer Border | background | MapBackgroundBrush | `--MapBackground` | rgba(245,245,245,1) |
| Inner colored Border | background | Foreground (bound) | per state | see state table |
| Inner colored Border | opacity | 0.5 | — | opacity: 0.5 |
| Ring Border | border-brush | Foreground (bound) | per state | see state table |
| Ring Border | border-thickness | (TemplateBinding) | 20 (from parent) | 20px (pre-scale) |

**ActivityState color mapping:**

| State | Color Token | CSS Variable | Resolved |
|-------|------------|-------------|----------|
| Critical (E-stop) | VehicleEStopOutline | `--VehicleEStopOutline` | rgba(237,41,57,1) |
| Warning | VehicleConditionalStopOutline | `--VehicleConditionalStopOutline` | rgba(255,128,0,1) |
| Normal | VehicleSelectionOutline | `--VehicleSelectionOutline` | rgba(0,159,218,1) |
| Thinking | InformationPurple | `--InformationPurple` | rgba(196,153,247,1) |
| Inactive | VehicleSelectionOutline | `--VehicleSelectionOutline` | rgba(0,159,218,1) |
| Off | VehicleNoHeadingOutline | `--VehicleNoHeadingOutline` | rgba(112,112,112,1) |
| Hidden | Transparent | — | display: none or opacity: 0 |

---

## 3. Color Token Map (used in this component)

| XAML Resource | CSS Variable | Value |
|--------------|-------------|-------|
| BackgroundStrongStepOneBrush | `--BackgroundStrongStepOne` | rgba(240,240,240,1) |
| BackgroundInvertStepOneBrush | `--BackgroundInvertStepOne` | rgba(255,255,253,1) |
| ForegroundPrimaryBrush | `--ForegroundPrimary` | rgba(85,85,85,1) |
| ForegroundStrongBrush | `--ForegroundStrong` | rgba(0,43,69,1) |
| InformationBlueBrush | `--InformationBlue` | rgba(0,159,218,1) |
| MapBackgroundBrush | `--MapBackground` | rgba(245,245,245,1) |

---

## 4. Typography

| Role | XAML Style | Font | Size | Weight | Line-height | CSS Vars |
|------|-----------|------|------|--------|-------------|----------|
| Vehicle name | HeadingLg | Roboto | 36px | 400 (Normal) | 36px | `--size-hdrLg`, `--header-font` |
| Mode/Status labels | HeadingSm | Roboto Condensed | 18px | 400 | 18px | `--size-hdrSm`, `--default-font` |
| "Vehicle profile…" | LinkButton style | Roboto Condensed | 14px | 400 | 20px | `--size-default`, `--default-font` |
| Linked asset name | (default TextBlock) | Roboto Condensed | 14px | 400 | 18px | `--size-default`, `--default-font` |

---

## 5. Foreground/Background Binding Flow

VehicleInformationControl exposes three DependencyProperties bound from the parent:

| Property | Set in VehicleSetupConfigurationControl (line) | Value |
|----------|-----------------------------------------------|-------|
| ForegroundBrush | 132 | ForegroundPrimaryBrush → `--ForegroundPrimary` |
| BackgroundBrush | 133 | BackgroundStrongStepOneBrush → `--BackgroundStrongStepOne` |
| SelectionBrush | 134 | Transparent |

All text in VehicleInformationControl uses `ForegroundBrush` → `--ForegroundPrimary`.

---

## 6. "Vehicle profile…" Toggle Region

**Visibility:** Requires three conditions all true:
- `HasAdvancedPermission` = true
- `VehicleAiConfiguration` ≠ null
- `AssetConfigurationProfile` ≠ null

**Default (collapsed) state:** Shows a ToggleButton styled as LinkButton with text "Vehicle profile…"
- Height: `--touch` (44px)
- Text color: `--ForegroundAction` (link blue, rgba(0,117,161,1))

**Expanded state:** Shows profile selection ComboBox + Export/Store buttons + View Library link. This is complex interactive behavior — for the static HTML conversion, we render only the collapsed "Vehicle profile…" link state.

---

## 7. Open Questions / Decisions Needed

1. **Vehicle icon content:** `Asset.Icon` is a runtime-bound ContentControl. For the HTML mockup, we need a placeholder image or the actual vehicle SVG. What should we use?

2. **Linked asset row:** This is conditionally visible (`HasLinkedAsset`). Should we include it in the HTML as a visible element, or omit it from the first pass?

3. **"Vehicle profile…" link:** Should we render just the collapsed toggle (matching the screenshot), or also stub out the expanded profile selection UI?

4. **VehicleStatusToolTip (3rd status label):** In the screenshot, only "Autonomous" and "E-stop" are visible. The XAML has a third TextBlock for `VehicleStatusToolTip`. Should we include it as a hidden/empty element?

---

## 8. Hardcoded Values Requiring Justification

| Value | Source | XAML Line |
|-------|--------|-----------|
| 100px (Border height) | VehicleInformationControl.xaml | Line 21 |
| 52px (top margin) | VehicleSetupConfigurationControl.xaml | Line 122 |
| 240×240 (circle size) | VehicleInformationControl.xaml | Lines 47–48 |
| 20 (border thickness) | VehicleInformationControl.xaml | Line 50 |
| -135° (icon rotation) | VehicleInformationControl.xaml | Line 57 |
| 72px (name max-height) | VehicleInformationControl.xaml | Line 73 |
| -360 (otherWidths offset) | VehicleInformationControl.xaml | Line 88 |
| 36px (name line-height) | VehicleInformationControl.xaml | Line 80 |
| 5px (status row margin-top) | VehicleInformationControl.xaml | Line 98 |
| 14px, 6px (link icon margin) | VehicleInformationControl.xaml | Line 168 |
| 100px (grid min-width) | VehicleSetupConfigurationControl.xaml | Line 126 |
