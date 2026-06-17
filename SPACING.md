# Mobius Spacing & Layout Grid Reference

> **Sources:** `Common/Asi.Resources.Client.UI/Themes/Sizes/Sizes.xaml`, `SizesNew.xaml`, `DefaultControls.xaml`, and component XAML files across `Asi.CommonControls.Client.UI` / `Asi.CustomControls.Client.UI`.
> **CSS tokens:** `Mobius Color Tokens/spacingTokens.css`

---

## 1. Size Scale (SizesNew.xaml — 8-point grid)

Use these for everything **under 64px**. This is the replacement scale for legacy hardcoded values.

| XAML Key | Value | CSS Token |
|---|---|---|
| `Sizes_Doubles_Size1` | 1px | `--size-1` |
| `Sizes_Doubles_Size3` | 3px | `--size-3` |
| `Sizes_Doubles_Size6` | 6px | `--size-6` |
| `Sizes_Doubles_Size12` | 12px | `--size-12` |
| `Sizes_Doubles_Size18` | 18px | `--size-18` |
| `Sizes_Doubles_Size20` | 20px | `--size-20` |
| `Sizes_Doubles_Size24` | 24px | `--size-24` |
| `Sizes_Doubles_Size36` | 36px | `--size-36` |
| `Sizes_Doubles_Size44` | 44px | `--size-44` |
| `Sizes_Doubles_Size56` | 56px | `--size-56` |

---

## 2. Spacing Tokens (Sizes.xaml + SizesNew.xaml)

Named semantic spacing values used as GridLengths (for grid column/row gaps) and margins.

| XAML Key | Value | CSS Token | Context |
|---|---|---|---|
| `Sizes_Doubles_FieldSpacing` | 18px | `--spacing-field` | Vertical gap between form fields |
| `Sizes_Doubles_ItemSpacing` | 1px | `--spacing-item` | Gap between list items |
| `GridLengths_FieldToField` | 14px | `--spacing-field-to-field` | Legacy field-to-field gap |
| `GridLengths_LabelToControlDistanceSmall` | 4px | `--spacing-label-to-control-sm` | Tight label-to-input gap |
| `GridLengths_LabelToControlDistance` | 10px | `--spacing-label-to-control` | Standard label-to-input gap |
| `GridLengths_LabelToControlDistanceMedium` | 16px | `--spacing-label-to-control-md` | Medium label-to-input gap |
| `GridLengths_LabelToControlDistanceLarge` | 24px | `--spacing-label-to-control-lg` | Large label-to-input gap |
| `GridLengths_SectionToHeaderDistance` | 24px | `--spacing-section-to-header` | Distance from section content to section header |
| `GridLengths_SectionToSectionDistance` | 40px | `--spacing-section-to-section` | Distance between major sections |
| `GridLengths_GapSmall` | 1px | `--spacing-gap-sm` | Hairline gap (dividers) |
| `GridLengths_GapLarge` | 10px | `--spacing-gap-lg` | Large gap |

---

## 3. Padding Tokens (Sizes.xaml Thickness resources)

> **XAML Thickness order:** Left, Top, Right, Bottom
> **CSS shorthand order:** Top, Right, Bottom, Left

| XAML Key | XAML Value | CSS Token | CSS Value |
|---|---|---|---|
| `Thicknesses_PaddingAllSmall` | `5` (all sides) | `--padding-all-sm` | `5px` |
| `Thicknesses_PaddingTopBottomSmall` | `0,5` | `--padding-tb-sm` | `5px 0` |
| `Thicknesses_PaddingLeftRightMedium` | `10,0` | `--padding-lr-md` | `0 10px` |
| `Thicknesses_PaddingLeftRightLarge` | `20,0` | `--padding-lr-lg` | `0 20px` |
| `Thicknesses_PaddingTopBottomMedium` | `0,10` | `--padding-tb-md` | `10px 0` |
| `Thicknesses_PaddingLeftMedium` | `10,0,0,0` | `--padding-left-md` | `0 0 0 10px` |
| `Thicknesses_PaddingLeftLarge` | `20,0,0,0` | `--padding-left-lg` | `0 0 0 20px` |
| `Thicknesses_PaddingRightMedium` | `0,0,10,0` | `--padding-right-md` | `0 10px 0 0` |
| `Thicknesses_PaddingStackedFieldToField` | `0,14,0,0` | `--padding-stacked-field` | `14px 0 0 0` |
| `Thicknesses_PaddingCheckboxIndent` | `30,0,0,0` | `--padding-checkbox-indent` | `0 0 0 30px` |
| `Thicknesses_LargeButtonPadding` | `24,16` | `--padding-btn-lg` | `16px 24px` |
| `Thicknesses_LargeIconButtonPadding` | `24,1,24,0` | `--padding-icon-btn-lg` | `1px 24px 0 24px` |

