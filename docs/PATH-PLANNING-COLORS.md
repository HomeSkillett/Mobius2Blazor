# Path Planning Colors

Path planning uses three separate color systems that do **not** share a vocabulary. Knowing which one you're looking at matters more than knowing the hexes.

| System | Where | Question it answers |
|---|---|---|
| Assignment lifecycle | Map, `AssignmentRenderingControl` | Where is this assignment in its lifecycle? |
| Path authoring | PathBuilder plugin | Is this path selected, and is it drivable? |
| Trouble levels | Agriculture offline planning | Why did the planner struggle here? |

---

## 1. Assignment lifecycle (the main one)

Source: `Common/Asi.Maps.Client/UI/AssignmentRenderingControl.xaml.cs` lines 964–995, brushes bound in `AssignmentRenderingLayerControl.xaml` lines 33–57. Colors from `LightTheme.xaml` lines 207–224.

Driven by `AssignmentStatus` (`Asi.Interfaces.Shared/Objectives/IObjective.cs` line 116).

| Status | Hue | Path outline | Connection outline | CSS var prefix |
|---|---|---|---|---|
| Planning | Purple | `#C09DF3` | `#9780C0` | `--PathAssignment_Planning_` |
| Planned | Green | `#99D135` | `#80A639` | `--PathAssignment_Planned_` |
| Executing | Yellow | `#FED100` | `#DEA427` | `--PathAssignment_Executing_` |
| PlanFailed / ExecutionFailed | Red | `#ED2939` | `#B4192C` | `--PathAssignment_Error_` |
| Completed / Cleared | Not drawn | | | |

Note the connection outline is always a darker, desaturated version of the path hue. It is a separate token, not an opacity shift.

### Selection is encoded as alpha, not hue

| | Outline | Fill |
|---|---|---|
| Not selected | `0.333` alpha | `0.133` alpha |
| Selected | `1.0` alpha | `0.467` alpha |

So a selected path is the same color, just solid. **Planning and Error have no not-selected variant** — they render at full opacity regardless. Deliberate: an in-progress plan and a failed plan both demand attention whether or not you clicked them.

### Line style encodes segment type, not status

From `CreatePen` calls, lines 560–590:

| Style | Segment |
|---|---|
| Solid | The actual drivable path |
| **Dashed** | Initial connecting path — vehicle's current position to path start |
| **Dotted** | Lap connecting path — end of one lap stitched to the start of the next |
| Same hue × `0.8` | Concurrent action active section, and its section markers |

`DarkerMultiplier = 0.8` (line 21). Sections where a concurrent action is running get the same status hue multiplied down 20%.

### Two behaviors worth knowing

**Planned falls back to Planning purple.** Line 983: `goto case AssignmentStatus.Planning`. A `Planned` assignment only renders green when `ObjectiveStatus` is `Accepted` or `Executing`. Planned-but-not-yet-accepted reads purple. Purple means "not committed," which is consistent with how purple is used elsewhere in Mobius.

**Action markers hide when not selected.** `GetActionBrush()` lines 1007–1022 returns `Brushes.Transparent` for Planned and Executing when `IsSelected` is false. Only Planning and Error show action markers unconditionally.

---

## 2. Path authoring (PathBuilder)

Source: `Plugins/Common/PathBuilder/Asi.PathBuilder.Client/UI/EditPathGeometryControl.xaml` lines 47–92.

| Token | Hex | Meaning |
|---|---|---|
| `PathNormalOutline` / `Fill` | `#646464` / 46.7% | Default, unselected path |
| `PathSelectedOutline` / `Fill` | `#009FDA` / 46.7% | Selected, and drivable |
| `PathErrorOutline` / `Fill` | `#ED2939` / 46.7% | Selected, and **not** drivable |
| `PathHistory` | `#000000` @ 20% | Where the vehicle actually went |
| `PathReverse` | `#A9A9A9` | Reverse-motion segment |
| `PathAction` | `#646464` | Action marker |

