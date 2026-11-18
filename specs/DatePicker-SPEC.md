# DatePicker SPEC

> Covers the `DatePicker` closed field **and** the popup `Calendar` (month / year / decade views). Every value below traces to a XAML file and line number, or to a token in `Mobius Color Tokens/`.
>
> **Status:** spec only. No HTML or CSS written yet — pending review.

---

## 0. Source Files

| File | Lines | Contains |
|---|---|---|
| `Common/Asi.Resources.Client.UI/DefaultControls.xaml` | 6794–7711 | The entire DatePicker / Calendar block |
| ↳ | 6796 | `Templates_CalendarDayButton` |
| ↳ | 6947 | `Templates_CalendarButton` (month & year cells) |
| ↳ | 7050 | `Templates_CalendarItem` (popup chrome) |
| ↳ | 7055 | `Templates_DateTitleButton` (header, nested resource) |
| ↳ | 7474 | `Templates_Calendar` (shadow + host) |
| ↳ | 7492 | `Templates_DatePicker` (closed field) |
| ↳ | 7656–7711 | Styles, incl. the **implicit** `DatePicker` style at 7697 |
| ↳ | 1176–1242 | `Templates_SimpleIconButton` (used by the calendar button + prev/next) |
| ↳ | 2762–2772 | `Styles_SimpleIconButton` |
| ↳ | 360, 623 | `Templates_/Styles_OnDemandTextBox` (the date text field) |
| `Common/Asi.Resources.Client.UI/LightTheme.xaml` | 2–69 | Light theme color values |
| `Common/Asi.Resources.Client.UI/Themes/Sizes/Sizes.xaml` | 24–25, 77–84 | Opacities, durations |
| `Common/Asi.Resources.Client.UI/Themes/Sizes/SizesNew.xaml` | 38–40, 53 | TouchSize, DisabledOpacity |
| `Common/Asi.Resources.Client.UI/Typography.xaml` | 18–23 | Default font 14px / Condensed / 400 |
| `Common/Asi.CommonControls.Client.UI/BoxShadow.cs` | 10–13 | Popup shadow defaults |

### Consumers in Master

| File | Line | Notes |
|---|---|---|
| `Common/Asi.Miscellaneous.Client.UI/ModeControls/Children/DatabaseExportControl.xaml` | 112, 141 | Default size. `Padding="10,0,10,0"` override. Paired with `common:TimePicker`. |
| `Common/Asi.Miscellaneous.Client.UI/SingleControls/ErrorReport.xaml` | 259, 287 | **Large variant.** `Width=220 Height=53 Padding="21,15,15,16" FontSize=18` + floating label + "MM/DD/YYYY" hint. |
| `Plugins/Common/Playback/Asi.Playback.Client/PlaybackManagerControl.xaml` | 234, 268 | Default size. `Padding="10,0,10,0"` override at 236, 270. |

All six instances in Master are the default variant except the two in ErrorReport. Four of the six override padding to `"10,0,10,0"`.

---

## 1. Icons — Mobius-System-Icons font

Extracted from `Mobius-System-Icons.ttf` with fonttools (618 cmap entries / 581 glyphs).

| Purpose | XAML resource | Glyph name | Codepoint | CSS |
|---|---|---|---|---|
| Calendar button (closed field) | `Icon_Calendar` (DefaultControls.xaml:7560) | `Calendar` | U+E752 | `content: "\e752"` |
| Previous (header) | `Icon_Arrow_PointerUpSm` (7167) | `Arrow_PointerUpSm` | U+E008 | `content: "\e008"` |
| Next (header) | `Icon_Arrow_PointerDownSm` (7182) | `Arrow_PointerDownSm` | U+E00B | `content: "\e00b"` |

**Note the navigation direction.** Master uses **up / down** chevrons, not left / right (7167, 7182). This matches the vertical slide animation on the calendar grid (§5.4). Do not substitute left/right arrows.

Icon size: **20px** — `--size-icons` in `Mobius2Blazor/styles/fonts/font-tokens.css:25`. The `Path` elements carry no explicit Width/Height, so they inherit the 20px icon convention already established in `buttons/buttons-icon.html`.

---

## 2. Element Map — Closed Field

`Templates_DatePicker`, DefaultControls.xaml:7492–7654

