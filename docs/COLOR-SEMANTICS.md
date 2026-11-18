# Mobius Color Semantics

What each color means in the Mobius Master codebase. Every value traced to a source file.

Source of truth:
- `mobius-master/Common/Asi.Resources.Client.UI/{Light,Dark,Blue,Sunlight,Blackout}Theme.xaml` — raw `Color` definitions
- `mobius-master/Common/Asi.Resources.Client.UI/Themes/Brushes/Brushes.xaml` — `*Brush` wrappers consumed by controls
- CSS mirror: `Mobius Color Tokens/LightTheme.css`

Hex values below are LightTheme unless noted.

---

## 1. The status ramp (the core semantic system)

This is the one that matters most. It's the same five-step ramp everywhere: gauges, status borders, message banners, map vehicles.

| Meaning | Token | Light hex | CSS var |
|---|---|---|---|
| OK / normal / healthy | `InformationGreen` | `#92D400` | `--InformationGreen` |
| Caution | `InformationYellow` | `#FED100` | `--InformationYellow` |
| Warning | `InformationOrange` | `#FF8000` | `--InformationOrange` |
| Critical / error / E-stop | `InformationRed` | `#E62333` | `--InformationRed` |
| Unknown / no data | `InnerLines` `#E0E6E6` or `GaugeStatusUnknown` `#CCCCCC` | | `--GaugeStatusUnknown` |

Confirmed by `Asi.CommonControls.Client.UI/StatusBorder.xaml` lines 32–56, which defines the `StatusIndicatorStates` visual state group as exactly: Unknown → InnerLines, Critical → Red, Warning → Orange, Caution → Yellow, OK → Green.

Note the distinction: **yellow is Caution, orange is Warning.** They are not interchangeable. Gauges only expose four (`GaugeStatusUnknown/OK/Warning/Critical` — no caution step), so a gauge going yellow is not a thing.

---

## 2. Blue = interaction, not status

`InformationBlue` / `SelectionPrimary` `#009FDA` is the single ASI accent. It means "the system is talking to you" or "you touched this," never "good" or "bad."

| Token | Light hex | Meaning |
|---|---|---|
| `SelectionPrimary` | `#009FDA` | Selected item |
| `SelectionSecondary` | `#0078A4` | Pressed / deeper selection |
| `ForegroundAction` | `#0075A1` | Links and actionable text |
| `GaugeInteraction` | `#009FDA` | Gauge is interactive / being edited |
| `MouseOverPrimary` | `#0CD0FF` | Hover accent |
| `MessageDeliveryIconInfo` | `#009FDA` | Informational message |

---

## 3. Purple = pending / transitional

`InformationPurple` `#C499F7` consistently means "in between states, not yet committed."

- `VehiclePoweringFill/Outline` — vehicle is powering up (waiting)
- `FixedRowShapePlanning*` — rows being planned, not yet planned
- `PathAssignment_Planning_*` `#C09DF3` — path plan in progress
- `LoadDumpZoneTentativeSpot*` — tentative, unconfirmed spot

---

## 4. Message delivery (banners and toasts)

Paired icon + tinted background. Four levels only — no caution.

| Level | Icon | Background |
|---|---|---|
| Info | `#009FDA` | `#D7EDF7` |
| OK | `#92D400` | `#E6F2E3` |
| Warning | `#FF8000` | `#FFEFDF` |
| Critical | `#E62333` | `#F8EDEE` |

Foreground on all four: `MessageDeliveryForeground` `#002B45`.

---

## 5. Vehicle state on the map

From `Asi.Maps.Client/UI/VehicleMapState.xaml` visual states (lines 714–1400).

| State | Color | Token |
|---|---|---|
| Driving / Reversing / Inactive / Selected | Blue `#009FDA` | `VehicleSelectionFill/Outline` |
| Waiting (powering) | Purple `#C499F7` | `VehiclePoweringFill/Outline` |
| ConditionalSlow / ConditionalStop | Orange `#FF8000` | `VehicleConditionalStopFill/Outline` |
| EStopped | Red `#ED2939` | `VehicleEStopFill/Outline` |
| CheckedOut | Red `#ED2939` | `VehicleEStopFill/Outline` |
| Off / NoHeading | Gray `#707070` | `VehicleNoHeadingFill/Outline` |