Red here does **not** mean alarm. The trigger is a `MultiDataTrigger` on `IsDrivable == False` — the geometry is invalid, too tight a turn or otherwise unfollowable. It's an authoring validation state, not a vehicle condition.

The four combinations:

| IsSelected | IsDrivable | Result |
|---|---|---|
| True | True | Blue outline + blue fill |
| True | False | Red outline + red fill |
| False | True | Blue outline, no fill |
| False | False | Red outline, no fill |

Selection adds the fill. Drivability picks the hue.

---

## 3. Trouble levels (Agriculture offline planning)

Source: `Plugins/Agriculture/Common/OfflinePlanning/Asi.OfflinePlanning.Client/Map/TroubleLevelToPathColorConverter.cs`. Enum in `Map/TroubleSpot.cs` line 5.

| TroubleLevel | Token | Hex | Meaning |
|---|---|---|---|
| `Normal` | `PathAssignment_Planning_Fill` | `#77C09DF3` purple | No trouble |
| `Slim` | `InformationYellowGreen` | `#9ACD32` | Tight clearance |
| `Hazardless` | `InformationYellow` | `#FED100` | Planned without hazard avoidance |
| `HazardlessSlim` | `InformationOrange` | `#FF8000` | Both of the above |
| `ShortSegment` | `InformationOrange` | `#FF8000` | Segment too short to plan cleanly |
| `Error` (default) | `InformationRed` | `#E62333` | Planner failed |

`PlannerErrorToBrushConverter` uses the identical mapping against numeric error codes (`PlannerErrorConstants`: Slim 1000, Hazardless 2000, HazardlessSlim 3000, ShortSegment 4000), for panel backgrounds instead of path strokes.

This is the only place `InformationYellowGreen` gets used.

---

## 4. Planning obstacles

`PlanningObstacleOrange` `#F97E43`, outline only, fill fully transparent (`#00000000`). Used in `PlanningObstacleLayerControl.xaml` and `QueueObstacleLayerControl.xaml`.

Hollow shape with an orange outline = "the planner is routing around this."

---

## Inconsistencies worth raising

**1. Green means two different things.** In the assignment lifecycle, green `#99D135` = Planned, meaning "ready but not started." In the global status ramp, green `#92D400` = OK/healthy. They're also two different greens, three units apart in hue. Either intentional separation or drift — worth asking engineering.

**2. Purple = "no trouble" in offline planning.** Everywhere else in Mobius, `#C499F7`/`#C09DF3` purple means transitional/pending. In `TroubleLevelToPathColorConverter`, `TroubleLevel.Normal` is purple because it inherits the planning path color. Defensible in context, since the whole layer is a plan, but it means purple is not a reliable signal on that layer.

**3. `HazardlessSlim` and `ShortSegment` are both orange.** Two distinct planner conditions render identically. If an operator needs to tell them apart visually, they currently can't.

**4. Three separate reds.** `InformationRed` `#E62333` (global critical), `PathAssignment_Error_Outline` `#ED2939` (assignment failed), `PathErrorOutline` `#ED2939` (not drivable). The last two match; the first doesn't. If they're meant to be the same semantic red, one of them is off.

**5. `PlanningObstacleOrange` `#F97E43` is not `InformationOrange` `#FF8000`.** A fourth orange in the system.

---

## Building this in Blazor

Bind to the CSS vars, never the hex. All of these live in `Mobius Color Tokens/LightTheme.css` lines 201–228 and 297–298.

Line styles map cleanly to SVG/CSS:

```
solid path       → stroke: var(--PathAssignment_Executing_Selected_Outline)
initial connect  → stroke-dasharray: 4 4     /* WPF DashStyles.Dash */
lap connect      → stroke-dasharray: 1 2     /* WPF DashStyles.Dot */
```

WPF `DashStyles.Dash` is `2,2` and `DashStyles.Dot` is `0,2` in stroke-thickness units, so the CSS pixel values depend on your stroke width. Confirm against the running app before committing.