```
Grid  PART_Root                              (7496)  MinHeight=44
├─ i:Interaction.Triggers                    (7502)  2x DataTriggerEvaluateOnLoad →
│                                                    GoToStateAction MouseOver / Normal
│                                                    (forces correct state on load)
├─ Border  _normalBorder                     (7522)  bg + 1px border
├─ Border  _inputMouseOverBorder             (7528)  opacity 0 → 1 on hover
├─ Border  _inputFocusBorder                 (7536)  opacity 0 → 1 on focus
└─ Grid  (padding wrapper)                   (7544)  Margin = Padding "4,0"
   ├─ Col 0 Auto │ Col 1 *                   (7546-7547)
   ├─ Button  PART_Button                    (7549)  Margin="0,-1,4,-1"
   │   └─ Path  Icon_Calendar                (7559)  → glyph U+E752
   ├─ DatePickerTextBox  PART_TextBox        (7564)  Col 1, transparent
   │   └─ TouchTextBox                       (7577)  Styles_OnDemandTextBox
   │                                                  Text format "M/dd/yyyy" (7583)
   ├─ Rectangle  _placementTarget            (7591)  1x1 transparent — NOT rendered in HTML
   ├─ Popup  PART_Popup                      (7602)  offsets -20 / -20, Placement=Bottom
   └─ Grid  PART_DisabledVisual              (7611)  opacity 0 — NOT rendered in HTML
```

### Nesting decision

Three sibling Borders (7522 / 7528 / 7536) exist only to cross-fade hover and focus at different durations. CSS `transition` on a single element cannot express two independent fades with different timings, but in practice hover and focus never need to blend. **Recommendation: collapse to one bordered element** with `:hover` / `:focus-within` rules. This is a deliberate deviation from rule 3 (preserve nesting) — flagging it for your sign-off rather than silently flattening.

`_placementTarget` and `PART_DisabledVisual` are WPF layout scaffolding with zero pixels of visual output. Omitting them.

### Resolved dimensions — default variant

| Property | Value | Token | Source |
|---|---|---|---|
| MinHeight | 44px | `--touch` | 7498 → SizesNew.xaml:39 |
| Background | `#FFFFFF` | `--BackgroundInput` | 7700 |
| Border | 1px `#C7C7C7` | `--border-width` / `--BackgroundInputOutline` | 7699, 7705 |
| Padding | `0 4px` | — | 7704 (`"4,0"` L/R only) |
| Margin | `-4px 0 4px 0` | — | 7708 (`"0,-4,0,4"`) |
| Icon → text gap | 4px | `--spacing-label-to-control-sm` | 7552 right margin |
| Icon vertical bleed | -1px top & bottom | — | 7552 |
| Text color | `#0075A1` | `--ForegroundAction` | DefaultControls.xaml:641 |
| Text color (readonly / disabled) | `#555555` | `--ForegroundPrimary` | 644, 647 |
| Font | 14px / Condensed / 400 | `--size-default`, `--default-font` | Typography.xaml:21–23 |
| Date format | `M/dd/yyyy` | — | 7583 |

**Font family caveat.** Typography.xaml:18 binds `FontFamily` to `Application.Current.MobiusFontFamily`, a runtime property — the file does not name a face. The commented-out original (line 15) reads `Themes/Fonts/#Roboto, Courier New`, and `--default-font` in the token file is `"Roboto Condensed", "Roboto", Arial, sans-serif`. So "Roboto Condensed" is an inference from `FontStretch=Condensed` (line 21) plus the token file, not a value read out of Master. Using `--default-font` is still correct; just don't cite Master for the face name.

**Open question A:** `Margin="0,-4,0,4"` (7708) pulls the field 4px up and pushes 4px down — a net-zero shift that only matters inside a WPF stack. In CSS this becomes `margin: -4px 0 4px`. Do you want it carried over, or dropped since the Blazor layout won't stack the same way?

### Resolved dimensions — ErrorReport large variant

| Property | Value | Source |
|---|---|---|
| Width | 220px (`--field-input-width`) | ErrorReport.xaml:260 |
| Height | 53px | ErrorReport.xaml:261 |
| Padding | `15px 15px 16px 21px` | ErrorReport.xaml:263 (`"21,15,15,16"` = L,T,R,B) |
| Font size | 18px (`--size-hdrSm`) | ErrorReport.xaml:264 |
| Margin | `7px 0 0 0` | ErrorReport.xaml:262 |
| Floating label | 12px, `--ForegroundPrimary`, bg `--BackgroundPrimary`, top-left, `margin-left: 14px` | ErrorReport.xaml:216–226, 269 |
| Hint text | 12px, `--ForegroundDisabled`, "MM/DD/YYYY", `margin-left: 14px` | ErrorReport.xaml:270 |

