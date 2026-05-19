# ResizeExpander SPEC (Horizontal Toggle)

> The toggle button that shows/hides the action drawer (side panel). This spec covers the **horizontal** template variant only — the arrow toggle + resizable drawer that slides content in from the left.

---

## 1. Component Hierarchy (XAML Source Map)

```
ResizeExpander.xaml (Asi.CustomControls.Client.UI)
  Template: Mobius_UI_CustomControls_Templates_ResizeExpanderHorizontal
  └─ Grid (root, TabNavigation="Local")
       ├─ Row 0: 50px (header row)
       ├─ Row 1: * (content row)
       ├─ Col 0: PART_ContentColumn (StartSize=324px, MinWidth=0, MaxWidth=626px)
       ├─ Col 1: Auto (GridSplitter)
       └─ Col 2: Auto (ToggleButton)
            │
            ├─ PART_ContentPlacement [Grid, Row 1, Col 0]
            │    ├─ PART_HeaderElement [Border, Height=50, Margin="0,-50,0,0"]
            │    │    └─ HeaderPlacement [ContentControl, Margin="23,4,40,3"]
            │    └─ Border [Background=TemplateBinding, ClipToBounds]
            │         └─ ContentControl (drawer content)
            │              └─ TranslateTransform "TransformElement" X=0
            │
            ├─ ShadowEdgeBorderVertical [Border, Row 0, Col 0]
            │
            ├─ PART_GridSplitter [Row 0-1, Col 1]
            │    Width: 0 (collapsed) → 23px (expanded)
            │    Margin: "-15,0,-8,0" (collapsed) → "-5,0,-18,0" (expanded)
            │
            └─ PART_ContentExpandToggleButton [ToggleButton, Row 0, Col 2]
                 Size: 20x20
                 Margin: "-40,0,0,0"
                 TranslateTransform "TransformToggleButton" X=-10, Y=0
                 └─ ContentControl
                      └─ Path (Icon_Arrow_PointerRight, 20x20, Stretch=None)
```

### XAML Source Files

| File | Purpose |
|---|---|
| `Common/Asi.CustomControls.Client.UI/ResizeExpander.xaml` | All three templates (Horizontal, Vertical, SlimVertical) |
| `Common/Asi.CustomControls.Client.UI/ResizeExpander.cs` | Control logic, animation, drag, snap behavior |
| `Common/Asi.Resources.Client.UI/DefaultControls.xaml` line 2049 | `Mobius_UI_Resources_Templates_ExpandToggleButton` template |
| `Common/Asi.Resources.Client.UI/DefaultControls.xaml` line 2919 | `Mobius_UI_Resources_Styles_ExpandToggleButton` style |
| `Common/Asi.Resources.Client.UI/DefaultControls.xaml` line 775 | `Mobius_UI_Resources_Styles_ShadowEdgeBorderVertical` style |
| `Common/Asi.Resources.Client.UI/Themes/Paths/Icons.xaml` line 58 | `Icon_Arrow_PointerRight` path geometry |
| `Common/Asi.Resources.Client.UI/Languages/EN-US/LocalizedText.xaml` line 28 | Tooltip: "Show/hide this view" |

---

## 2. Resolved Dimensions

### 2.1 Overall Grid Layout (Horizontal Template)

| Property | Value | Source |
|---|---|---|
| Row 0 height | **50px** | ResizeExpander.xaml line 15 |
| Row 1 height | `*` (fill) | ResizeExpander.xaml line 16 |
| Col 0 width (start) | **324px** | ResizeExpander.cs line 31 (`StartSize` default) |
| Col 0 min width | **0** | ResizeExpander.xaml line 19 |
| Col 0 max width | **626px** | ResizeExpander.cs line 32 (`MaxExpanderSize` default) |
| Col 1 width | Auto | ResizeExpander.xaml line 20 |
| Col 2 width | Auto | ResizeExpander.xaml line 21 |

### 2.2 Header (PART_HeaderElement)

| Property | Value | Source |
|---|---|---|
| Height | **50px** | ResizeExpander.xaml line 33 |
| Margin | **0, -50, 0, 0** | ResizeExpander.xaml line 34 (pulls header up into Row 0) |
| Background | TemplateBinding → `--BackgroundInvertStepTwo` | ResizeExpander.xaml line 36, style line 454 |
| Content margin | **23, 4, 40, 3** | ResizeExpander.xaml line 40 |

### 2.3 Toggle Button (PART_ContentExpandToggleButton)