---

## 4. Margin Tokens (Sizes.xaml Thickness resources)

| XAML Key | XAML Value | CSS Token | CSS Value | Context |
|---|---|---|---|---|
| `Thicknesses_FieldToField` | `0,0,0,14` | `--margin-field-to-field` | `0 0 14px 0` | Bottom margin on each form field |
| `Thicknesses_SectionToHeader` | `0,0,0,24` | `--margin-section-to-header` | `0 0 24px 0` | Bottom margin before section header |
| `Thicknesses_MasterDetailsListContentMargin` | `40,0` | `--margin-master-list-content` | `0 40px` | Left/right inset on master list content |
| `Thicknesses_MasterDetailsListMargin` | `40,0,0,0` | `--margin-master-list` | `0 0 0 40px` | Left offset of Add button in master list |
| `Thicknesses_ModeSectionTitleMargin` | `36,0,0,33` | `--margin-mode-section-title` | `0 0 33px 36px` | Mode nav section title margin |
| `Thicknesses_ModeSectionLargeMargin` | `40` (all sides) | `--margin-mode-section-lg` | `40px` | Large mode section outer margin |
| `Thicknesses_BrandHeightOffset` | `0,113,0,0` | `--margin-brand-offset` | `113px 0 0 0` | Top margin that pushes content below brand area |

---

## 5. Field & Panel Sizing

| XAML Key | Value | CSS Token | Context |
|---|---|---|---|
| `GridLengths_FieldHeight` | 44px | `--field-height` | Standard input height |
| `Doubles_FieldRowMinHeight` / `GridLengths_FieldHeightLarge` | 58px | `--field-height-lg` | Large field row min height |
| `Doubles_FieldLabelMinWidth` / `GridLengths_FieldLabelMinWidth` | 130px | `--field-label-min-width` | Minimum label column width |
| `Doubles_FieldLabelStandardSize` / `GridLengths_FieldLabelWidth` | 180px | `--field-label-width` | Standard label column width |
| `GridLengths_FieldInputStandardWidth` | 220px | `--field-input-width` | Standard input column width |
| `Doubles_FieldMaxWidth` / `GridLengths_FieldMaxWidth` | 300px | `--field-max-width` | Max field width |
| `Doubles_DropdownPopupMaxWidth` | 300px | `--dropdown-max-width` | Max dropdown popup width |
| `Doubles_FirstPanelMinWidth` | 312px | `--panel-first-min-width` | Min width of first panel in split layout |
| `Sizes_Column_Width` | 300px | `--panel-column-width` | Standard panel column width |
| `Sizes_Header_Height` | 132px | `--panel-header-height` | Panel header height |
| `Doubles_OnObjectUIWidth` | 400px | `--panel-on-object-ui` | On-object UI panel width (Double) |
| `GridLengths_OnObjectUIWidth` | 320px | `--panel-on-object-ui-grid` | On-object UI panel width (GridLength) |
| `GridLengths_MasterDetailsMasterListWidth` | 236px | `--panel-master-list-width` | Master list column width in MasterDetailControl |
| `GridLengths_ModeSectionTitleHeight` | 158px | `--panel-mode-section-title` | Mode section title height |
| `Doubles_MaxLabelWidth` | 500px | `--label-max-width` | Max label TextBlock width |
| `Doubles_MinWindowContentWidth` | 600px | `--min-window-width` | Minimum window content width |
| `Doubles_MinWindowContentHeight` | 300px | `--min-window-height` | Minimum window content height |
| `Doubles_BrandHeightOffset` | 113px | — | Brand logo height — caps top section in sidebar |

---

## 6. Touch & Icon Sizes

### Touch Targets

| XAML Key | Value | CSS Token | WCAG Note |
|---|---|---|---|
| `Doubles_TouchSizeSm` | 36px | `--touch-sm` | Below WCAG AA minimum |
| `Doubles_TouchSize` | 44px | `--touch` | WCAG AA minimum (44×44) |
| `Doubles_TouchSizeLg` | 56px | `--touch-lg` | Comfortable touch target |

