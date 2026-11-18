# ImageConfirmationControl — Component Spec

**Source:** `mobius-master/Plugins/Agriculture/Common/ImageConfirmation/Asi.ImageConfirmation.Client/ImageConfirmationControl.xaml` (382 lines)
**Code-behind:** `ImageConfirmationControl.xaml.cs`
**Instance under spec:** `ObstacleDetection/ImageConfirmationObstacleControl.xaml` — the map-spawned obstacle popup
**Theme:** LightTheme
**Type:** Modal confirmation dialog, remote operator reviews vehicle camera images

Short name used below: `ICC.xaml` = `ImageConfirmationControl.xaml`.

---

## 1. Instance configuration

Set by `ImageConfirmationObstacleControl.xaml:23-35`:

| Property | Value | Line |
|---|---|---|
| `AlwaysOpen` | `True` | :24 |
| `CanConfirmImages` | `True` | :25 |
| `ClassifyCommand` | `{Binding ConfirmImages}` | :26 |
| `ClearObstacleInstructions` | `{Binding ClearObstacleInstructions}` | :27 |
| `HeaderText` | `LocalizedText.ImageConfirmation.ObstacleDetected` | :28 |
| `Images` | `{Binding Images}` | :29 |
| `PushCommand` | `{Binding ConfirmImages}` | :30 |
| `PushCommandText` | `LocalizedText.ImageConfirmation.Done` | :31 |
| `Ready` | `True` | :32 |
| `RequireImageConfirmation` | `True` | :33 |
| `Timeout` | `1` | :34 |

### What AlwaysOpen="True" changes

| Behavior | Effect | Line |
|---|---|---|
| `AdornerDecorator#ConfirmationDecorator` | Visible; `Popup#ConfirmationPopup` collapsed | ICC.xaml:366-375, :344-350 |
| `_closeButton` (header X) | **Collapsed** via `InverseBoolToVisibilityConverter` | ICC.xaml:62 |
| Click outside | No close — `WindowOnPreviewMouseDown` guards `!AlwaysOpen` | .cs:469 |
| 60s auto-timeout | No close — `TimerOnTick` guards `!AlwaysOpen` | .cs:509 |
| Mouse wheel | No close | .cs:417 |
| Window resize | No close | .cs:475 |
| `CloseButtonCommand` | Collapses the decorator — **the only exit** | .cs:436 |

`Ready="True"` collapses `ProgressRadial` (ICC.xaml:117-125) and enables every gated button.

---

## 2. Resolved dimensions

The dialog is a `ContentControl` templated by `ConfirmationInternals` (ICC.xaml:26-323).

| Element | Value | Source |
|---|---|---|
| `ConfirmationPopupGrid` margin | `20` on all sides — shadow bleed room, not visible chrome | ICC.xaml:29-32 |
| Dialog background | `BackgroundStrong` → `#FFFFFF` | ICC.xaml:38 |
| **Dialog width** | **490px** = Content `Width="450"` + `Margin="20"` each side | ICC.xaml:126-128 |
| Outer grid rows | 5 × `Auto`. Rows 3 and 4 are never populated | ICC.xaml:39-45 |
| `ProductivityStatusIndicator` | `Width=7 Height=70`, top-left, `ProductivityStatus="Warning"` | ICC.xaml:46-53 |
| Header margin | `20,20,20,10` | ICC.xaml:71-75 |
| Header icon | `Width=50 Height=40`, `Stretch="Fill"` on a 20×20 geometry → non-uniform 2.5× / 2× | ICC.xaml:80-89 |
| Header text margin | `15,0` | ICC.xaml:91 |
| Banner margin | `20,0`, `Orientation="Horizontal"` | ICC.xaml:98-102 |
| Banner icon | No explicit size → natural geometry 20×20; `Margin="5"` | ICC.xaml:103-109 |
| Content grid | `Width=450`, `Margin=20` | ICC.xaml:126-128 |
| Row gaps inside content | `GridLengths_FieldToField` → **14px** (`--spacing-field-to-field`) | ICC.xaml:139-145, :281-287 |
| Carousel image pitch | `_imageWidth = 450` | .cs:35 |
| Buttons row margin | `20,0,20,20` | ICC.xaml:199-201 |

### Box shadow

`common:BoxShadow Margin="2"`, `Opacity="{ShadowOpacity}"` (ICC.xaml:33-36).

| Property | Value | Source |
|---|---|---|
| `ShadowOpacity` (LightTheme) | `0.1` | `LightTheme.xaml:2` |
| Template inner opacity | `0.5` → effective black alpha `0.05` | `BoxShadow.xaml:22` |
| `CellSize` default | `20` | `BoxShadow.cs:10` |
| `EdgeMargin` default | `-20` (bleeds outward) | `BoxShadow.cs:11` |
| `GradientStart` default | `0` | `BoxShadow.cs:14` |
| Structure | 3×3 grid: solid center, 4 linear-gradient edges, 4 radial-gradient corners | `BoxShadow.xaml:18-140` |

