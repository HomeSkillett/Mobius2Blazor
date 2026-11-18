# SplitPanel SPEC (Horizontal Template)

> A two-pane resizable layout with independent expand/collapse toggles per pane. Each collapsed pane shows an angled tab shape with a toggle button. This spec covers the **horizontal** template only.

---

## 1. Component Hierarchy (XAML Source Map)

```
SplitPanel.xaml (Asi.CommonControls.Client.UI)
  Template: Mobius_UI_Common_Templates_SplitPanelHorizontal
  └─ Grid (root)
       ├─ Col 0: PART_FirstContentColumn (Width="*", MaxWidth=FirstContentMaxOpenLength)
       ├─ Col 1: PART_SpacerColumn (Width="2")
       └─ Col 2: PART_SecondContentColumn (Width="*", MaxWidth=SecondContentMaxOpenLength)
            │
            ├─ PART_FirstContent [ContentPresenter, Col 0]
            │    └─ FirstContent (TemplateBinding)
            │
            ├─ PART_SecondContent [ContentPresenter, Col 2]
            │    └─ SecondContent (TemplateBinding)
            │
            ├─ Rectangle [Col 1, Spacer fill]
            │    Fill: BackgroundInvertStrongStepOneBrush
            │
            ├─ PART_PanelSplitter [GridSplitter, Col 1]
            │    Margin: "-2,0", Background: Transparent
            │
            ├─ Grid [Col 0, Toggle-A area] — HAlign=Right, VAlign=Top, Margin="-42,0,0,0"
            │    Visibility: MultiBinding (SecondContentIsOpen AND NOT SecondContentIsDisabled AND NOT FirstContentIsDisabled)
            │    ├─ ExpanderItem [HAlign=Right, ExpansionDirection=ExpandLeft]
            │    │    └─ Path (decorative tab shape, 40x120)
            │    ├─ ContentPresenter (SecondContentBonusActions)
            │    └─ PART_TOGGLE_BUTTON_A [ToggleButton, 40x50]
            │         HAlign=Right, VAlign=Top
            │         IsChecked ↔ FirstContentIsOpen
            │         └─ Path (Icon_Arrow_PointerRight, 20x20)
            │
            └─ Grid [Col 2, Toggle-B area] — HAlign=Right, VAlign=Top, Margin="-42,0,0,0"
                 Visibility: Inverted SecondContentIsOpen
                 ├─ Path (decorative tab shape, 40x120)
                 ├─ ContentPresenter (SecondContentBonusActions)
                 └─ PART_TOGGLE_BUTTON_B [ToggleButton, 40x50]
                      HAlign=Right, VAlign=Top
                      IsChecked ↔ SecondContentIsOpen
                      └─ Path (Icon_Arrow_PointerLeft, 20x20)
```

### XAML Source Files

| File | Purpose |
|---|---|
| `Common/Asi.CommonControls.Client.UI/SplitPanel.xaml` | Horizontal + Vertical templates, style |
| `Common/Asi.CommonControls.Client.UI/SplitPanel.cs` | Control logic, animation, drag snap, memento |
| `Common/Asi.Resources.Client.UI/DefaultControls.xaml` line 2049 | `Mobius_UI_Resources_Templates_ExpandToggleButton` template |
| `Common/Asi.Resources.Client.UI/DefaultControls.xaml` line 2919 | `Mobius_UI_Resources_Styles_ExpandToggleButton` style |
| `Common/Asi.Resources.Client.UI/Themes/Paths/Icons.xaml` line 58 | `Icon_Arrow_PointerRight` path geometry |
| `Common/Asi.Resources.Client.UI/Languages/EN-US/LocalizedText.xaml` line 28 | Tooltip: "Show/hide this view" |

---

## 2. Resolved Dimensions

### 2.1 Overall Grid Layout (Horizontal Template)