### Icon Sizes

| XAML Key | Value | CSS Token | Context |
|---|---|---|---|
| `Doubles_IconAdorner` | 8px | `--icon-adorner` | Badge / status dot |
| `Doubles_IconSm` | 12px | `--icon-sm` | Small icon |
| `Doubles_Icon` | 20px | `--icon` | Standard icon |
| `Doubles_IconLg` | 32px | `--icon-lg` | Large icon |
| `GridLengths_IconButtonSize` | 20px | `--icon-btn` | Icon inside icon button |
| `GridLengths_IconButtonSizeLarge` | 40px | `--icon-btn-lg` | Large icon button |

---

## 7. Border Widths

| XAML Key | Value | CSS Token | Context |
|---|---|---|---|
| `Doubles_BorderWidth` | 1px | `--border-width` | Default border |
| `Doubles_FocusedWidth` | 2px | `--border-width-focused` | Focus ring |
| `Doubles_SelectedWidth` | 4px | `--border-width-selected` | Selected state indicator |
| `Doubles_LineSize` | 1px | `--line-size` | Dividers and separators |

---

## 8. Button Defaults (DefaultControls.xaml)

All button MinHeight values reference `TouchSize` (44px) from SizesNew.

| Style | MinWidth | MinHeight | Padding (XAML L,T,R,B) | CSS Padding |
|---|---|---|---|---|
| `Button` (default) | 90px | 44px | `12,1,12,0` | `1px 12px 0 12px` |
| `Styles_ButtonLarge` | — | 44px | `22,1,22,0` | `1px 22px 0 22px` |
| `Styles_ButtonXLarge` | — | 60px | `60,1,60,0` | `1px 60px 0 60px` |
| `Styles_SimpleIconButton` | — | 44px | `0,3` | `3px 0` |
| `Styles_IconButton` | — | 44px | `0,3` | `3px 0` |
| `Styles_WindowControlIconButton` | 50px | 50px | `0` | `0` |
| `OutlineButton` (template) | — | — | `22,1,22,0` | `1px 22px 0 22px` |

---

## 9. Grid Layouts — Major Components

### 9.1 ModeLayout (sidebar + main content)
**Source:** `Asi.CustomControls.Client.UI/ModeLayout.xaml`

```
Col 0: Auto  (MinWidth=60)   ← sidebar nav
Col 1: *                     ← content area
```

Sidebar inner rows:
```
Row 0: *    MinHeight=13, MaxHeight=113px (BrandHeightOffset) ← brand area
Row 1: Auto                                                    ← ModeCommands
Row 2: *                                                       ← filler
Row 3: Auto                                                    ← LowerModeCommands
```

> The sidebar has no fixed width — it sizes to its content. MinWidth is 60px. BrandHeightOffset (113px) caps the top flex row, pushing nav commands below the brand logo.

---

### 9.2 MasterDetailControl (list + detail)
**Source:** `Asi.CommonControls.Client.UI/MasterDetailControl.xaml`

```
Col 0: 236px   ← master list (MasterDetailsMasterListWidth)
Col 1: *       ← detail panel
```

Master list:
- List `Padding="0,27"` — 27px top/bottom inset on scroll area
- `ListBoxItem Padding="30,0"` — 30px left/right per item
- `ListBoxItem MinHeight="44"` — standard touch target

Add button:
- `Margin="{MasterDetailsListMargin}"` → `40,0,0,0` (40px left offset)

No-items / no-selection content:
- `Margin="20,-1,0,1"` — 20px left, slight vertical adjustment

Delete bar:
- `MinHeight="70"` (SizingObjectMarginHeight local resource)

---

### 9.3 SplitPanel — Horizontal
**Source:** `Asi.CommonControls.Client.UI/SplitPanel.xaml`

```
Col 0: *    MaxWidth = FirstContentMaxOpenLength   ← first panel
Col 1: 2px                                         ← resizable divider
Col 2: *    MaxWidth = SecondContentMaxOpenLength  ← second panel
```

GridSplitter hit area extends `Margin="-2,0"` (4px total hit zone).

Collapse toggle buttons: `Width=40, Height=50`. Collapse overlay path: `Width=40, Height=120`.

---

### 9.4 SplitPanel — Vertical
**Source:** `Asi.CommonControls.Client.UI/SplitPanel.xaml`