**Open question B:** Height 53 and padding `21,15,15,16` are hardcoded in ErrorReport.xaml with no token behind them, and 53px sits between `--field-height` (44) and `--field-height-lg` (58). Also the 12px label size is not a font token (`--size-Sm` is 11px, `--size-default` is 14px). Do you want this variant built with literal values plus a comment, or do we add tokens?

---

## 3. Element Map — Popup Calendar

`Templates_Calendar` (7474) + `Templates_CalendarItem` (7050)

```
Grid  PART_Root                              (7478)  Margin=20  ← shadow bleed room
├─ BoxShadow                                 (7482)  Depth=20, Opacity=0.1
└─ StackPanel > CalendarItem                 (7483-7486)
   └─ Grid  PART_Root                        (7125)
      └─ Border  bg = --BackgroundPrimary    (7126)
         └─ Grid  [Row0 Auto | Row1 *]       (7127-7131)
            ├─ Grid  header  ClipToBounds    (7132)  [* | Auto | Auto]
            │  ├─ Button  PART_HeaderButton  (7141)  H=40, Margin="15,1,0,-1"
            │  │                                     Foreground --ForegroundAction
            │  │                                     TranslateTransform Y (7152-7154)
            │  ├─ Button  PART_PreviousButton(7156)  40x40, glyph U+E008
            │  └─ Button  PART_NextButton    (7171)  40x40, glyph U+E00B
            ├─ Border  bg --BackgroundStrong (7187)  Row 1 base fill
            └─ Border  Row 1                 (7191)
               └─ Grid  [Row0 Auto | Row1 Auto]
                  ├─ ExpanderItem  _monthViewDayLabels     (7197)  collapses in Year/Decade
                  │  └─ Grid
                  │     ├─ Border  bottom 1px --InnerLines, opacity 0.5   (7204)
                  │     └─ UniformGrid  H=40, Columns=7                   (7209)
                  │        └─ 7x TextBlock  S M T W T F S                 (7213-7249)
                  │           --ForegroundStrong; Sat & Sun opacity 0.45  (7216, 7247)
                  └─ Border  ClipToBounds                   (7253)
                     └─ Grid  _calendarGrid                 (7257)
                        ScaleTransform _calendarScale + TranslateTransform _calendarTranslate
                        ├─ Grid  PART_MonthView  7 cols x 7 rows, all Auto  (7271-7294)
                        └─ Grid  PART_YearView   4 cols x 3 rows, all *     (7295-7311)
└─ Rectangle  PART_DisabledVisual            (7334)  Collapsed — NOT rendered in HTML
```

### Resolved dimensions

| Property | Value | Token | Source |
|---|---|---|---|
| Popup shadow bleed | 20px all sides | — | 7480 Margin=20 |
| Popup shadow | `0 0 20px` @ opacity 0.1 | `--shadow-lg` | BoxShadow.cs:12 Depth=20; LightTheme.xaml:2 |
| Popup offset from button | -20px X, -20px Y | — | 7605, 7609 (cancels the Margin=20) |
| Popup background | `#F5F5F5` | `--BackgroundPrimary` | 7126 |
| Popup border | **none** — see note | — | — |
| Grid area background | `#FFFFFF` | `--BackgroundStrong` | 7189 |
| Header row height | **44px** — see note | `--touch` | 7143 + 2643 |
| Header title margin | `1px 0 -1px 15px` | — | 7144 (`"15,1,0,-1"`) |
| Header title min width | **90px** | `--btn-min-width` | 2642 (implicit Button style) |
| Header title color | `#0075A1` | `--ForegroundAction` | 7149 |
| Prev / Next button | 40 wide x **44** tall — see note | `--icon-btn-lg` / `--touch` | 7159–7160, 7174–7175 + 2768 |
| Day-label row height | 40px | `--icon-btn-lg` | 7210 |
| Day-label divider | bottom 1px `#E0E6E6` @ opacity 0.5 | `--InnerLines` | 7205–7207 |
| Weekend label opacity | 0.45 | — | 7216, 7247 |
| Month grid | 7 cols x 7 rows (label row + 6 week rows) | — | 7276–7293 |
| Year grid | 4 cols x 3 rows | — | 7300–7310 |

**Total popup width:** 7 x 40px = **280px**. No border to add.

### Setters that never render

Five in total across the component. Do not port any of them.