---

## 3. Typography

Root style `Mobius_UI_Resources_Styles_Font_Default` (`Typography.xaml:20-24`): `FontStretch="Condensed"`, `FontSize="14"`, `FontWeight="Regular"`, family = `MobiusFontFamily` → `./Themes/Fonts/#Roboto` (`App.xaml.cs:47`).

| Use | Style | Resolved | Token | Source |
|---|---|---|---|---|
| Header "Obstacle detected" | `TextBlock_HeadingLg` | Roboto, stretch **Normal**, 36px, weight **Thin (100)** | `--font-hdrLg` | `Typography.xaml:47-51` |
| Banner question | `TextBlock_HeadingMd` | Roboto, stretch **Normal**, 24px, weight **Light (300)** | `--font-hdrMd` | `Typography.xaml:53-57` |
| Body, timeout, buttons | root default | Roboto **Condensed**, 14px, weight 400 | `--font-default` | `Typography.xaml:20-24` |

Global TextBlock defaults (`Typography.xaml:32-38`): `TextWrapping="NoWrap"`, `TextTrimming="CharacterEllipsis"`, `LineStackingStrategy="BlockLineHeight"`. Only the three instruction TextBlocks override with `TextWrapping="Wrap"` (ICC.xaml:292, :298, :306). **The header and banner ellipsize rather than wrap.**

---

## 4. Colors

| Element | Brush | LightTheme value |
|---|---|---|
| Dialog bg | `BackgroundStrong` | `#FFFFFF` |
| All text | `ForegroundInvertPrimary` | `#555555` |
| Status bar, both icons | `InformationOrange` | `#FF8000` |
| Filled button bg | `SelectionPrimary` | `#009FDA` |
| Filled button text | `SelectionForeground` | `#FFFFFF` |
| Outline button border + text | `ForegroundPrimary` | `#555555` |
| Carousel dots | `SelectionSecondary` | `#0078A4` |
| `Back` link | `ForegroundAction` | `#0075A1` |
| Dots edge border | `InnerLineDividers` | `rgba(0,0,0,0)` — **invisible in LightTheme** |

---

## 5. Buttons

| Style | Bg | Fg | Border | MinHeight | Padding | Radius | Source |
|---|---|---|---|---|---|---|---|
| Default `Button` | `SelectionPrimary` | `SelectionForeground` | none | `TouchSize` 44px | `22,1,22,0` | 0 | `DefaultControls.xaml:2639-2643` |
| `OutlineButton` | Transparent | `ForegroundPrimary` | 1px = Foreground | `TouchSize` 44px | `22,1,22,0` | 0 | `:2881-2887`, template `:1013-1018` |

---

## 6. Carousel dots

`ListBox#ImageDots`, `Margin="16,0"`, centered, style `HorizontalDotListBox` (ICC.xaml:175-183).

| Property | Value | Source |
|---|---|---|
| Item template | `Templates_ListBoxItemDotHorizontal` | `DefaultControls.xaml:4874` |
| Dot size | `16 × 16` ellipse, `Margin="8"` → 32px item pitch | `:4009-4013` |
| Unselected | `Fill="Transparent"`, `Stroke=SelectionSecondary`, `StrokeThickness=1` | `:4014-4016` |
| Selected | `Fill=SelectionSecondary` | `:4023` |
| Panel | `ItemsPanelTemplateHorizontal` | `:4841` |

---

## 7. Content states

Mutually exclusive, driven by `ConfirmationState` (.cs:193-199). All three sit in the same 450px `Content` grid (ICC.xaml:126).

### 7.1 ReviewingImages (ICC.xaml:129-236)

Rows: `Auto / 14 / Auto / 14 / Auto / 14 / Auto`

| Row | Element | Notes |
|---|---|---|
| 0 | `ScrollViewer#ImageCarousel` | Horizontal `StackPanel` of `Image` bound to `BitmapImage`, scrollbar hidden |
| 2 | `Grid#Dots` | `ListBox#ImageDots` + invisible `ShadowEdgeBorderVertical` |
| 4 | Timeout `TextBlock` | `StringFormattingConverter(Timeout, "{0} seconds remaining")` → with `Timeout="1"`, renders **"1 seconds remaining"** |
| 6 | `Grid#Buttons` | 5 columns: `* Auto * Auto *`, each button `Margin.Horizontal="20"` |

Buttons left to right:

| Button | Content | Style | Command | Enabled by | Rendered here? | Line |
|---|---|---|---|---|---|---|
| Col 0 | `No` | Outline | `NoObstacleCommand` | `CanConfirmImages` | yes | :210-217 |
| Col 2 | `NotSureButton` → `Unsure` | Outline | `RequestImagesCommand` | `Ready` | **no — Collapsed** | :218-227 |
| Col 4 | `Yes` | Default filled | `ObstaclePresentCommand` | `CanConfirmImages` | yes | :228-234 |

**`Unsure` does not exist in the obstacle-detected configuration.** Its `Visibility` binds to
`RequestImagesCommand` through `NullToVisibilityConverter` (ICC.xaml:227). The property's
`DependencyProperty` default is `null` (.cs:42) and `ImageConfirmationObstacleControl.xaml`
never sets it, so the converter returns `NullValue = Visibility.Collapsed`
(`NullToVisibilityConverter.cs:10, 26`).

Five other host controls *do* set it, which is why the button exists in the codebase at all:
`ObjectiveConfirmButton` (:45), `ClearEstopButton` (:27), `PlayPauseButton` (:48),
`PowerButton` (:36), and the asset-list variants of each.

Collapsing the *button* does not collapse its *column*. WPF divides star space by the
`ColumnDefinition` list, not by content, so the row stays three equal columns:

```
row inner width  = 450 − 40 (Margin="20,0,20,20")  = 410
each star column = 410 / 3                         = 136.67
each button      = 136.67 − 40 (Margin.Horizontal) =  96.67
```

So the visual result is `No` at the left edge, an empty 136.67px column in the middle, and
`Yes` at the right edge — **not** two wide buttons splitting the row.

### Button behavior (relevant to markup only insofar as it changes state)

| Button | Handler | Effect |
|---|---|---|
| `No` | `NextImage` (.cs:74, 355-366) | Advances the carousel. **Only on the last image** does it set state `ConfirmingNoObstacles`, classification `None`, and fire `ActionButtonPressed()`. It is not a single-click "all clear." |
| `Yes` | `ObstaclePresent` (.cs:330-334) | Sets classification `Other`, moves to `ClassifyingImage` |
| Classification | `ObstacleClassified` (.cs:336-342) | Sets classification, fires `ClassifyCommand` |

Dead code worth knowing about: `RefreshImagesPressed` (.cs:318-322) resets state and then
executes `RequestImagesCommand`. Nothing wires it up — the `Unsure` button binds `Command`
straight to `RequestImagesCommand` (ICC.xaml:223). So in the host controls where `Unsure`
*is* visible, clicking it skips the local state reset.

### 7.2 ClassifyingImages (ICC.xaml:237-268)

Rows: `Auto / * / Auto`

Row 0 is an `ItemsControl` over `ListOfObstacleClassifications`. Per .cs:86-89, that is the `ObstacleClassification` enum minus `None`, ordered by `DisplayOrder()`:

| Order | Enum | Display string |
|---|---|---|
| 1 | `Person` | Person |
| 2 | `Vehicle` | Vehicle |
| 3 | `UnmappedObject` | **Stationary Object** |
| 4 | `Other` | Other |

Source: `ObstacleClassification.cs:8-18`, strings from `Languages/EN-US/LocalizedText.xaml:15-18`.

Each item: default filled `Button`, `Margin.Horizontal="20"`, `Margin.Vertical="10"`, `CommandParameter="{Binding}"` (:250-260).

Row 2: `Back`, `LinkButton` style, `Margin.Left="20"`, `Margin.Top="10"`, `GoBackToReviewCommand` (:262-267).

### 7.3 ShowClearObstacleInstructions (ICC.xaml:269-317)

Inner grid `Width="450"`, rows `Auto / 14 / Auto / 14 / Auto / 14 / Auto`.

| Row | Content | Gated by | Line |
|---|---|---|---|
| 0 | "Remove the obstacle." | always | :288-293 |
| 2 | "Reset the system by moving the Auto/Manual switch to Manual and then back to Auto." | `ShowResetInstructions` | :294-300 |
| 4 | `ClearObstacleInstructions` | non-null | :301-308 |
| 6 | `Close` button, filled, `Margin.Horizontal="20"` → 410px wide | `Ready` | :309-315 |

**This state has variants.** Two independent conditions:

- `ShowResetInstructions => ConfirmedObstacleClassification != Other` (.cs:201). So row 2 shows for Person, Vehicle, and Stationary Object; hides for Other.
- `GetClearObstacleInstructions` returns the Person string for `Person` and `""` for everything else (`ImageConfirmationToolTipUtilities.cs:52-59`). `NullToVisibilityConverter` treats `string.Empty` the same as `null` — `if (value == null || string.Empty.Equals(value))` (`NullToVisibilityConverter.cs:26`) — so row 4 is **Collapsed**, not visible-and-empty, for every classification except Person.