| Property | Value | Source |
|---|---|---|
| Width | **20px** | ResizeExpander.xaml line 86 |
| Height | **20px** | ResizeExpander.xaml line 87 |
| Margin | **-40, 0, 0, 0** | ResizeExpander.xaml line 88 |
| TranslateTransform X | **-10px** | ResizeExpander.xaml line 96 |
| TranslateTransform Y (expanded) | **0px** | ResizeExpander.xaml line 126-129 |
| TranslateTransform Y (collapsed) | **10px** | ResizeExpander.xaml line 149 |
| Background | Transparent | ResizeExpander.xaml line 89 |
| Foreground | `--ForegroundInvertWatermark` rgba(112, 112, 112, 1) | ResizeExpander.xaml line 90 |
| Style | `Mobius_UI_Resources_Styles_ExpandToggleButton` | ResizeExpander.xaml line 91 |
| Tooltip | "Show/hide this view" | LocalizedText.xaml line 28 |

### 2.4 Icon (Arrow)

| Property | Value | Source |
|---|---|---|
| Font family | **Mobius-System-Icon** | User-specified |
| Glyph (content) | **** | User-specified |
| Icon size | **20px** | ResizeExpander.xaml line 100-101 |
| Fill | Inherits from ToggleButton Foreground | ResizeExpander.xaml line 103 |
| Rotation (unchecked/expanded) | **0deg** | DefaultControls.xaml line 2116 |
| Rotation (checked/collapsed) | **180deg** | DefaultControls.xaml line 2121 |

### 2.5 GridSplitter (PART_GridSplitter)

| Property | Value | Source |
|---|---|---|
| Row span | 2 (rows 0-1) | ResizeExpander.xaml line 65 |
| Column | 1 | ResizeExpander.xaml line 66 |
| Width (collapsed) | **23px** (Margin: -15, 0, -8, 0) | ResizeExpander.xaml lines 165-166 |
| Width (expanded) | **23px** (Margin: -5, 0, -18, 0) | ResizeExpander.xaml lines 161-162 |
| Background | Transparent | ResizeExpander.xaml line 72 |
| Keyboard increment | 2px | ResizeExpander.xaml line 73 |

### 2.6 Shadow Edge Border

| Property | Value | Source |
|---|---|---|
| Width | **1px** (`Mobius_UI_Resources_Sizes_Doubles_Size1`) | DefaultControls.xaml line 781, SizesNew.xaml line 17 |
| Background | `--InnerLineDividers` rgba(0, 0, 0, 0) | DefaultControls.xaml line 782 |
| Alignment | Right | DefaultControls.xaml line 783 |
| Position | Row 0, Col 0 | ResizeExpander.xaml lines 78-79 |

---

## 3. Color Token Mapping

| XAML Resource | CSS Variable | Light Theme Value |
|---|---|---|
| `BackgroundInvertStepTwo` | `--BackgroundInvertStepTwo` | rgba(251, 251, 249, 1) |
| `BackgroundInvertStepOne` | `--BackgroundInvertStepOne` | rgba(255, 255, 253, 1) |
| `ForegroundInvertWatermark` | `--ForegroundInvertWatermark` | rgba(112, 112, 112, 1) |
| `ForegroundInvertPrimary` | `--ForegroundInvertPrimary` | rgba(85, 85, 85, 1) |
| `ForegroundPrimary` | `--ForegroundPrimary` | rgba(85, 85, 85, 1) |
| `MouseOverPrimary` | `--MouseOverPrimary` | rgba(12, 208, 255, 1) |
| `InnerLineDividers` | `--InnerLineDividers` | rgba(0, 0, 0, 0) |

---

## 4. Visual States & Animations

### 4.1 ExpanderStates (ResizeExpander.xaml)

| State | What happens | Duration |
|---|---|---|
| **Expanded** | Header → Visible; HeaderPlacement opacity → 1.0 (200ms); TransformElement X: -100 → 0 (100ms QuinticEase); TransformToggleButton X → -10 (100ms), Y → 0 (100ms) | 100-200ms |
| **Collapsed** | Header → Collapsed; HeaderPlacement opacity → 0.0 (200ms); TransformElement X: 0 → -100 (100ms QuinticEase); TransformToggleButton X → -10 (100ms), Y → 10 (200ms) | 100-200ms |

### 4.2 ExpandToggleButton States (DefaultControls.xaml line 2049)

