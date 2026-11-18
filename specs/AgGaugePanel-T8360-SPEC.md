# T8360 Gauge Panel, page 1 — SPEC v2 (WPF pixel match to master)

Status: READY FOR REVIEW. No HTML or CSS written yet.

Scope decision (Ben, 2026-11-18): build the plain WPF gauge panel, pixel matched to master. Figma (iPad file, node `1955:109799`) is used only to pick which page of gauges to show and for sample values. Anything in Figma that master does not draw is left out.

All paths below are under `mobius-master/Common/`.

## 1. What this is

Page 1 (columns 0 to 3, rows 0 to 3) of `Asi.CoreMobius.Server/GaugeSetup/T8360-GaugeSetup.json`, rendered in `DisplayGaugePanel`.

## 2. Panel geometry (all traced)

| Value | Result | Source |
|---|---|---|
| Cell width | 48 | `Asi.Gauges.Client/ViewModels/GaugeManagerVMBase.cs:405` |
| Cell height | 48 | `GaugeManagerVMBase.cs:406` |
| Cell spacing | 24 | `GaugeManagerVMBase.cs:407` |
| Grid margin | 24 all sides | `Asi.Gauges.Client.UI/DisplayGaugePanel.xaml:86` |
| Columns and rows per page | multiples of 4 | `Asi.Interfaces.Client/ViewModels/Gauges/GaugePanelConstants.cs:5-6`, `DisplayGaugePanelGrid.cs:230-243` |
| Container min size | 264 x 374 | `DisplayGaugePanel.xaml:36-37` |
| Scroll area min height | 300 | `DisplayGaugePanel.xaml:49` |
| Page nav bar | 54 tall, BackgroundInvertStepTwo | `DisplayGaugePanel.xaml:170-171` |
| Page dot list | Margin 16,0, left aligned, vertically centered | `DisplayGaugePanel.xaml:195-197` |

Resolved sizes for a 4 x 4 page:

- Gauge grid: 4 x 48 + 3 x 24 = 264 wide, 264 tall.
- Panel: 264 + 24 + 24 = 312 wide. Height 374 (the container minimum, since 312 grid area + 54 nav = 366 is under it).
- 1 x 1 gauge = 48 x 48. 2 x 1 = 120 x 48. 3 x 1 = 192 x 48.
- Cell position: left = col x 72, top = row x 72.

Page count: the JSON uses columns 0 to 7 and rows 0 to 7, so 2 x 2 = 4 pages at this size. Formula is `DisplayGaugePanelGrid.cs:258-263`.

## 3. Page dots (HorizontalDotListBox)

Source: `Asi.Resources.Client.UI/DefaultControls.xaml:4004-4072`.

- Each item: 16 x 16 ellipse with Margin 8, so a 32 x 32 hit box (lines 4011-4013).
- Unselected: transparent fill, 1px stroke, SelectionSecondary (lines 4014-4016).
- Selected: solid SelectionSecondary fill (line 4023, state at 4052).
- Mouse over: MouseOverPrimary fill at 0.5 opacity. Focused: same fill at 1.0 (lines 4030, 4041, 4066).
- Items laid out in a horizontal WrapPanel (line 3925).

**Existing bug found:** `display-gauge-panel/display-gauge-panel.css` has 8px filled dots, 8px gap, ForegroundInvertDisabled and SelectionPrimary colors, with no line citations. That does not match master. I propose fixing it in this pass.

## 4. Gauges on the page

Idx = position in the `Gauges` array of T8360-GaugeSetup.json.

| Cell (col,row) | Idx | Control | Shows in ring / value | Shows under / label | Size |
|---|---|---|---|---|---|
| 0,0 | 0 | IndicatorGauge | value, e.g. 787 | RPM | 48 x 48 |
| 1,0 | 1 | IndicatorGauge | value, e.g. 0.00 | MPH (units only, label hidden) | 48 x 48 |
| 2,0 | 2 | IndicatorGauge | value, e.g. -7.49 | XTE in (label + units) | 48 x 48 |
| 3,0 | 8 | IndicatorGauge | value, e.g. Rtk Fixed | GPS | 48 x 48 |
| 0,1 | 10 | IndicatorGauge | value, e.g. 0 | Gear (units only) | 48 x 48 |
| 1,1 span 3 | 5 | BarGauge horizontal | value 0, min 0, max 100 | Progress: | 192 x 48 |
| 0,2 span 2 | 3 | TextGauge | 00:00:00 | Remaining: | 120 x 48 |
| 2,2 span 2 | 4 | TextGauge | 0.00 + ACRES | Area Completed: | 120 x 48 |
| 0,3 span 2 | 9 | TextGauge | (empty value) | In Work: | 120 x 48 |
| 2,3 | 6 | IndicatorGauge, commandable, icon | down arrow icon | Lower | 48 x 48 |
| 3,3 | 7 | IndicatorGauge, commandable, icon | up arrow icon | Lift | 48 x 48 |