| # | Setter | Declared | Why it's dead |
|---|---|---|---|
| 1 | Popup `BorderBrush` + `BorderThickness="1"` | 7688, 7690 | `Templates_Calendar` (7474–7490) never `TemplateBind`s either; `CalendarItem`'s Border (7126) sets `Background` only |
| 2 | TextBox `Padding="2,0"` | 634 | `Templates_OnDemandTextBox` never binds `Padding`. `_contentElement` uses `Margin="{TemplateBinding Tag}"` (385), and `Tag` is the Thickness `-2,0,0,-2` (635–637) — so the real inset is **negative** 2px left / 2px bottom |
| 3 | `SimpleIconButton Padding="0,3"` | 2769 | All three buttons here override with `Padding="0"` (7553, 7162, 7177) |
| 4 | `BlackoutDayStates` | 6914–6917 | Both `NormalDay` and `BlackoutDay` declared empty |
| 5 | `CalendarButtonFocusStates`, `ActiveStates` | 6902, 6906, 7033, 7037 | All four declared empty |

### Two corrections worth reading before you build

**The popup has no border.** `Styles_Calendar` sets `BorderBrush` (7688) and `BorderThickness="1"` (7690), but `Templates_Calendar` (7474–7490) is only `Grid > BoxShadow + StackPanel > CalendarItem` — it never `TemplateBinding`s either property, and `Templates_CalendarItem`'s outer Border (7126) sets `Background` only. Those two setters are dead. The popup is separated from the page by the shadow alone. Do not add a border.

**Header buttons are 44px tall, not 40px.** `Height="40"` is declared (7143, 7160, 7175) but WPF clamps height by `MinHeight`, and:

- prev/next use `Styles_SimpleIconButton`, which sets `MinHeight = TouchSize = 44` (2768) → render **40 x 44**
- `PART_HeaderButton` (7141) sets no `Style`, so it inherits the implicit `Button` style (2634–2645): `MinHeight` 44 (2643) and `MinWidth` 90 (2642) → **min 90 x 44**

So the header row is **44px**, not 40. This is exactly the kind of value that looks right in the XAML and renders wrong. Popup height math must use 44.

---

## 4. Element Map — Day Cell

`Templates_CalendarDayButton`, 6796–6945

```
Grid  _templateRoot                40x40, transparent            (6800-6804)
└─ Grid  Margin=6                  → 28x28 inner circle          (6806)
   ├─ Border  _selectedElement     --SelectionSecondary, r=50%, opacity 0   (6807)
   ├─ Border  _mouseOverElement    Margin=-3 → 34x34, opacity 0             (6814)
   │  └─ Border                    --MouseOverPrimary, r=50%, opacity 0.2   (6819)
   ├─ Border  _todayElement        --BackgroundStrong fill,
   │                               1px --InformationRed border,
   │                               r=50%, opacity 0.35, hidden by default   (6825)
   ├─ Border  _todaySelectedElement --InformationRed, r=50%, hidden          (6834)
   └─ ContentControl _dayContentContainer  centered, Margin.Top=-3           (6840)
      └─ ContentControl _dayContent → ContentPresenter (the number)          (6849)
```

| Property | Value | Token | Source |
|---|---|---|---|
| Cell | 40x40 | `--icon-btn-lg` | 6802–6803 |
| Inner circle | 28x28 (40 − 6x2) | — | 6806 |
| Hover circle | 34x34 (inner + 3 all round) | — | 6816 |
| Corner radius | `100000` → `border-radius: 50%` | — | 6810, 6821, 6830, 6837 |
| Number nudge | -3px vertical | — | 6846 |
| Day text | 14px / Condensed / 400, `#555555` | `--size-default`, `--ForegroundPrimary` | 7660; no font override anywhere in 6790–7500 |

**Open question C:** the 40px cell has no dedicated spacing token. The nearest exact match is `--icon-btn-lg: 40px`, which is semantically an icon-button size, not a grid cell. Add a `--calendar-cell: 40px` token, or reuse `--icon-btn-lg`?

**Open question D:** `Margin.Top="-3"` (6846) is a Mobius attached property compensating for Roboto Condensed's baseline inside a WPF `ContentControl`. Browsers center text differently. I'd rather drop it and center with flexbox, then compare against a screenshot. Confirm?

---

## 5. STATE MATRIX

### 5.1 Closed field — `DatePicker`

VisualStateGroups at 7619–7652.