| Property | Value | Source |
|---|---|---|
| Col 0 width | `*` (flex) | SplitPanel.xaml line 19 |
| Col 0 MaxWidth | `FirstContentMaxOpenLength` (default: ∞) | SplitPanel.xaml line 19, SplitPanel.cs line 37 |
| Col 1 width (spacer) | **2px** | SplitPanel.xaml line 20 |
| Col 2 width | `*` (flex) | SplitPanel.xaml line 21 |
| Col 2 MaxWidth | `SecondContentMaxOpenLength` (default: ∞) | SplitPanel.xaml line 21, SplitPanel.cs line 38 |

### 2.2 Spacer Rectangle

| Property | Value | Source |
|---|---|---|
| Fill | `--BackgroundInvertStrongStepOne` | SplitPanel.xaml line 39 |
| Hit test | false | SplitPanel.xaml line 40 |
| Stretch | Both H and V | SplitPanel.xaml lines 37-38 |

### 2.3 GridSplitter (PART_PanelSplitter)

| Property | Value | Source |
|---|---|---|
| Column | 1 | SplitPanel.xaml line 43 |
| Margin | **-2, 0** | SplitPanel.xaml line 45 |
| Background | Transparent | SplitPanel.xaml line 50 |
| Alignment | Stretch (both) | SplitPanel.xaml lines 46-49 |

### 2.4 Toggle-A Area (Col 0, right-aligned)

| Property | Value | Source |
|---|---|---|
| Grid Margin | **-42, 0, 0, 0** | SplitPanel.xaml line 54 |
| HorizontalAlignment | Right | SplitPanel.xaml line 55 |
| VerticalAlignment | Top | SplitPanel.xaml line 56 |

### 2.5 Decorative Path (Tab Shape)