Sample values come from the Figma frame. They are demo data only.

## 5. Control details

### IndicatorGauge (`Asi.Gauges.Client.UI/IndicatorGauge.xaml`)

- Ring: Border 48 x 48, BorderThickness 2, GaugeDataBackgroundBrush, fully round, GaugeBackgroundBrush fill (lines 24-35).
- Value in ring: a Viewbox with Margin -5.5,-6,-6.5,-5 inside the 20 x 20 icon grid, so the text is scaled to fit a 32 x 31 box. Text style HeadingMd, centered (lines 76-80, 137-149). This is why long values like "Rtk Fixed" render small.
- Label strip: Border Margin -8,-5, bottom aligned, GaugeBackgroundBrush fill. Inner StackPanel Margin 2,0,-2,0, horizontal, centered: Label, then Value, then Units, each with 1px horizontal margin (lines 174-218).
- HideIcons state (no icon): value in ring, label visible (lines 260-274).
- ShowIcons state (Lower, Lift): icon in ring, label container collapsed, so only Units shows under the ring (lines 276-290). This is why the first button reads "Lower" even though its Label is "Lift".
- Commandable (Lower, Lift): CanCommandButton sets the status border container to opacity 1 (lines 523-531). IconOn then shows a full 2px SelectionPrimary ring (lines 41-47, 376).
- Icon: Path 20 x 20, Stretch Uniform (lines 90-134).
- Already converted in `indicator-gauge/`. I will reuse those classes and only flag differences I find against the lines above.

### BarGauge horizontal (`Asi.Gauges.Client.UI/BarGauge.xaml:15-376`)

- Rows 12 / 13 / 1 / 10 / 12 = 48 tall (lines 21-25).
- Label: LabelStatusIcon, Margin 0,-4,0,-4 (line 40). Value: right, bottom, Margin 0,0,5,-3 (line 54).
- Right edge tick 1px, rows 0 to 1 = 25 tall (lines 69-75). Left edge tick 1 x 7 (lines 76-83).
- Bar row: 4 equal segments, 5 tick groups, GaugeDataBackgroundBrush (lines 86-187).
- Range bands: Margin 2,0. Critical opacity 0.5, warning 0 by default (lines 190-226). Not visible for Progress because all thresholds are infinite in the JSON.
- Fill: Height 10, Margin 2,0,4,-4, opacity 0.5. Indicator MinWidth 4 (lines 241-252).
- Needle: 2 x 14 GaugeValueForegroundBrush, with 1 x 14 background guards either side (lines 253-273).
- Min/max labels: Margin 0,-10, bottom aligned, opacity 0.8 (lines 282-313).
- States: Unknown, OK, Warning, Critical (lines 317-375). Vertical template at 378-728.
- Brushes: GaugeInvert set (lines 739-751).

### TextGauge (`Asi.Gauges.Client.UI/TextGauge.xaml`)

- Rows 12 / 8 / *. Label Margin -2,-3,-2,-5, bottom aligned.
- Value: FontSize 32, UltraLight, HeadingLg, inside a Viewbox (scales to fit, top aligned).
- Units: top aligned, left margin 3, vertical margin -2, upper-cased by CaseConverter.
- No border in the template.

### LabelStatusIcon (`Asi.CustomControls.Client.UI/LabelStatusIcon.xaml`)

- Appends a colon to every label: `StringFormat={}{0}:` (line 76). So "Progress:", "Remaining:", "Area Completed:", "In Work:".
- Style Margin -2,0, Padding 2,-7,2,0 (lines 16-17). Label text Margin 3,-6,0,0 (line 73).

## 6. Figma items resolved against master

