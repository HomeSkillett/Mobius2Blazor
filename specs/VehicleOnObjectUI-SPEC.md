# VehicleOnObjectUI — Component Spec

**Source:** `mobius-master/Common/Asi.Maps.Client/UI/VehicleOnObjectUI.xaml`
**Type:** Map callout / on-object UI bubble
**Purpose:** Floating info bubble anchored to a vehicle icon on the map. Shows vehicle name, status, control mode, action buttons, and connectivity indicators.

---

## 1. Visual State Groups

### OnObjectStates (5 states)

| State | _templateRoot Width | _mainContentGrid Height | _controlledDetailsExpander Width | Labels shown | Buttons | Status detail row | Connection column |
|---|---|---|---|---|---|---|---|
| **NoInterface** | 0 (collapsed, scale 0.5) | 0 | 0 | name only (opacity 1) | none | hidden | hidden |
| **SmallInterface** | 202px | 46px | 140px | name + status (alternating 11s cycle) | none (primary hidden) | hidden | 22px (small GPS + signal) |
| **SingleButtonInterface** | 100px | 60px | 0 | name only (opacity 1) | primary only (60px) | hidden | hidden |
| **SmallInterfaceWithButton** | 262px | 60px | 140px | name + status (alternating 11s cycle) | primary (60px) | hidden | 22px (small GPS + signal) |
| **FullInterface** | 360px | 60px | 161px | name (always visible) | primary (80px) + clear (80px) | visible (row 0 expander open) | hidden |

### ActiveCommandStates (4 states)

| State | Play button | Power button |
|---|---|---|
| **HideCommands** | visible (fades in) | collapsed |
| **ShowPower** | collapsed | visible (fades in) |
| **ShowPlay** | visible (fades in) | collapsed |
| **ShowPause** | visible (fades in) | collapsed |

### AutonomousState (4 states)

| State | Buttons enabled | Alt label shown |
|---|---|---|
| **Autonomous** | yes (opacity 1) | none |
| **TeleOp** | no (opacity 0) | "TELEOP" |
| **Manual** | no (opacity 0) | "MANUAL" |
| **Monitored** | no (opacity 0) | "MONITORED" |

---

## 2. Structural Nesting (preserving XAML depth)

```
Grid#_templateRoot (Width=320, Margin: uses 20px via VehicleOouiBaseGrid)
  └─ ExpanderItem#_mainExpander (ExpandUp)
       └─ Border
            └─ Grid#VehicleOouiBaseGrid (Margin=20, 5 rows)
                 ├─ Row 0: ExpanderItem#_vehicleStatusDetailExpander (ExpandUp)
                 │    └─ Border (border: 1,1,1,0 MapLabelOutline)
                 │         └─ Grid (Height=TouchSize/44px, bg=BackgroundStepTwo)
                 │              ├─ Col 0: ProductivityStatusIndicator (Width=4)
                 │              ├─ Col 1: spacer (LabelToControlDistanceMedium=16px)
                 │              ├─ Col 2: StackPanel#_vehicleStatusPanel
                 │              │    ├─ TextBlock#_vehicleStatus (VehicleStatus)
                 │              │    └─ TextBlock#_vehicleStatusMessage (VehicleStatusToolTip)
                 │              ├─ Col 3: StackPanel (GPS + Signal, Margin=4,0)
                 │              │    ├─ GPSStrength (Margin=0,0,10,0)
                 │              │    └─ SignalStrength
                 │              └─ Col 4: ToggleButton (close, TouchSize x TouchSize)
                 │
                 ├─ Row 1: Grid#_insertedContent (ScrollViewer for plugin content)
                 │
                 ├─ Row 2: Grid#_mainContentGrid (Height=60)
                 │    ├─ Col 0: Border#_controlledDetailsBorder (separator)
                 │    ├─ Col 0: Grid#_controlledDetailsExpander (Width animated)
                 │    │    ├─ ProductivityStatusIndicator#_detailsStatusIndicator (4px wide)
                 │    │    ├─ StackPanel#_controlledLabelsPanel (name + username)
                 │    │    │    ├─ Grid (Link icon 12x12 + vehicleName)
                 │    │    │    └─ TextBlock#_userName
                 │    │    └─ StackPanel#_detailsLabelsPanel (status + message)
                 │    │         ├─ TextBlock (VehicleStatus)
                 │    │         └─ TextBlock#_detailsVehicleStatusMessage
                 │    └─ Col 1: Grid#_extraDetails
                 │         ├─ Col 0: Grid (alt labels + buttons)
                 │         │    ├─ Grid#_altLabels (MANUAL/TELEOP/MONITORED)
                 │         │    ├─ ExpanderItem#_primaryButtonExpander (ExpandLeft)
                 │         │    │    └─ Grid#_primaryButtonGrid (MinWidth=60)
                 │         │    │         ├─ Grid#_playButton (Height=46)
                 │         │    │         └─ Grid#_powerButton (Height=46)
                 │         │    └─ ExpanderItem#_clearButtonExpander (ExpandLeft)
                 │         │         └─ Border (border-left: 1 MapLabelOutline)
                 │         │              └─ Button#_clearButton (MinWidth=60)
                 │         └─ Col 1: Border#_smallConnectionStatusColumn (Width animated)
                 │              └─ StackPanel (vertical)
                 │                   ├─ GPSStrength (10x10)
                 │                   └─ SignalStrength (small template)
                 │
                 ├─ Row 2 overlay: Border#_mainContentBorder (1px MapLabelOutline)
                 │
                 └─ Row 4: Callout triangle (Path elements)
```