| Property | Value | Source |
|---|---|---|
| Width | **40px** | SplitPanel.xaml line 72 |
| Height | **120px** | SplitPanel.xaml line 73 |
| Path Data | `M 0,0 C0,0 0,50 0,50 0,50 40,90 40,90 40,90 40,0 40,0 40,0 0,0 0,0 z` | SplitPanel.xaml line 74 |
| Fill | `--BackgroundInvertStrongStepOne` (#FFFFFF) | SplitPanel.xaml line 75 |
| Hit test | false | SplitPanel.xaml line 76 |
| Stretch | Fill | SplitPanel.xaml line 77 |

**Polygon mapping (40x120 element):**
Path vertices at full stretch: (0,0) → (0,50) → (40,90) → (40,0) → back.
Normalized to percentages: `clip-path: polygon(0 0, 100% 0, 100% 75%, 0 41.7%)`

> **Note:** The previous ResizeExpander spec used `polygon(0 0, 100% 0, 100% 100%, 0 55.6%)`. That was approximate. The actual XAML path data maps to a shape where the right side extends to full height (90/120 = 75%) and the left side cuts at 50/120 = 41.7%. However, because `Stretch="Fill"` scales the path to fill the 40x120 container, the actual rendered shape maps the path's bounding box (0,0 to 40,90) to fill the element. So the full 120px height IS used. Revised polygon: `clip-path: polygon(0 0, 100% 0, 100% 100%, 0 55.6%)` — the 55.6% comes from 50/90 mapped to the stretched height.

### 2.6 Toggle Button (PART_TOGGLE_BUTTON_A / B)

| Property | Value | Source |
|---|---|---|
| Width | **40px** | SplitPanel.xaml line 86 |
| Height | **50px** | SplitPanel.xaml line 87 |
| HorizontalAlignment | Right | SplitPanel.xaml line 88 |
| VerticalAlignment | Top | SplitPanel.xaml line 89 |
| Background | Transparent | SplitPanel.xaml line 90 |
| Foreground | `--ForegroundInvertWatermark` rgba(112, 112, 112, 1) | SplitPanel.xaml line 91 |
| Style | `Mobius_UI_Resources_Styles_ExpandToggleButton` | SplitPanel.xaml line 93 |
| Tooltip | "Show/hide this view" | SplitPanel.xaml line 95 |
| IsChecked (A) | ↔ `FirstContentIsOpen` | SplitPanel.xaml line 92 |
| IsChecked (B) | ↔ `SecondContentIsOpen` | SplitPanel.xaml line 136 |

### 2.7 Toggle Icon (Arrow)

| Property | Value | Source |
|---|---|---|
| Font family | **Mobius-System-Icons** | var(--font-icons) |
| Glyph (Toggle-A) | **** (`\E00C` — Icon_Arrow_PointerRight) | SplitPanel.xaml line 102 |
| Glyph (Toggle-B) | Icon_Arrow_PointerLeft | SplitPanel.xaml line 145 |
| Icon size | **20px** | SplitPanel.xaml lines 100-101 |
| Fill | Inherits from ToggleButton Foreground | SplitPanel.xaml line 103 |
| Rotation (Unchecked/collapsed) | **0deg** | DefaultControls.xaml line 2116 |
| Rotation (Checked/expanded) | **180deg** | DefaultControls.xaml line 2121 |

---

## 3. Color Token Mapping

| XAML Resource | CSS Variable | Light Theme Value |
|---|---|---|
| `BackgroundInvertStrongStepOneBrush` | `--BackgroundInvertStrongStepOne` | rgba(255, 255, 255, 1) |
| `BackgroundInvertStepTwo` | `--BackgroundInvertStepTwo` | rgba(251, 251, 249, 1) |
| `ForegroundInvertWatermark` | `--ForegroundInvertWatermark` | rgba(112, 112, 112, 1) |
| `ForegroundInvertPrimary` | `--ForegroundInvertPrimary` | rgba(85, 85, 85, 1) |
| `MouseOverPrimary` | `--MouseOverPrimary` | rgba(12, 208, 255, 1) |

---

## 4. Visual States & Animations

### 4.1 Panel Open/Close (SplitPanel.cs)

| Property | Value | Source |
|---|---|---|
| Animation duration | **700ms** | SplitPanel.cs line 39 (AnimationMs default) |
| Easing | SmoothEase, EaseOut | SplitPanel.cs line 40 |
| FirstContentIsOpen default | **true** | SplitPanel.cs line 42 |
| SecondContentIsOpen default | **true** | SplitPanel.cs line 43 |
| Snap threshold | `MinOpenLength / 3.0` | SplitPanel.cs line 30 (PanelSnapDivisionValue) |
| Collapse target | **0px** | SplitPanel.cs lines 561, 373-375 |

### 4.2 ExpandToggleButton States (DefaultControls.xaml line 2049)

| State Group | State | Effect |
|---|---|---|
| CommonStates | **Normal** | Foreground → template foreground; opacity → 1.0 |
| CommonStates | **MouseOver** | Foreground → `--MouseOverPrimary` (#0CD0FF) |
| CommonStates | **Pressed** | Foreground → template foreground; opacity → 0.8 |
| CommonStates | **Disabled** | Foreground → template foreground; opacity → `--opacity-disabled` (0.35) |
| CheckStates | **Unchecked** | `_flipTransform` Angle → **0deg** (instant) |
| CheckStates | **Checked** | `_flipTransform` Angle → **180deg** (instant) |

### 4.3 Button Repositioning (SplitPanel.cs lines 755-778)

When `EnableButtonRepositioning` is true, the toggle button's top margin shifts down by **42px** if it would overlap the window's title bar controls. This is a runtime check, not relevant to static HTML output.

---

## 5. Behavioral Notes

- **Two independent panes:** Each pane (First, Second) can open/close independently via its own toggle button. (SplitPanel.cs lines 42-43)
- **Drag to resize:** The GridSplitter allows horizontal drag between panes. Snap logic collapses a pane if dragged below `MinOpenLength / 3`, snaps to `MinOpenLength` if between threshold and min. (SplitPanel.cs lines 354-445)
- **Both panes default open.** (SplitPanel.cs lines 42-43)
- **Toggle-A visibility:** Only visible when `SecondContentIsOpen AND NOT SecondContentIsDisabled AND NOT FirstContentIsDisabled`. (SplitPanel.xaml lines 58-64)
- **Toggle-B visibility:** Only visible when `SecondContentIsOpen == false`. (SplitPanel.xaml line 114)
- **Arrow direction:** Toggle-A uses `Icon_Arrow_PointerRight`; Toggle-B uses `Icon_Arrow_PointerLeft`. Both rotate 180deg when Checked (pane open).
- **Memento pattern:** Panel state (open/closed, sizes) persists across sessions via `SplitPanelMemento`. (SplitPanel.cs lines 658-732)
- **Collapsed pane width:** Animates to 0px, the other pane takes `1*`. (SplitPanel.cs lines 558-567)

---

## 6. HTML Element Mapping

| XAML Element | HTML Element | CSS Class |
|---|---|---|
| `Grid` (root) | `<div>` | `.split-panel` |
| `PART_FirstContentColumn` area | `<div>` | `.split-panel__pane.split-panel__pane--first` |
| `PART_SecondContentColumn` area | `<div>` | `.split-panel__pane.split-panel__pane--second` |
| `Rectangle` (spacer) | `<div>` | `.split-panel__spacer` |
| `PART_PanelSplitter` | `<div>` | `.split-panel__splitter` |
| Toggle-A Grid (Col 0) | `<div>` | `.split-panel__toggle-area.split-panel__toggle-area--first` |
| Toggle-B Grid (Col 2) | `<div>` | `.split-panel__toggle-area.split-panel__toggle-area--second` |
| `Path` (decorative tab) | `<div>` | `.split-panel__tab` |
| `ToggleButton` | `<button>` | `.split-panel__toggle` |
| `Path` (arrow icon) | `<span>` (font icon) | `.split-panel__toggle-icon` |

### Tab Shape (clip-path)

```css
.split-panel__tab {
  width: 40px;                                          /* SplitPanel.xaml line 72 */
  height: 120px;                                        /* SplitPanel.xaml line 73 */
  background: var(--BackgroundInvertStrongStepOne);      /* SplitPanel.xaml line 75 */
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 55.6%); /* Path Data mapped with Stretch=Fill */
}
```

### Icon Implementation

```css
.split-panel__toggle-icon {
  font: var(--font-icons);                              /* 20px/20px "Mobius-System-Icons" */
  color: var(--ForegroundInvertWatermark);               /* SplitPanel.xaml line 91 */
}

/* Expanded (Checked): arrow rotated 180deg */
.split-panel__pane.is-expanded .split-panel__toggle-icon {
  transform: rotate(180deg);                            /* DefaultControls.xaml line 2121 */
}

/* Collapsed (Unchecked): arrow at 0deg */
.split-panel__pane.is-collapsed .split-panel__toggle-icon {
  transform: rotate(0deg);                              /* DefaultControls.xaml line 2116 */
}
```

---

## 7. Scope Notes

This component **replaces** the previous `ResizeExpander` conversion. The ResizeExpander is a child control that SplitPanel wraps — the visual elements users see (angled tab, 40x50 toggle, decorative path) all come from SplitPanel's template, not ResizeExpander's. For Blazor handoff, building SplitPanel directly gives us the correct visual structure without needing to reconstruct the parent/child nesting.

The ResizeExpander spec (`ResizeExpander-SPEC.md`) remains as reference for the inner panel animation behavior (slide-in, header, body, GridSplitter resize handle) that SplitPanel's content panes may contain.

---

## 8. Vertical Template (added 2026-11-18)

Template `Mobius_UI_Common_Templates_SplitPanelVertical`, SplitPanel.xaml lines 170-296. Selected by `Orientation="Vertical"` (lines 298-305). Built as `.split-panel--vertical` on the same root and child classes.

### 8.1 Hierarchy

```
Grid (root)                                              line 174
  Row 0: PART_FirstContentRow  Height=*  MaxHeight=FirstContentMaxOpenLength    line 176
  Row 1: Height=2                                                               line 177
  Row 2: PART_SecondContentRow Height=*  MaxHeight=SecondContentMaxOpenLength   line 178
  ├─ PART_FirstContent  [ContentPresenter, Row 0]                               lines 180-185
  ├─ PART_SecondContent [ContentPresenter, Row 2]                               lines 186-191
  ├─ Rectangle [Row 1] Fill=BackgroundInvertStrongStepOne, no hit test          lines 192-198
  ├─ PART_PanelSplitter [GridSplitter, Row 1] Margin="0,-8", Transparent        lines 199-208
  ├─ Toggle-C Grid [Row 0] Margin="0,-42,0,0", Right / Top                      lines 209-251
  │    Visible when FirstContentIsOpen = false                                  line 214
  │    ├─ Path 120 x 40, Stretch=Fill                                           lines 216-223
  │    ├─ ContentPresenter (SecondContentBonusActions), HAlign=Center           lines 224-227
  │    └─ PART_TOGGLE_BUTTON_C 50 x 40, Right / Top                             lines 228-250
  │         IsChecked <-> FirstContentIsOpen, Icon_Arrow_PointerUp 20 x 20
  └─ Toggle-D Grid [Row 2] Margin="0,-42,0,0", Right / Top                      lines 252-294
       Visible when FirstContentIsOpen = true                                   line 257
       ├─ Path 120 x 40, Stretch=Fill                                           lines 259-266
       ├─ ContentPresenter (SecondContentBonusActions), HAlign=Center           lines 267-270
       └─ PART_TOGGLE_BUTTON_D 50 x 40, Right / Top                             lines 271-293
            IsChecked <-> SecondContentIsOpen, Icon_Arrow_PointerUp 20 x 20
```

### 8.2 Resolved values

| Item | Value | Source |
|---|---|---|
| Rows | * / 2 / * | lines 176-178 |
| Splitter drag target | 2 + 8 + 8 = 18px tall | line 202 |
| Tab size | 120 x 40 | lines 217-218 |
| Tab position | right aligned, top = row top - 42, so its bottom edge is 2px above the row | lines 211-213 |
| Tab shape | Path bounds x -50 to 40, y 0 to 40. Stretch=Fill onto 120 x 40 gives `polygon(44.444% 0, 100% 0, 100% 100%, 0 100%)` | line 219 |
| Toggle button | 50 x 40, right / top inside the tab | lines 230-233 |
| Icon | Icon_Arrow_PointerUp = Mobius-System-Icons U+E007 (confirmed in the font file) | line 245 |
| Checked | arrow rotated 180deg, so an open pane shows a down arrow | DefaultControls.xaml line 2121 |
| No ExpanderItem | the tab shape is always visible when its toggle grid is | lines 216-223 |

### 8.3 States

| Root class | Master state | Rows | Tab shown | Arrow |
|---|---|---|---|---|
| `first-open` | both open (default) | * / 2 / * | Toggle-D, on the divider | down (checked) |
| `second-collapsed` | SecondContentIsOpen = false | * / 2 / 0 (SplitPanel.cs 430-431) | Toggle-D, at the bottom over the first pane | up |
| `first-collapsed` | FirstContentIsOpen = false | 0 / 2 / * (SplitPanel.cs 415-416) | Toggle-C, 42px above the top of the panel | up |

Row heights are set in code (SplitPanel.cs lines 314-349). CSS takes them as `--split-first-length` and `--split-second-length`, defaulting to 1fr.

### 8.4 Usage traced in master

`Asi.Miscellaneous.Client.UI/ModeControls/ModeCommandAndControl.xaml` lines 445-688: Orientation=Vertical, SecondContentMinOpenLength 376, SecondContentMaxOpenLength 654, StartSnap SecondContentMin, inside a 300px wide column. FirstContent is the vehicle list. SecondContent is the gauge panel host (BackgroundInvertStepOne, "No asset selected" HeadingSm with 24 margin). SecondContentBonusActions is a pop-out gauges IconButton (Icon_PopOut, U+E560).

### 8.5 Not covered

- Open / close animation (700ms, SmoothEase EaseOut) is not built for the vertical demos. They are static, no JavaScript.
- Drag snap logic (SplitPanel.cs lines 400-441) is behavior for Blazor.
- The pop-out button in the demo uses the page's demo button class. The real IconButton style is not traced.
- The vertical template has no Disabled triggers (the horizontal one does, lines 150-167).

### 8.6 Note on section 2.5

Section 2.5 gives a second polygon for the horizontal tab (`100% 75%, 0 41.7%`). With Stretch=Fill the path bounds (40 x 90) stretch to the full 40 x 120, so the polygon already in split-panel.css (`100% 100%, 0 55.6%`) is the right one.