Fills are the same hue at 50% alpha (`#7F...`); outlines are opaque.

**Open question:** CheckedOut reuses the E-stop red. Worth confirming with engineering whether that's intentional or leftover, since it collapses two very different operator meanings into one color.

---

## 6. Map shape colors

| Shape | Outline / Fill | Meaning |
|---|---|---|
| Road | `#BBBBBB` / `#FFFFFF` | Drivable road surface |
| Road center line | `#FED100` | Yellow, mirrors real-world striping |
| Road edge / berm | `#FBAE31` | Amber shoulder |
| Intersection | `#999999` / `#CCCCCC` | Junction |
| Obstacle / Barrier | `#DDDDDD` / `#F5F5F5` | Static, non-alarming |
| MapBuilder Obstacle / Barrier | `#ED2939` / `#70ED2939` | Red — authored hazard, editing context |
| Failure | `#ED2939` / `#20CCCCCC` | Red outline, error |
| Station | `#FF8000` / `#19FF8000` | Orange, operational point |
| Water hazard | `#67B4EA` / `#D0F1FC` | Blue, literal water |
| Bunker / Avoid / Load-dump zone | `#DCD6B2` sand | Terrain, not a status |
| Area coverage | `#B1E33E` | Green, completed work |
| Disengage zone | `#007EAE` / `#4EB6DD` | Blue, handover to manual |

Sand `#DCD6B2` is the "terrain / neutral operational zone" color. It appears in load-dump zones, bunkers, avoid areas, convoy spacing, and vehicle hulls.

---

## 7. Path assignment lifecycle

A four-stage ramp from `LightTheme.xaml` lines 207–224:

| Stage | Outline | Meaning |
|---|---|---|
| Planning | `#C09DF3` purple | Being computed |
| Planned | `#99D135` green | Ready to run |
| Executing | `#FED100` yellow | Running now |
| Error | `#ED2939` red | Failed |

Each stage has selected/not-selected variants — not-selected drops alpha to `#55` outline / `#22` fill; selected goes to `#FF` / `#77`.

---

## 8. Vehicle hull colors

Purely identity, no semantics. 17 fixed options operators assign per asset so trucks are distinguishable on the map: Generic gray, Steel White, Gun Metal Gray, Sand, Military Green, Brown, Ocean Teal, Teal, Blue, Royal Blue, Lime Green, Forest Green, Yellow, Orange, Hot Orange, Red, Power Red.

Do not read status into a hull color.

---

## 9. Neutrals

| Token | Light hex | Use |
|---|---|---|
| `ForegroundPrimary` | `#555555` | Body text |
| `ForegroundStrong` | `#002B45` | Headings, values, emphasis (ASI navy) |
| `ForegroundDisabled` | `#CDCDCD` | Disabled text |
| `ForegroundWatermark` | `#C4C4C4` | Placeholder text |
| `BackgroundPrimary` | `#F5F5F5` | App canvas |
| `BackgroundStrong` | `#FFFFFF` | Cards, panels |
| `InnerLines` | `#E0E6E6` | Dividers, unknown status |
| `InformationGray` | `#707070` | Inactive / off |

`#002B45` navy is the ASI brand dark. It's a text color, not a surface color.

---

## Theme behavior

Five themes ship: Light, Dark, Blue, Sunlight (high-brightness outdoor), Blackout (night ops).

**Invariant across all five:** Green `#92D400`, Yellow `#FED100` (except Sunlight → `#E0A700`), Orange `#FF8000`, Purple `#C499F7`.

**Shifts per theme:** Blue (`#009FDA` → `#1EC1FF` dark → `#5BD2FF` blue/blackout), Red (`#E62333` → `#ED2939` dark → `#EF4D3A` blue), and all neutrals.

Practical takeaway for markup: never hardcode a status hex. Bind to the CSS var so the theme swap works.