```
Row 0: *    MaxHeight = FirstContentMaxOpenLength   ← first panel
Row 1: 2px                                          ← resizable divider
Row 2: *    MaxHeight = SecondContentMaxOpenLength  ← second panel
```

GridSplitter hit area: `Margin="0,-8"` (16px total vertical hit zone).

---

### 9.5 FieldInput — Horizontal layout
**Source:** `Asi.CommonControls.Client.UI/FieldInput.xaml`

```
Col 0: Auto  SharedSizeGroup="LabelWidthGroup"    ← label TextBlock
Col 1: Auto  SharedSizeGroup="SymbolWidthGroup"   ← warning/working symbol
Col 2: *                                           ← input control
Col 3: Auto  SharedSizeGroup="UnitWidthGroup"     ← unit label
```

SharedSizeGroups align labels and units across multiple FieldInput instances in the same `Grid.IsSharedSizeScope` container.

Default setters:
- Label `LabelMargin="0,1,0,0"` — 1px top nudge for optical alignment
- Input `Padding="3,0"` (horizontal)
- Large variant `InputMargin="-10,-4,0,0"`, `Padding="6,2"`

---

### 9.6 SimpleListItemContentControl
**Source:** `Asi.CustomControls.Client.UI/SimpleListItemContentControl.xaml`

```
Col 0: 24px   ← status icon / selection indicator
Col 1: *      ← primary label + subtitle
Col 2: Auto   ← trailing metadata
Col 3: 20px   ← action icon (e.g., chevron)
```

Inner text grid (Col 1):
```
Col 0: Auto   ← icon (if present)
Col 1: *      ← text
```

Default `ListBoxItem` Padding: `28,0,0,0` (28px left indent).
Selection indicator: `Margin="1,0,1,0"` (1px side gaps).

---

### 9.7 DetailedListItemContentControl
**Source:** `Asi.CustomControls.Client.UI/DetailedListItemContentControl.xaml`

```
Col 0: 4px    ← left edge inset
Col 1: 20px   ← status icon
Col 2: *      ← primary content (title + subtitle)
Col 3: Auto   ← secondary label / value
Col 4: 16px   ← right icon gap
Col 5: 4px    ← right edge inset
```

Inner content grid (Col 2):
```
Col 0: Auto   ← optional prefix icon
Col 1: *      ← text
```

Default `ListBoxItem` Padding: `28,0,0,0`.

Compact variant adds `Col 4: 4px` right spacer. Expand indicator: `Width=18, Height=8`.

---

### 9.8 UserCard
**Source:** `Asi.CustomControls.Client.UI/UserCard.xaml`

```
Col 0: 4px    ← left edge gap
Col 1: Auto   ← avatar / status icon
Col 2: Auto   ← secondary status badge
Col 3: *      ← name / role text
```

---

### 9.9 NotificationItem
**Source:** `Asi.CustomControls.Client.UI/NotificationItem.xaml`

Outer grid:
```
Col 0: *      ← content
Col 1: 20px   ← right margin column (explicit column instead of padding)
```

Rows (all Auto):
```
Row 0: level + error code + dismiss button
Row 1: title
Row 2: message body
Row 3: special notification actions
Row 4: timestamp + action buttons
```

Action row split (Row 4):
```
Col 0: 3*   ← timestamp
Col 1: *    ← buttons
```

Action button margins: `Margin="3,0,0,0"` between stacked buttons. Dismiss button `Margin="0,0,5,0"`.

---

### 9.10 ModeCommandAndControl — Command Header
**Source:** `Asi.Miscellaneous.Client.UI/ModeControls/ModeCommandAndControl.xaml`

Header area:
```
Row 0: 50px   ← fixed header bar
Row 1: *      ← scrollable command list
```

Header inner grid:
```
Col 0: Auto   ← back/mode icon
Col 1: Auto   ← mode title icon
Col 2: *      ← mode title text
Col 3: Auto   ← action overflow
```

Header top margin: `Margin="0,24,0,25"` — 24px top, 25px bottom on the title block.

---

### 9.11 Login screen
**Source:** `Asi.CustomControls.Client.UI/Login.xaml`

```
Row 0: Auto   ← header / logo
Row 1: Auto   ← theme selector (2-column: * / *)
Row 2: Auto   ← main login form (2-column: 2* / *)
Row 3: *      ← filler
```