| State Group | State | Effect |
|---|---|---|
| CommonStates | **Normal** | Foreground → template foreground; opacity → 1.0 |
| CommonStates | **MouseOver** | Foreground → `--MouseOverPrimary` (#0CD0FF) |
| CommonStates | **Pressed** | Foreground → template foreground; opacity → 0.8 |
| CommonStates | **Disabled** | Foreground → template foreground; opacity → `--opacity-disabled` (0.35) |
| CheckStates | **Unchecked** | `_flipTransform` Angle → **0deg** (instant) |
| CheckStates | **Checked** | `_flipTransform` Angle → **180deg** (instant) |

### 4.3 Content Slide Animation (ResizeExpander.cs)

| Property | Value | Source |
|---|---|---|
| Animation duration | **700ms** | ResizeExpander.cs line 30 (`AnimationSpan` default) |
| Easing | SmoothEase, EaseOut | ResizeExpander.cs lines 36-37, 160 |
| Collapse: fade out | opacity 0 → 0, over first ~467ms | ResizeExpander.cs line 341 |
| Expand: fade in | opacity 0 → 1, over last ~233ms | ResizeExpander.cs line 342 |
| Min snap size | **60px** | ResizeExpander.cs line 28 |
| Return snap size | **324px** | ResizeExpander.cs line 29 |

---

## 5. Behavioral Notes

- **Drag to resize:** The GridSplitter allows horizontal drag. If dragged below `MinSnapSize / 3` (20px), the panel auto-collapses. If between 20-60px, it snaps to `MinSnapSize` (60px). (ResizeExpander.cs lines 269-290)
- **Header click toggles:** Clicking `PART_HeaderElement` toggles expand/collapse if not currently animating. (ResizeExpander.cs lines 293-301)
- **IsExpanded default:** `true` — panel starts open. (ResizeExpander.cs line 26)
- **Arrow rotation:** The `ExpandToggleButton` template rotates its content 180deg when Checked (panel open). When Unchecked (collapsed), rotation is 0deg. Combined with `Icon_Arrow_PointerRight`, arrow points right when collapsed, left when expanded.
- **Collapsed width:** Panel collapses to 0px width. (ResizeExpander.cs line 22)

---

## 6. HTML Element Mapping

| XAML Element | HTML Element | CSS Class |
|---|---|---|
| `Grid` (root) | `<div>` | `.resize-expander` |
| `PART_ContentColumn` area | `<div>` | `.resize-expander__panel` |
| `PART_HeaderElement` | `<div>` | `.resize-expander__header` |
| `HeaderPlacement` | `<span>` | `.resize-expander__header-text` |
| `Border` (content wrapper) | `<div>` | `.resize-expander__body` |
| `ShadowEdgeBorderVertical` | `<div>` | `.resize-expander__edge` |
| `PART_GridSplitter` | `<div>` | `.resize-expander__splitter` |
| `PART_ContentExpandToggleButton` | `<button>` | `.resize-expander__toggle` |
| `Path` (Icon_Arrow_PointerRight) | `<span>` (font icon) | `.resize-expander__toggle-icon` |
| SplitPanel ExpanderItem + Path (collapsed tab) | `<div>` | `.resize-expander__tab` |

### Collapsed Tab Shape (from SplitPanel context)

**Source:** `SplitPanel.xaml` lines 66-79 (NOT ResizeExpander.xaml)

When collapsed, the running app shows an angled tab shape behind the toggle.
This comes from the parent `SplitPanel`, which wraps the toggle in an `ExpanderItem`
containing a decorative `Path`:

| Property | Value | Source |
|---|---|---|
| Path Width | **40px** | SplitPanel.xaml line 72 |
| Path Height | **120px** | SplitPanel.xaml line 73 |
| Path Fill | `--BackgroundInvertStrongStepOne` (#FFFFFF) | SplitPanel.xaml line 75 |
| Stretch | Fill | SplitPanel.xaml line 77 |
| ToggleButton (on top) | **40x50** | SplitPanel.xaml lines 85-86 |
| Path Data | `M 0,0 C0,0 0,50 0,50 0,50 40,90 40,90 40,90 40,0 40,0 40,0 0,0 0,0 z` | SplitPanel.xaml line 74 |

Polygon points (mapped to CSS clip-path on 40x120 element):
`clip-path: polygon(0 0, 100% 0, 100% 100%, 0 55.6%)`

### Icon Implementation

```css
.resize-expander__toggle-icon {
  font: var(--font-icons);          /* 20px/20px "Mobius-System-Icons" — font-tokens.css line 35 */
  color: var(--ForegroundInvertWatermark); /* ResizeExpander.xaml line 90 */
}

/* Expanded: arrow rotated 180deg (points left) */
.resize-expander.is-expanded .resize-expander__toggle-icon {
  transform: rotate(180deg);        /* DefaultControls.xaml line 2121 */
}

/* Collapsed: arrow at 0deg (points right) */
.resize-expander.is-collapsed .resize-expander__toggle-icon {
  transform: rotate(0deg);          /* DefaultControls.xaml line 2116 */
}
```