| Group | State | Effect | Duration | Source |
|---|---|---|---|---|
| CommonStates | **Normal** | `_inputMouseOverBorder` opacity → 0; root opacity → 1 | 500ms (`--transition-mouse-out`) | 7621–7626 |
| | **MouseOver** | `_inputMouseOverBorder` opacity → 1 → border becomes `--MouseOverPrimary` `#0CD0FF` | 160ms (`--transition-mouse-over`) | 7627–7632 |
| | **Disabled** | root opacity → **0.35** (`--opacity-disabled`); hover border → 0 | 100ms (`--transition-disable`) | 7633–7638 |
| FocusStates | **Unfocused** | `_inputFocusBorder` opacity → 0 | 500ms (`--transition-unfocus`) | 7641–7645 |
| | **Focused** | `_inputFocusBorder` opacity → 1 → border `--MouseOverPrimary` | 160ms (`--transition-focus`) | 7646–7650 |

**No Pressed state** on the field itself.

**ReadOnly** is not a VisualState — it's a visibility binding. When `IsReadOnly=True`, both the hover and focus borders are `Collapsed` (7534, 7542), so the field never highlights. That part is solid.

The text-color half is **lower confidence**: `Styles_OnDemandTextBox` switches Foreground to `--ForegroundPrimary` on `IsReadOnly=True` (644), but the template never binds `IsReadOnly` from the `DatePicker` down to the inner `TouchTextBox` (7577–7584). It only works via WPF's inherited `TextEditor.IsReadOnly` metadata. **Worth a runtime check in the WPF app before we build on it** — see open question H.

Border color in **all** highlight states is `--MouseOverPrimary` (7531, 7539). Hover and focus look identical; only the transition duration differs.

**On-load state correction** (7502–7521). Two `common:DataTriggerEvaluateOnLoad` behaviors fire a `GoToStateAction` on `PART_Root` at load time, forcing `MouseOver` or `Normal` based on `IsMouseOver`. This exists because WPF VisualStates don't evaluate until first transition, so a field rendered under an already-parked cursor would come up unhighlighted. CSS `:hover` has no such gap — **nothing to build here.** Noted so you don't hunt for a matching state.

### 5.2 Calendar icon button + prev/next — `SimpleIconButton`

Template 1176–1242, style 2762–2772.

| State | Glyph color | Root opacity | Duration | Source |
|---|---|---|---|---|
| **Normal** | `--ForegroundPrimary` `#555555` | 1.0 | 500ms | template ~1200 |
| **MouseOver** | `--MouseOverPrimary` `#0CD0FF` | 1.0 | 160ms | |
| **Pressed** | `--MouseOverPrimary` `#0CD0FF` | 1.0 | 160ms | |
| **Disabled** | inherited | **0.35** | 100ms | |
| **Focused** | `--MouseOverPrimary` `#0CD0FF` | — | 160ms | |
| **Unfocused** | inherited | — | 500ms | |

No background, no corner radius. Also set by `Styles_SimpleIconButton`: `MinHeight` 44 (2768) and `Padding "0,3"` (2769) — and note the template applies Padding as an **outer margin** on `_templateRoot`, not inner padding.

**These buttons do have a focus ring.** `Styles_SimpleIconButton` sets `FocusVisualStyle` (2765) = `Styles_FocusVisualStyle` (DefaultControls.xaml:36–48), a **2px `--MouseOverPrimary` border** (`--border-width-focused`). So focus = 2px `#0CD0FF` ring **plus** the glyph recolor. The implicit `Button` style applies the same visual to `PART_HeaderButton` (2637).

### Header title button — `Templates_DateTitleButton` (7055–7123)

Different template from the icon buttons. Base color `--ForegroundAction` `#0075A1` (7149).

| State | Effect | Duration | Source |
|---|---|---|---|
| Normal | color → base; root opacity → 1.0 | 500ms | 7079–7084 |
| MouseOver | color → `--MouseOverPrimary` `#0CD0FF` | 160ms | 7085–7090 |
| Pressed | color → base; **root opacity → 0.8** (`--opacity-pressed`) | 160ms | 7091–7096 |
| **Disabled** | color → base; root opacity → **1.0 (no dimming)** | 100ms | 7097–7102 |
| Unfocused | color → base | 500ms | 7105–7109 |
| Focused | color → `--MouseOverPrimary` `#0CD0FF` | 160ms | 7110–7114 |

Plus `Trigger IsEnabled="False"` (7119–7121): `_content` Foreground → `--ForegroundPrimary` `#555555`.

**The disabled title is not dimmed.** Unlike every other surface here, its Disabled state animates opacity to 1.0 (7100). Disabled reads as a color change only — blue `#0075A1` → grey `#555555` — at full opacity. Deliberate in Master, so mirror it.