Form area padding: `Margin="40,160,40,20"` on the form content block (40px sides, 160px top push for logo).

---

## 10. Opacity Tokens

| XAML Key | Value | CSS Token | Context |
|---|---|---|---|
| `Doubles_DisabledOpacity` | 0.35 | `--opacity-disabled` | Disabled controls |
| `Doubles_ReadOnlyOpacity` | 0.6 | `--opacity-readonly` | Read-only controls |
| `Doubles_PressedOpacity` | 0.8 | `--opacity-pressed` | Link button pressed state |

---

## 11. Quick-Reference: Common Magic Numbers

Some values appear hardcoded in component XAML. These are the ones that recur and should be mapped to the nearest token.

| Hardcoded value | Appears in | Nearest token | Notes |
|---|---|---|---|
| `2px` (divider) | SplitPanel col/row | `--border-width` | Divider line between panels |
| `4px` | DetailedListItem Col 0/5, UserCard Col 0 | `--size-3` (nearest) | Edge inset — structural, not token-mapped |
| `16px` | DetailedListItem Col 4, dialog padding | `--size-12` (nearest) or `--spacing-label-to-control-md` | Context-dependent |
| `20px` | NotificationItem Col 1, icon size | `--size-20` / `--icon` | Right margin column or icon |
| `24px` | Various top margins | `--size-24` / `--spacing-section-to-header` | — |
| `27px` | MasterDetail list Padding top/bottom | No direct token — midpoint of `--size-24` and `--size-36` | Intentional visual breathing room |
| `30px` | ListBoxItem left padding | No exact token — between `--size-24` and `--size-36` | Used for checkbox indent-like offset |
| `40px` | Section margins, MasterList margin | `--size-36` (nearest) or `--spacing-section-to-section` | — |
| `50px` | CommandHeader height, WindowControl button | `--touch-lg` (56px nearest) or `--btn-lg` (50px exact) | `--btn-lg = 50px` |
| `113px` | BrandHeightOffset | `--margin-brand-offset` | Caps sidebar top row |

---

## 12. CSS Variable Cross-Reference

For convenience when writing CSS, all tokens live in `spacingTokens.css` under `:root`. Full list:

```css
/* Size scale */
--size-1, --size-3, --size-6, --size-12, --size-18, --size-20, --size-24, --size-36, --size-44, --size-56

/* Spacing */
--spacing-field, --spacing-item, --spacing-field-to-field, --spacing-section-to-header
--spacing-section-to-section, --spacing-label-to-control-sm, --spacing-label-to-control
--spacing-label-to-control-md, --spacing-label-to-control-lg, --spacing-gap-sm, --spacing-gap-lg

/* Padding */
--padding-all-sm, --padding-tb-sm, --padding-lr-md, --padding-lr-lg, --padding-tb-md
--padding-left-md, --padding-left-lg, --padding-right-md, --padding-stacked-field
--padding-checkbox-indent, --padding-btn-lg, --padding-icon-btn-lg

/* Margin */
--margin-field-to-field, --margin-section-to-header, --margin-master-list-content
--margin-master-list, --margin-mode-section-title, --margin-mode-section-lg, --margin-brand-offset

/* Borders */
--border-width, --border-width-focused, --border-width-selected, --line-size

/* Touch targets */
--touch-sm, --touch, --touch-lg

/* Icons */
--icon-adorner, --icon-sm, --icon, --icon-lg, --icon-btn, --icon-btn-lg

/* Fields & panels */
--field-height, --field-height-lg, --field-label-min-width, --field-label-width
--field-input-width, --field-max-width, --dropdown-max-width, --btn-lg
--panel-first-min-width, --panel-column-width, --panel-header-height
--panel-on-object-ui, --panel-on-object-ui-grid, --panel-master-list-width
--panel-mode-section-title, --label-max-width, --min-window-width, --min-window-height

/* Opacity */
--opacity-disabled, --opacity-readonly, --opacity-pressed

/* Button specifics */
--btn-min-width, --btn-padding, --btn-padding-lg, --btn-padding-xl
--btn-min-height-xl, --btn-icon-gap, --btn-outline-icon-size, --btn-outline-radius

/* Transitions */
--transition-mouse-out, --transition-mouse-over, --transition-mouse-pressed
--transition-disable, --transition-select, --transition-unselect
--transition-unfocus, --transition-focus, --transition-expand, --transition-fade
```