---

## 3. Resolved Dimensions

| Element | Property | Value | Source |
|---|---|---|---|
| _templateRoot | Width | 320px (default) | XAML line 38 |
| VehicleOouiBaseGrid | Margin | 20px | XAML line 83 |
| Status detail row | Height | var(--touch) = 44px | XAML line 104 (TouchSize) |
| Status indicator strip | Width | 4px | XAML line 114, col def line 108 |
| Label-to-control spacer | Width | var(--spacing-label-to-control-md) = 16px | XAML line 109 |
| GPS/Signal margin | Margin | 4px 0 (panel), 0 0 10px 0 (GPS) | XAML lines 141, 146 |
| Close button | Size | var(--touch) x var(--touch) = 44x44 | XAML lines 158-159 |
| _mainContentGrid | Height | 60px | XAML line 196 |
| _primaryButtonGrid | MinWidth | 60px | XAML line 399 |
| Play/Power button | Height | 46px | XAML lines 403, 408 |
| _clearButton | MinWidth | 60px | XAML line 428 |
| Link icon | Size | 12x12, Margin 0,0,6,0 | XAML lines 272-275 |
| _controlledLabelsPanel | Margin | 16,0,16,0 (default) | XAML line 257 |
| _detailsLabelsPanel | Margin | 8,-3,8,3 (default) | XAML line 305 |
| Callout triangle | Size | 20x20 (full), 10x10 (small) | XAML lines 499-500 |
| Small GPS indicator | Size | 10x10, Margin 0,0,0,6 | XAML lines 454-457 |
| SmallInterface total width | 202px | XAML anim line 673 |
| SmallInterfaceWithButton total width | 262px | XAML anim line 807 |
| FullInterface total width | 360px | XAML anim line 863 |
| FullInterface details expander | 161px | XAML anim line 864 |
| FullInterface button min width | 80px | XAML anim line 865 |

---

## 4. Icon Glyph Map

| Icon | Glyph | Code | Source |
|---|---|---|---|
| Close (X) | &#xEA06; | `\EA06` | Windows10_Close |
| Play | &#xE114; | `\E114` | Media_Play |
| Pause | &#xE115; | `\E115` | Media_Pause |
| Power | &#xE40B; | `\E40B` | Power |
| Link | &#xE525; | `\E525` | Link |
| Path adorned (clear) | &#xEC1A; | `\EC1A` | PathAdorned |
| Adorner Status X | &#xEB19; | `\EB19` | Adorner_Status_X |
| GPS | &#xE762; | `\E762` | GPS |
| Signal/Wifi | &#xE401; | `\E401` | Wifi |

---

## 5. Color Token Map

| Usage | Token |
|---|---|
| Main content background | `--BackgroundStrong` |
| Status detail row bg | `--BackgroundStepTwo` |
| Border outline | `--MapLabelOutline` |
| Primary text | `--ForegroundPrimary` |
| Strong text (names, alt labels) | `--ForegroundStrong` |
| Clear button X adorner | `--InformationRed` |
| Shadow | `--ShadowElements` at `--opacity-shadow` |
| Link icon opacity | `--opacity-disabled` (0.35) |
| Alt labels font style | `--font-meta` / `--size-meta` |

---

## 6. ProductivityStatus → Activity State Colors

The 4px vertical status indicator maps ActivityState to color:

| ActivityState | Color |
|---|---|
| Active/Moving | `--InformationGreen` (green) |
| Warning/ConditionalStop | `--InformationYellow` |
| Critical/EStop | `--InformationRed` |
| Idle/Thinking | `--InformationBlue` |
| Inactive/Off | `--ForegroundDisabled` (gray) |