### 5.3 Day cell — `CalendarDayButton`

Six VisualStateGroups, one Trigger, two MultiTriggers. This is the dense part.

**CommonStates** (6862–6887)

| State | Effect | Duration |
|---|---|---|
| Normal | hover circle opacity → 0; root → 1 | 500ms |
| MouseOver | hover circle opacity → 1 (net alpha 0.2 of `#0CD0FF`) | 160ms |
| Pressed | same as MouseOver | 160ms |
| Disabled | root opacity → 0.35; hover circle → 0 | 100ms |

**SelectionStates** (6888–6901) — duration `00:00:00`, instant, no transition

| State | Effect |
|---|---|
| Unselected | `_selectedElement` opacity → 0; number → inherited |
| Selected | `_selectedElement` opacity → 1 (`--SelectionSecondary` `#0078A4` filled circle); number → `--SelectionForeground` `#FFFFFF` |

**DayStates + MultiTriggers** (6910–6913, 6924–6943) — the four-way today/selected matrix

| IsToday | IsSelected | Circle | Number color | Source |
|---|---|---|---|---|
| false | false | none | `--ForegroundPrimary` `#555555` | default |
| false | true | filled `--SelectionSecondary` `#0078A4` | `--SelectionForeground` `#FFFFFF` | 6895–6900 |
| **true** | **false** | `--BackgroundStrong` fill + **1px `--InformationRed` `#E62333` border**, whole layer at **opacity 0.35** | `--InformationRed` `#E62333` | 6924–6933 |
| **true** | **true** | filled `--InformationRed` `#E62333`, full opacity | `--SelectionForeground` `#FFFFFF` | 6934–6943 |

Today is **red**, not the selection blue. `IsTodayHighlighted=True` is on by default (7702).

**Inactive** (day from the adjacent month) — `Trigger IsInactive=True`, 6921–6923: number opacity → **0.25**. Note this is 0.25, *not* the 0.35 `--opacity-disabled`. No token exists for 0.25.

**BlackoutDayStates** (6914–6917) — `NormalDay` / `BlackoutDay` are both declared **empty**. Dates outside `DisplayDateStart`/`DisplayDateEnd` get no visual treatment from this template beyond WPF's own `IsEnabled=false` path (→ Disabled, opacity 0.35).

**CalendarButtonFocusStates** (6902–6905) and **ActiveStates** (6906–6909) — both declared empty. Day cells have **no focus ring**.

**Open question E:** empty `BlackoutDay` and empty focus states mean blackout dates and keyboard focus get no treatment on day cells. Note the scope: the icon buttons, prev/next, and header title **do** get a 2px `#0CD0FF` focus ring via `FocusVisualStyle` (§5.2) — it is only the day cells and month/year cells that have none. Tabbing into the grid shows nothing. That's a WCAG 2.4.7 gap. Mirror Master exactly, or add a ring and document the deviation?

### 5.4 Month / year cell — `CalendarButton`

Template 6947–7048. Same structure as the day cell with four differences:

| Difference | Day cell | Month/year cell |
|---|---|---|
| Size | fixed 40x40 (6802) | square, `Height` bound to own `ActualWidth` (6953) — fills the 4x3 grid |
| Inner margin | 6px (6806) | **10px** (6956) |
| Today layers | `_todayElement` + `_todaySelectedElement` | **absent** — no today concept, and `DayStates` / `BlackoutDayStates` groups are gone entirely |
| Baseline nudge | `common:Margin.Top="-3"` (6846) | **none** (6975–6981) |

States: CommonStates (6993–7018) and SelectionStates (7019–7032) identical to the day cell. Only four VisualStateGroups here, not six. `CalendarButtonFocusStates` (7033) and `ActiveStates` (7037) again **empty**.

`IsInactive=True` → content opacity → **0.35** `--opacity-disabled` (7044–7046). Different from the day cell's 0.25.

Load animation: fade 0 → 1 over **500ms** on Loaded (`Styles_CalendarButton`, 7670–7678).

### 5.5 View-mode states — `DisplayMode`

DataTriggers at 7418–7470. Three modes, each an entry animation on `_calendarGrid`.

| Mode | MonthView | YearView | Day labels row | Entry animation | Source |
|---|---|---|---|---|---|
| **Month** | Visible | Hidden | **Open** | opacity 0→1 over 500ms; scale 0.7→1.0 over 750ms `SmoothEase` EaseInOut | 7418–7434 |
| **Year** | Hidden | Visible | **Closed** | same | 7435–7452 |
| **Decade** | Hidden | Visible | **Closed** | same | 7453–7470 |

