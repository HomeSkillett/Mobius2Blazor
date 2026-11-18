# Vehicle List + Gauge Panel (SplitPanel, vertical) — SPEC (draft for review)

Status: DRAFT. No HTML or CSS written yet. Needs Ben's review first.

Figma reference: iPad file, node `1955:109797` ("Vehicle Drawer - Open"), 400 x 820.
Master source: `mobius-master/Common/Asi.Miscellaneous.Client.UI/ModeControls/ModeCommandAndControl.xaml`

All paths below are under `mobius-master/Common/`.

## 1. Finding

The Figma drawer is the Command and Control "Vehicles" column from master. The vehicle list and the gauge panel are the two halves of one vertical `SplitPanel`. The "tab" with the chevron is the SplitPanel's own toggle tab. It is not part of the gauge panel.

```
ModeCommandAndControl.xaml
  Grid Width=300, BackgroundInvertPrimary, ClipToBounds            (lines 332-337)
    TitledContentControl Title="Vehicles" Width=300                 (lines 338-344)
      Grid rows 50 / *                                              (lines 349-353)
        Row 0: toolbar, BackgroundInvertStrongStepOne               (lines 355-443)
          multi-select toggle (66 wide), sort toggle (66 wide,
          Margin -20,0,0,0), second-page toggle (66 wide, right)
        Row 1: SplitPanel Orientation=Vertical                      (lines 445-452)
          SecondContentMinOpenLength=376, MaxOpenLength=654,
          StartSnap=SecondContentMin
          FirstContent: SortableGroupListView "AssetListView"       (lines 454-611)
            MinHeight=100, vertical padding 12,
            Style=ListViewInvertFull, items=ListViewItemInvertFull
            Group header: SortableGroupListViewGroupHeader
            Item: DetailedListItemContentControl
          SecondContent: Grid, BackgroundInvertStepOne              (lines 614-667)
            "No asset selected" text (HeadingSm, margin 24)
            DisplayGaugePanel Width=320                             (lines 660-666)
          SecondContentBonusActions: pop-out gauges IconButton      (lines 669-687)
```

## 2. Figma to Master map

| Figma element | Master element | Source | In Mobius2Blazor? |
|---|---|---|---|
| Tab with chevron (116 x 34.5, right aligned) | SplitPanel vertical toggle tab: Path 120 x 40 + ToggleButton 50 x 40, Icon_Arrow_PointerUp, Margin 0,-42,0,0, right / top aligned | `Asi.CommonControls.Client.UI/SplitPanel.xaml` lines 171-290 | Partly. `split-panel/` covers the horizontal template only. |
| "My Vehicles 4" header | Group header: 44px tall, group Name in Font_Meta (bold, upper-case), ItemCount in ForegroundInvertDisabled, 6px between them | `Asi.Resources.Client.UI/DefaultControls.xaml` lines 5055-5110, `SortableGroupListViewGroupHeader.xaml` | Not checked yet |
| Vehicle row, 4px colored left edge | DetailedListItemContentControl: columns 4 / 20 / * / Auto / 16 / 4, MinHeight 44. Column 0 is a ProductivityStatusIndicator stripe. | `Asi.CustomControls.Client.UI/DetailedListItemContentControl.xaml` lines 242-300 | Partly. `listview/` has `.mob-listview__item--detailed` with a delete button. |
| Selected row, solid blue | Second ProductivityStatusIndicator spanning all 6 columns, opacity 0 to 1 when selected. Text goes to SelectionForeground. | same file, lines 260-267, 225-231 | To check against listview.css |
| Red / orange left edge | ProductivityStatus states: Normal, Active, ProgressUnknown, ProgressKnown, Warning, Critical, Inactive, Off. Fills: Purple, Orange, Red, Yellow, Green. | `Asi.CustomControls.Client.UI/ProductivityStatusIndicator.xaml` | No dedicated component yet |
| Vehicle name | TextBlock bound to Name, between BeforeNameVM and AfterNameVM content | ModeCommandAndControl.xaml lines 529-537 | n/a |
| Gauge panel | DisplayGaugePanel, Width 320 | lines 660-666 | Yes (built last pass at 312) |
| Page dots | same as last pass | | Yes |

## 3. In Figma but not in master

1. **Vehicle thumbnail with status rings** (50 x 50 tractor illustration inside colored rings). Master rows have no image. They have the 4px stripe only.
2. **Second line of status text** ("e-Stop", "Running", "Idle", "Some status reason"). Master's only second line is the linked asset names, small text, shown only when the row is selected (lines 538-547).
3. **60px row height.** Master MinHeight is TouchSize = 44 (`Themes/Sizes/SizesNew.xaml` line 39).
4. **Slide handle** at the top of the drawer. iPad only.
5. **400px width.** Master column is 300.

## 4. In master but not in Figma

1. **Title "Vehicles"** from TitledContentControl (`LocalizedText.ModeCommandAndControlAssetListTitle`).
2. **50px toolbar**: multi-select, sort order, second-page toggles.
3. **Play / pause button** at the right of each row (CommandContent, lines 570-582), shown for autonomous-capable assets with permission.
4. **Link icon** (12 x 12) before the name when the asset is linked (lines 549-562).
5. **Pop-out gauges button** on the tab (lines 669-687).
6. **Multi-select checkbox** per row and per group (hidden until multi-select is on).
7. **Group header is an expander** (ListItemExpanderItemWithHeader), so groups collapse.

## 5. Width quirk to confirm

The vehicles column is 300 wide with ClipToBounds (lines 332-337), but DisplayGaugePanel is fixed at Width 320 (line 662). So the gauge panel is wider than its container and gets clipped. Last pass I built the panel at 312 (content plus margins) because I had not seen this parent yet. For a true master match in this context the panel should be 320 inside a 300 clip. I have not worked out which side WPF clips, so that needs one more trace.

## 6. Not traced yet (would do before building)

- SplitPanel vertical template in full (tab path, toggle button states, arrow rotation, spacer row 2px).
- ListViewInvertFull / ListViewItemInvertFull against the existing `listview.css`.
- ProductivityStatusIndicator: which fill each state uses, and opacities.
- ListItemExpanderItemWithHeader (group expander chrome).
- Toolbar toggle styles (VerticalIconToggleButton, SimpleIconButton) and the glyphs for Icon_MultiSelect, Icon_Sort_Ascending, Icon_Sort_Descending, Icon_PopOut, Icon_Link.
- PlayPauseButtonVM template.

## 7. Decisions needed from Ben

1. **Vehicle thumbnail and status rings.** Leave out (master match), or add as a labeled extension that is not in master?
2. **Second line of status text.** Leave out, or add as an extension?
3. **Master-only pieces** (title, toolbar, play/pause, pop-out, link icon, checkboxes). Include all, or only the ones needed for the Figma view (tab + list + gauges)?
4. **Scope of the page.** A composed example on the All Gauges page like last time, or its own page (for example `vehicle-list/`), plus the vertical SplitPanel added to the `split-panel/` page?