| Figma shows | Master says | Action |
|---|---|---|
| Label colons | Added by LabelStatusIcon line 76 | Keep colons |
| "Area Cpmpleted" | "Area Completed" in JSON | Use master spelling |
| "Lower" under first button | Units shown, label hidden in ShowIcons state | Matches master |
| 16px outlined dots | DefaultControls.xaml 4004-4072 | Matches master |
| Value font sizes 20 / 17 / 10 | Viewbox scaling | Let it scale, no fixed sizes from Figma |
| Bordered box around In Work | No border in TextGauge.xaml | Leave out |
| Collapse tab with chevron | Not in DisplayGaugePanel.xaml | Leave out |
| Partial blue arc on Lower / Lift | Master only has a full 2px ring (on) or none | Use master states |
| 400px wide, 26px padding, 21px gap | 312 wide, 24 margin, 24 spacing | Use master |

## 7. Still open

1. **Lower / Lift icons.** Master draws them from path geometry in the JSON `CustomIconPaths` (a single-shaft arrow in a 36-unit box). The project rule says Mobius-System-Icons glyphs only. Figma uses U+E016 and U+E011. I have not compared those glyph shapes to the JSON paths. Need Ben's call: glyphs, or the master path data.
2. **When ShowIcons fires.** I traced the XAML states but not the C# in `IndicatorGauge.cs` that picks ShowIcons vs HideIcons. I will read it before building.
3. **Viewbox text scaling in CSS.** WPF scales text to fit automatically. Vanilla CSS with no JavaScript cannot. I plan size modifier classes per value length, each cited to the 32 x 31 box. Flagging it as an approximation.

## 8. Build plan (after sign-off)

1. `bar-gauge/bar-gauge.html` + `bar-gauge/bar-gauge.css`: horizontal, all four status states, with and without icon, with and without range bands, text vs numeric min/max. Vertical second.
2. Move `.mob-bar-gauge` rules out of `status-gauge/status-gauge.css` (lines 132 onward) and re-trace each value.
3. Fix page dots in `display-gauge-panel/display-gauge-panel.css` per section 3.
4. New page `gauge-panel-t8360/gauge-panel-t8360.html` + CSS: the composed 4 x 4 page, 312 x 374, with page 1 of 4 selected.
5. Add both pages to `js/nav.js`.

## 9. Build log (2026-11-18)

Built after Ben's go-ahead ("update the html component library").

Resolved from section 7:

1. **Lower / Lift icons.** Used Mobius-System-Icons glyphs per the project rule: `Arrow_DirectionDown` U+E016 and `Arrow_DirectionUp` U+E011. Both confirmed present in the font file with fonttools. Not yet compared shape for shape against the JSON path data.
2. **ShowIcons.** `IndicatorGauge.cs` line 255 sets ShowIcons = true whenever icon data is set. Line 239 picks the state.
3. **Lower / Lift ring.** IconOff also shows the SelectionPrimary ring (IndicatorGauge.xaml line 353) with the cover at Margin 1, so 1px of blue shows when off and 2px when on. Default IconState is IconOff (`IconState.cs` line 5).
4. **Icon color.** Normal state animates the icon fill to the control Foreground = ForegroundPrimary (IndicatorGauge.xaml lines 231-232, Typography.xaml line 20).
5. **Line height.** Typography.xaml line 37 is LineHeight="Auto". Master Roboto files give 1.2 x font size from the Windows metrics. Assumption flagged in the CSS: WPF may read hhea (1.172) instead.
6. **Bar value format.** `BarGaugeVM.cs` line 234: `{0:#,0}`, so Progress shows "0", not "0.00".

Files changed: `bar-gauge/` (new), `status-gauge/status-gauge.css`, `text-gauge/text-gauge.css`, `indicator-gauge/indicator-gauge.css`, `display-gauge-panel/display-gauge-panel.css`, `gauges/gauges.html`, `styles/css/main.css`, `js/nav.js`.

Still approximate or open:

- Viewbox text scaling (ring values, text gauge values) uses fit classes, not a live measurement.
- Vertical BarGauge is not re-traced.
- No `GaugeInvertStatusWarningRange` / `CriticalRange` tokens exist in the theme files. Status colors are used for the bands.
- Fuel and DEF bar icons need a confirmed glyph.
- `ShadowEdgeBorderVertical` in the page nav bar (DisplayGaugePanel.xaml line 204) is not traced.
- The base `.mob-indicator-gauge` rules and the older DisplayGaugePanel demo (132 x 56 cells) do not match master. Left unchanged.