Year and Decade share `PART_YearView`; only the button content differs (months vs years). The `ExpanderItem` wrapping the day labels (7197) collapses its height in Year and Decade.

### 5.6 Navigation states — prev / next pressed

Triggers 7354–7417. Pressing prev/next slides the grid vertically via `_calendarTranslate.Y`, 3 keyframes over 500ms starting at 30ms:

| Trigger | Y keyframes | Easing | Source |
|---|---|---|---|
| **Next pressed** | 0ms: `60` → 150ms: `10` → 500ms: `0` | `QuinticEase` EaseOut on final frame | 7354–7385 |
| **Previous pressed** | 0ms: `-60` → 150ms: `-10` → 500ms: `0` | same | 7386–7417 |

The two storyboards mutually `RemoveStoryboard` each other (7356, 7388), so rapid clicking cancels rather than queues.

The header title button carries a `TranslateTransform` bound to the same `_calendarTranslate.Y` (7152–7154), so **the title slides in lockstep with the grid**.

### 5.7 Popup container states — `CalendarItem`

VisualStateGroup 7339–7350.

| State | Effect | Duration |
|---|---|---|
| Normal | `PART_Root` opacity → 1 | `00:00:00` instant |
| Disabled | `PART_Root` opacity → 0.35 `--opacity-disabled` | instant |

Plus a load animation on the inner Grid: opacity 0 → 1 over **300ms** on Loaded, removed on Unloaded (7316–7331).

---

## 6. State Count Summary

| Surface | States | Count |
|---|---|---|
| Closed field | Normal, Hover, Focus, Disabled, ReadOnly | 5 |
| Calendar icon button | Normal, Hover, Pressed, Focus (2px ring), Disabled | 5 |
| Header title button | Normal, Hover, Pressed (0.8), Focus, Disabled (no dimming) | 5 |
| Prev / Next buttons | Normal, Hover, Pressed, Focus (2px ring), Disabled | 5 |
| Day cell | Normal, Hover, Pressed, Disabled, Selected, Today, Today+Selected, Inactive, Blackout | 9 |
| Month / year cell | Normal, Hover, Pressed, Disabled, Selected, Inactive | 6 |
| View modes | Month, Year, Decade | 3 |
| Popup | Normal, Disabled | 2 |

**40 distinct visual states.** Recommend one HTML file with a state gallery (like `buttons/buttons.html`) rather than one live component, so every state is inspectable side by side.

---

## 7. Values With No Token — decisions needed

| Value | Where | Nearest token | Proposal |
|---|---|---|---|
| 40px cell / button width / label row | 6802, 7159, 7210 | `--icon-btn-lg: 40px` (exact) | reuse, or add `--calendar-cell` |
| 44px header row (clamped) | 7143 + 2643, 2768 | `--touch: 44px` (exact) | use `--touch` |
| 90px header title min width | 2642 | `--btn-min-width: 90px` (exact) | use token |
| 28px inner circle | 6806 derived | `--size-24` / `--size-36` | derive with `calc()`, don't hardcode |
| opacity 0.25 (inactive day) | 6922 | `--opacity-disabled: 0.35` | add `--opacity-inactive: 0.25` |
| opacity 0.2 (hover circle) | 6822 | none | add `--opacity-hover-fill: 0.2` |
| opacity 0.45 (weekend label) | 7216, 7247 | none | literal + comment |
| opacity 0.35 (today ring layer) | 6831 | `--opacity-disabled: 0.35` | coincidental match — use a literal, not the token |
| opacity 0.5 (day-label divider) | 7207 | none | literal + comment |
| 53px height (ErrorReport) | ErrorReport.xaml:261 | `--field-height: 44` / `-lg: 58` | literal + comment |
| 12px label / hint (ErrorReport) | ErrorReport.xaml:223, 270 | `--size-Sm: 11px` | literal + comment |
| 300ms / 500ms / 750ms animations | 7322, 7425, 7426 | `--transition-*` covers 500ms only | add `--transition-zoom: 750ms`, `--transition-load: 300ms` |

---

## 8. Open Questions — need answers before CSS