| Classification | Row 0 | Row 2 reset | Row 4 | Visible rows |
|---|---|---|---|---|
| Person | yes | yes | "Verbally instruct the person to stay at least 10 meters from the mower." | 3 |
| Vehicle | yes | yes | collapsed | 2 |
| Stationary Object | yes | yes | collapsed | 2 |
| Other | yes | **no** | collapsed | 1 |

Because the row gaps are `RowDefinition` heights rather than element margins, a collapsed
TextBlock still leaves its 14px gap row in place. The Other variant renders one line of text
followed by 28px of empty rows before the Close button.

---

## 8. Element mapping

```
Grid#ConfirmationPopupGrid                  .ic-shadow-frame      (Margin=20)
 ├─ common:BoxShadow                        .ic-shadow
 └─ Grid (bg BackgroundStrong, 5 rows)      .ic-dialog
      ├─ ProductivityStatusIndicator        .ic-status-bar
      ├─ Button#_closeButton                omitted — collapsed by AlwaysOpen
      ├─ Grid#Header (row 0, 2 cols)        .ic-header
      │    ├─ Path Icon_ObstacleDetected    .ic-header-icon      (inline SVG)
      │    └─ TextBlock HeaderText          .ic-header-text
      ├─ StackPanel#Banner (row 1)          .ic-banner
      │    ├─ Path Icon_Status_Info         .ic-banner-icon      (inline SVG)
      │    └─ TextBlock IsThereAnObstacle   .ic-banner-text
      ├─ ProgressRadial (row 2)             omitted — collapsed by Ready="True"
      └─ Grid#Content (row 2, 450px)        .ic-content
           ├─ Grid#ReviewingImages          .ic-reviewing
           │    ├─ ScrollViewer#ImageCarousel  .ic-carousel
           │    │    └─ ItemsControl / Image   .ic-carousel-track / .ic-image
           │    ├─ Grid#Dots                   .ic-dots
           │    │    ├─ ListBox#ImageDots      .ic-dot-list / .ic-dot[.is-selected]
           │    │    └─ Border ShadowEdge      omitted — transparent in LightTheme
           │    ├─ TextBlock timeout           .ic-timeout
           │    └─ Grid#Buttons                .ic-review-buttons
           ├─ Grid#ClassifyingImages        .ic-classifying
           │    ├─ ItemsControl                .ic-classify-list
           │    └─ Button Back                 .ic-link-button
           └─ Grid#ShowClearObstacleInstr   .ic-instructions
                └─ Grid (450px)                .ic-instructions-inner
```

Two elements are intentionally omitted rather than rendered hidden: `_closeButton` and `ProgressRadial`. Both are `Visibility="Collapsed"` in this exact configuration, and the project rule bans purposeless elements. `ShadowEdgeBorderVertical` is omitted for the same reason — `InnerLineDividers` is `rgba(0,0,0,0)` in LightTheme.

---

## 9. Invented or unverifiable

Nothing here traces to master. Flagged so it can be replaced.

| # | Item | Why it's invented | What would resolve it |
|---|---|---|---|
| 1 | **Camera image** | `Source="{Binding BitmapImage}"` is runtime vehicle data (ICC.xaml:164). Placeholder is a CSS-drawn field scene. | A real captured frame |
| 2 | **Image height** | Master sets no `Height` and no `Stretch` on `Image`; WPF sizes to the bitmap's natural height. Used 253px to hold 16:9 at 450px wide. | The actual camera resolution |
| 3 | **Dot count = 3** | `Images.Count` is runtime. | Real `ImageConfirmationDto.Images` count |
| 4 | **Shadow falloff** | CSS can't do a WPF 9-slice with independent corner radial gradients. Approximated with layered `radial-gradient`/`linear-gradient` at the correct 0.05 effective alpha and 20px cell. | Nothing — structural CSS limit |
| 5 | **`Margin.Horizontal` / `Margin.Vertical` semantics** | Read as symmetric left/right and top/bottom. Not verified against `Asi.CommonControls.Client.UI.Margin`. | Read the `Margin` attached-property source |
| 6 | **`GridLengths_FieldToField` = 14px** | Taken from `spacing-tokens.css`, not found as a XAML resource declaration in the files read. | Locate the `GridLength` resource in master |
| 7 | **Timeout reads "1 seconds remaining"** | Grammatically wrong but literally what `Timeout="1"` + `"{0} seconds remaining"` produces. Rendered as-is rather than corrected. | Confirm whether `Timeout` is seconds or minutes |

## 10. Not yet verified against the running app

No screenshot of Mobius was available. Everything above is derived from XAML, code-behind, and token files. WPF resolves `Height="Auto"` rows by measuring content at runtime; those measurements are predicted, not observed. Outstanding:

- Actual rendered heights of the three content states
- Whether the header ellipsizes at 490px with this string
- Confirmation that LightTheme is the running theme
- DPI scaling (1 WPF unit = 1 CSS px only at 100%)