- **A.** Carry `margin: -4px 0 4px` from 7708, or drop it for Blazor layout?
- **B.** ErrorReport large variant — literal values, or add tokens? Also: is this variant even in scope, or do you only need the default?
- **C.** 40px cell — reuse `--icon-btn-lg` or add `--calendar-cell`?
- **D.** Drop the `Margin.Top="-3"` baseline nudge (6846) and center with flexbox?
- **E.** Master has **no focus ring** on day cells and **no blackout-day styling** (both VisualStates are empty). Mirror Master exactly, or add them and document the deviation?
- **F.** Collapse the three stacked hover/focus Borders (7522/7528/7536) into one element? Deviates from the preserve-nesting rule.
- **G.** Should the 40-state gallery live in one file, or split field / popup into two?
- **H.** Can you check the running WPF app: does a **read-only** DatePicker show its date in grey `#555555` or blue `#0075A1`? The XAML doesn't bind `IsReadOnly` to the inner text box, so this depends on WPF inherited metadata (§5.1). One screenshot settles it.
- **I.** `PART_MonthView` declares **seven** `Auto` rows (7285–7293) while `CalendarItem` also ships its own 7-column `UniformGrid` of day labels (7209). Stock WPF generates day titles into row 0 of `PART_MonthView` — if that still happens here, Master's month view is one 40px row taller than the HTML, or the labels are doubled. Can't be resolved from XAML. A screenshot of the open popup settles it.
- **J.** Day cells carry `aria-label` / `aria-current` / `aria-pressed`, but a full `role="grid"` tree needs six row wrappers the flat CSS grid doesn't have. Add them for screen-reader row/column position, or leave the cells as a labelled button list?

### Build notes — where the CSS deviates

Four places where a faithful port wasn't possible or wasn't wise. All are commented in `date-picker.css`.

| Deviation | Why |
|---|---|
| Three stacked hover/focus Borders (7522/7528/7536) collapsed to one element | All three paint the same color; CSS can't cross-fade two independent borders, and doesn't need to |
| `scale` / `translate` used instead of `transform` | XAML puts `ScaleTransform` + `TranslateTransform` in one `TransformGroup` (7261–7269) and drives them separately. A single `transform` shorthand can't express that — the zoom would cancel the nav slide |
| Popup load fade sits on the host, not an inner Grid | XAML attaches it to the inner Grid (7316–7331). Matching exactly would need a wrapper with no other purpose, so the shadow fades in too |
| `--shadow-lg` alpha is 0.133, XAML `ShadowOpacity` is 0.1 | Pre-existing gap between `box-shadow.css` and `LightTheme.xaml:2`. The shadow renders ~33% stronger than Master. Flagged, not forked — fixing it belongs in the shadow tokens, not here |

### Verification note

This spec was checked line-by-line against Master after drafting. Fourteen corrections were applied, two of them substantive: the popup has **no border** (dead setters), and the header row renders **44px, not 40px** (MinHeight clamping). Both were plausible-looking XAML that renders differently than it reads — worth knowing if you compare this spec against an older draft.

---

## 9. Not In Master — do not invent

Things a designer might expect that **are not** in the XAML. Do not add without a decision:

- Time picker inside the DatePicker. Master pairs a **separate** `common:TimePicker` or `common:ClockBasedTimePicker` beside it (DatabaseExportControl.xaml:119; ErrorReport.xaml:273).
- Range selection. `Calendar.SelectionMode` is never set — WPF default is `SingleDate`.
- "Today" / "Clear" footer buttons. No footer exists in `Templates_CalendarItem`.
- Week numbers.
- Month/year dropdowns in the header. Navigation is the title button (cycles DisplayMode) plus up/down arrows only.
- Left/right chevrons. Master uses up/down (§1).
- Placeholder text in the closed field. `Templates_OnDemandTextBox` (359+) contains **no placeholder element at all** — the `_placeholderTextElement` / `PlaceholderStates` machinery lives only in the two earlier TextBox templates (110–111, 183–189, 269–270, 343–349). A placeholder could not render even if one were set. With a null date the field is **empty**, not hinted.
- A border on the popup. Two setters exist but are never bound (§3).

---

## 10. Chrome Preview

- Spec: `file:///Users/0494/sites/ClaudProjects/MobiusWPFtoBlazerMarkup/Mobius%20WPF%20to%20Blazer%20Markup/Mobius2Blazor/specs/DatePicker-SPEC.md`
- Master source: `file:///Users/0494/sites/ClaudProjects/MobiusWPFtoBlazerMarkup/Mobius%20WPF%20to%20Blazer%20Markup/mobius-master/Common/Asi.Resources.Client.UI/DefaultControls.xaml`
