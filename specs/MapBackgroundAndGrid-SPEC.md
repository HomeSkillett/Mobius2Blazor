# Map Background & Grid — SPEC

## Source Files

| File | Location |
|------|----------|
| BackgroundGridControl.xaml | `Common/Asi.Maps.Client/UI/BackgroundGridControl.xaml` |
| BackgroundGridControl.xaml.cs | `Common/Asi.Maps.Client/UI/BackgroundGridControl.xaml.cs` |
| ImageLayerControl.xaml | `Common/Asi.Maps.Client/UI/ImageLayerControl.xaml` |
| TilingCanvas.xaml | `Plugins/Common/TilingShapeLayer/Asi.TilingShapeLayer.Client/TilingCanvas.xaml` |
| Brushes.xaml (patterns) | `Common/Asi.Resources.Client.UI/Themes/Brushes/Brushes.xaml` |
| PatternBrushMultiConverter.cs | `Common/Asi.CommonControls.Client.UI/Converters/PatternBrushMultiConverter.cs` |
| RoughShapeTemplates.xaml | `Plugins/Agriculture/Mowing/GolfCourseShapes/.../RoughShape/RoughShapeTemplates.xaml` |
| StationShape Templates.xaml | `Plugins/Common/StationShape/Asi.Maps.StationShape.Client/Templates.xaml` |
| BunkerShapeTemplates.xaml | `Plugins/Agriculture/Mowing/.../BunkerShape/BunkerShapeTemplates.xaml` |
| WaterHazardShapeTemplates.xaml | `Plugins/Agriculture/Mowing/.../WaterHazardShape/WaterHazardShapeTemplates.xaml` |
| NegativeObstacleShapeTemplates.xaml | `Plugins/Agriculture/Common/NegativeObstacleShape/.../NegativeObstacleShapeTemplates.xaml` |
| DisengageShape Templates.xaml | `Plugins/Agriculture/Common/DisengageShape/.../Templates.xaml` |
| TilingShapeLayer Templates.xaml | `Plugins/Common/TilingShapeLayer/Asi.TilingShapeLayer.Client/Templates.xaml` |
| MapContentControl.xaml | `Common/Asi.Maps.Client/UI/MapContentControl.xaml` |
| ShapeStyles.xaml | `Common/Asi.Maps.Client/UI/ShapeStyles.xaml` |

## Token Mapping (LightTheme.css)

### Map Background & Grid Tokens
| Token | Value | XAML Resource |
|-------|-------|---------------|
| `--MapBackground` | `rgba(245, 245, 245, 1)` | `Mobius_UI_Resources_Colors_MapBackgroundBrush` |
| `--MapGridLines` | `rgba(0, 0, 0, 0.063)` | `Mobius_UI_Resources_Colors_MapGridLinesBrush` |
| `--SelectionPrimary` | `rgba(0, 159, 218, 1)` | `Mobius_UI_Resources_Colors_SelectionPrimaryBrush` |
| `--ForegroundPrimary` | `rgba(85, 85, 85, 1)` | `Mobius_UI_Resources_Colors_ForegroundPrimaryBrush` |

### Shape Tokens (Background-relevant)
| Token | Value | XAML Resource |
|-------|-------|---------------|
| `--DriveableShapeOutline` | `rgba(204, 204, 204, 1)` | `Mobius_UI_Resources_Colors_DriveableShapeOutlineBrush` |
| `--DriveableShapeFill` | `rgba(153, 153, 153, 0.098)` | `Mobius_UI_Resources_Colors_DriveableShapeFillBrush` |
| `--ObstacleShapeOutline` | `rgba(221, 221, 221, 1)` | `Mobius_UI_Resources_Colors_ObstacleShapeOutlineBrush` |
| `--ObstacleShapeFill` | `rgba(245, 245, 245, 1)` | `Mobius_UI_Resources_Colors_ObstacleShapeFillBrush` |
| `--ReferenceShapeOutline` | `rgba(204, 204, 204, 1)` | `Mobius_UI_Resources_Colors_ReferenceShapeOutlineBrush` |
| `--ReferenceShapeFill` | `rgba(204, 204, 204, 0.267)` | `Mobius_UI_Resources_Colors_ReferenceShapeFillBrush` |
| `--RoadShapeOutline` | `rgba(187, 187, 187, 1)` | — |
| `--RoadShapeFill` | `rgba(255, 255, 255, 1)` | — |
| `--RoadShapeDoubleCenterLine` | `rgba(254, 209, 0, 1)` | — |
| `--RoadShapeEdgeFill` | `rgba(251, 174, 49, 0.867)` | — |
| `--IntersectionShapeOutline` | `rgba(153, 153, 153, 1)` | — |
| `--IntersectionShapeInnerBorder` | `rgba(255, 255, 255, 1)` | — |
| `--IntersectionShapeFill` | `rgba(204, 204, 204, 1)` | — |
| `--StationOutline` | `rgba(255, 128, 0, 0.749)` | `Mobius_UI_Resources_Colors_StationOutlineBrush` |
| `--StationFill` | `rgba(255, 128, 0, 0.098)` | `Mobius_UI_Resources_Colors_StationFill` |
| `--MapBuilderObstacleShapeOutline` | `rgba(237, 41, 57, 1)` | `Mobius_UI_Resources_Colors_MapBuilderObstacleShapeOutlineBrush` |
| `--MapBuilderObstacleShapeFill` | `rgba(237, 41, 57, 0.439)` | `Mobius_UI_Resources_Colors_MapBuilderObstacleShapeFillBrush` |
| `--FailureShapeOutline` | `rgba(237, 41, 57, 1)` | — |
| `--FailureShapeFill` | `rgba(204, 204, 204, 0.125)` | — |
| `--NegativeObstacleShapeOutline` | `rgba(237, 41, 57, 1)` | — |
| `--NegativeObstacleShapeFill` | `rgba(103, 180, 234, 1)` | — |
| `--AreaCoverageShapeOutline` | `rgba(177, 227, 62, 0.8)` | — |
| `--AreaCoverageShapeFill` | `rgba(177, 227, 62, 0.467)` | — |
| `--AvoidShapeOutline` | `rgba(220, 214, 178, 1)` | — |
| `--AvoidShapeFill` | `rgba(220, 214, 178, 0.467)` | — |
| `--BunkerShapeOutline` | `rgba(220, 214, 178, 1)` | — |
| `--BunkerShapeFill` | `rgba(245, 242, 224, 0.933)` | — |
| `--GreenShapeOutline` | `rgba(146, 212, 0, 1)` | — |
| `--GreenShapeFill` | `rgba(214, 239, 159, 1)` | — |
| `--RoughShapeOutline` | `rgba(0, 0, 0, 0.467)` | — |
| `--RoughShapeFill` | `rgba(0, 0, 0, 0.2)` | — |
| `--WaterHazardShapeOutline` | `rgba(103, 180, 234, 1)` | — |
| `--WaterHazardShapeFill` | `rgba(208, 241, 252, 1)` | — |
| `--BarrierShapeOutline` | `rgba(221, 221, 221, 1)` | — |
| `--BarrierShapeFill` | `rgba(245, 245, 245, 1)` | — |
| `--DisengageShapeOutline` | `rgba(0, 126, 174, 0.749)` | — |
| `--DisengageShapeFill` | `rgba(78, 182, 221, 0.267)` | — |
| `--MapLabelOutline` | `rgba(212, 212, 212, 0.902)` | — |

### Selection State Tokens
| Token | Value | XAML Resource |
|-------|-------|---------------|
| `--SelectionPrimary` | `rgba(0, 159, 218, 1)` | Selected foreground outline |
| `--MapBackground` | `rgba(245, 245, 245, 1)` | Selected background outline (halo) |
| `--InformationOrange` | `rgba(255, 128, 0, 1)` | Locked shape dashed outline |

---

## Pattern Textures (Brushes.xaml)

Source: `Common/Asi.Resources.Client.UI/Themes/Brushes/Brushes.xaml` lines 22-112
Converter: `PatternBrushMultiConverter.cs` — composites background color (unit square) + foreground color (pattern geometry) into a `DrawingBrush`.

### Pattern Definitions

| Pattern Key | Geometry | Tile Size | Transform | Visual |
|---|---|---|---|---|
| `BrushAndPattern_Zone` | `M0,0 H0.5 V0.5 H0 Z` (quarter square) | 4x4 | none | Checkerboard |
| `BrushAndPattern_SoftObstacle` | `M0,0 V1 H0.5 V0 Z` (left-half vertical bar) | 4x4 | none | Vertical stripes |
| `BrushAndPattern_Obstacle` | `M0,0 H1 V0.25 H0 Z` (25% height horizontal bar) | 8x8 | Rotate 45deg | Diagonal stripes |
| `BrushAndPattern_HardObstacle` | `M0,0 H1 V0.25 H0.25 V1 H0 V0` (L-shape) | 8x8 | Rotate 45deg | Cross-hatch |
| `BrushAndPattern_Bunker` | `DotPattern` (17 scattered circles r=1) | 72x72 (720×0.1) | Scale 0.1 | Scattered dots |
| `BrushAndPattern_Negative` | `DotPattern` (same 17 circles) | 72x72 (720×0.1) | Scale 0.1 | Scattered dots |

### Shape-to-Pattern Mapping

| Shape | Pattern | Background Color | Foreground Color | Source |
|---|---|---|---|---|
| Reference | Zone (checkerboard) | `ReferenceShapeFillBrushBackground` | `ReferenceShapeFill` | MapContentControl.xaml:169-175 |
| Obstacle (not selectable) | Obstacle (diagonal) | `ObstacleShapeFill` | `ObstacleShapeOutline` | MapContentControl.xaml:231-236 |
| Obstacle (selectable) | Obstacle (diagonal) | `MapBuilderObstacleShapeFill` | `MapBuilderObstacleShapeOutline` | MapContentControl.xaml:223-228 |
| Station | Zone (checkerboard) | `StationFill` @ 0.25 opacity | `StationFill` | StationShape/Templates.xaml:37-42 |
| Rough | Zone (checkerboard) | `RoughShapeFill` | `RoughShapeOutline` | RoughShapeTemplates.xaml:27-31 |
| Disengage | SoftObstacle (vertical) | `DisengageShapeFill` | `DisengageShapeOutline` | DisengageShape/Templates.xaml:38-42 |
| Water Hazard | HardObstacle (cross-hatch) | `WaterHazardShapeFill` | `WaterHazardShapeOutline` | WaterHazardShapeTemplates.xaml:26-30 |
| KeepOut | HardObstacle (cross-hatch) | — | — | KeepOutShapeTemplates.xaml:27 |
| Bunker | Bunker (dots) | `BunkerShapeFill` | `BunkerShapeOutline` | BunkerShapeTemplates.xaml:26-30 |
| Negative Obstacle | Negative (dots) | `NegativeObstacleShapeFill` | `NegativeObstacleShapeOutline` | NegativeObstacleShapeTemplates.xaml:26-30 |

### How PatternBrushMultiConverter Works (C# code-behind)

1. Takes 3-4 inputs: `DrawingBrushAndPattern`, background brush, foreground brush, optional scale
2. Creates a `DrawingGroup` with two children:
   - `GeometryDrawing` of a unit square (`M0,0 H1 V1 H0 Z`) filled with background color
   - `GeometryDrawing` of the pattern geometry filled with foreground color
3. Applies the pattern's `DrawingBrush` settings (tile mode, viewport, transform)
4. Optionally scales by `MetersPerPixel` for zoom-responsive pattern density

### HTML/CSS Implementation Notes

- SVG `<pattern>` elements replicate the WPF `DrawingBrush` tiling behavior
- Pattern geometry is scaled proportionally to the tile size (e.g., `M0,0 H0.5 V0.5` at 4x4 tile = 2x2 rect)
- `patternTransform="rotate(45)"` replicates the WPF `RotateTransform Angle="45"`
- Dot patterns use `<circle>` elements positioned from the `DotPattern` PathGeometry coordinates, scaled from the 90x80 source space to the 72x72 tile

---

## Component 1: BackgroundGridControl

### Full Visual Stack

The map background is three layers, defined across two XAML files:

| Layer | Source | Description |
|-------|--------|-------------|
| 1. Solid fill | `MapControl.xaml:35` | `Background="{MapBackgroundBrush}"` on the entire map UserControl. Token `--MapBackground: rgba(245, 245, 245, 1)` (LightTheme.css:138) |
| 2. Tiled grid | `BackgroundGridControl.xaml:24-137` | A Rectangle filled with a VisualBrush that tiles a Grid containing 6 rectangles at two opacity levels |
| 3. Left-edge shadow | `MapControl.xaml:174-187` | A 100px wide Rectangle with a horizontal LinearGradientBrush (ShadowElementsBrush.Color → transparent) at opacity 0.25, left-aligned |

### Grid Tile Structure (XAML lines 61-132)

The VisualBrush.Visual is a Grid with 4 rows × 4 columns:

```
                Col 0 (2px)    Col 1 (*)    Col 2 (2px)    Col 3 (1px)
Row 0 (2px)  ┌──────────────┬────────────┬──────────────┬─────────────┐
             │              │            │              │  Rect4 0.75 │
Row 1 (*)    │              │            │              │  Rect2 0.5  │
             │              │  (empty)   │              │  (cont.)    │
Row 2 (2px)  │              │            │              │  Rect5 0.75 │
             ├──────────────┼────────────┼──────────────┼─────────────┤
Row 3 (1px)  │  Rect3 0.75  │  Rect1 0.5 │  Rect6 0.75 │  overlap    │
             └──────────────┴────────────┴──────────────┴─────────────┘
```

All 6 rectangles use fill `MapGridLinesBrush` (--MapGridLines: `rgba(0, 0, 0, 0.063)`):

| Rect | XAML Lines | Grid Position | Opacity | Purpose |
|------|-----------|---------------|---------|---------|
| 1 | 90-96 | Row 3, Col 0-3 (full width) | 0.5 | Minor horizontal line |
| 2 | 97-103 | Row 0-3, Col 3 (full height) | 0.5 | Minor vertical line |
| 3 | 105-110 | Row 3, Col 0 | 0.75 | Major corner (bottom-left) |
| 4 | 111-116 | Row 0, Col 3 | 0.75 | Major corner (top-right) |
| 5 | 118-124 | Row 2-3, Col 3 | 0.75 | Major cross (bottom of vertical) |
| 6 | 125-131 | Row 3, Col 2-3 | 0.75 | Major cross (right of horizontal) |

**IMPORTANT: This is a SINGLE-FREQUENCY grid, not two grids at different spacings.**
Minor 1px lines form the grid at 0.5 opacity (Rects 1-2). At intersection corners, Rects 3-6 boost opacity to 0.75, making crossings ~50% darker than line runs. There are no separate "major" and "minor" grid spacings — just one grid with emphasized intersections.

**HTML/CSS implementation:** CSS gradients cannot represent per-intersection opacity. Use an SVG `<pattern>` element with all 6 rects at their exact pixel positions. The SVG tile is used as a `background-image` data URI or inline `<pattern>` def.

### Transforms (XAML lines 38-58)

Applied in order inside a `TransformGroup` on the VisualBrush:
1. **RotateTransform** — `Angle="{Binding WorldAndScreen.RotationAngleDegrees}"` (line 40)
2. **ScaleTransform** — X and Y both bound via `GridSizeMultiConverter` param=8 (lines 43-54)
3. **TranslateTransform** — `X="{Binding WorldAndScreen.Offset.X}"`, `Y="{Binding WorldAndScreen.Offset.Y}"` (lines 55-57)

### GridSizeMultiConverter (GridSizeMultiConverter.cs)

Source: `Common/Asi.CommonControls.Client.UI/Converters/GridSizeMultiConverter.cs`

Formula:
```
subdivisionLevel = min(ceil(log2(unitsPerPixel / 10.0)), 3)
finalGridSize = baseGridSize / 2^subdivisionLevel          // baseGridSize = 8 (param)
tilePixels = unitsPerPixel × finalGridSize
```

| Zoom state | unitsPerPixel | subdivisionLevel | finalGridSize | Tile px (approx) |
|-----------|---------------|------------------|---------------|-------------------|
| Very zoomed in | 0.01 | 3 (capped) | 1 (8/8) | ~41px |
| Zoomed in | 1 | 0 | 8 | 8px |
| Medium | 2 | 1 | 4 | 8px |
| Zoomed out | 2.5 | 1 | 4 | 10px |
| Zoomed out | 3 | 2 | 2 | 6px |
| Very zoomed out | 4 | 2 | 2 | 8px |

Unit-of-measure awareness: If `IUnitsManager` returns a non-SI unit (e.g., feet), `unitsPerPixel` is recalculated via `FromSI()` before subdivision, which shifts the grid spacing to align with foot intervals.

Test cases confirm (from GridSizeMultiConverterTests.cs):
- metersPerPixel=1 → tile=64px
- metersPerPixel=2 → tile=64px
- metersPerPixel=3 → tile=48px
- metersPerPixel=4 → tile=64px
- metersPerPixel=0.01 → tile=40.96px

### Left-Edge Shadow (MapControl.xaml lines 174-187)

```xml
<Rectangle Width="100" HorizontalAlignment="Left" IsHitTestVisible="False" Opacity="0.25">
  <Rectangle.Fill>
    <LinearGradientBrush StartPoint="0,0" EndPoint="1,0">
      <GradientStop Offset="0" Color="{Binding Color}" />  <!-- ShadowElementsBrush.Color -->
      <GradientStop Offset="1" Color="#00000000" />
    </LinearGradientBrush>
  </Rectangle.Fill>
</Rectangle>
```

- Width: 100px, full height (stretches to parent Grid)
- Alignment: Left
- Opacity: 0.25
- Gradient: `ShadowElementsBrush` color → transparent (`#00000000`)
- `IsHitTestVisible="False"` — non-interactive overlay
- Token: `--ShadowElements` (LightTheme.css) — typically a dark neutral

### Map Composition Layer Stack (CommandMapCompositionVM.cs)

The full layer rendering order (from LayersDto defaults, all `true`):

| Order | Layer | Default |
|-------|-------|---------|
| 1 | BackgroundGridLayer | on |
| 2 | ImageLayer | on |
| 3 | ShapeLayer | on |
| 4 | ShapeDecorationLayer | on |
| 5 | ObjectiveCreationLayer | on |
| 6 | ShapePluginLayer | on |
| 7 | CoverageHistoryLayer | on |
| 8 | AssignmentRenderingLayer | on |
| 9 | PositionHistoryLayer | on |
| 10 | LabelLayer | on |
| 11 | PinLayer | on |
| 12 | PlanningObstacleLayer | on |
| 13 | QueueObstacleLayer | on |
| 14 | AssetLayer | on |
| 15 | OnObjectUIPluginLayer | on |
| 16 | OnObjectUILayer | on |
| 17 | MeasurementToolLayer | on |

All layers are toggleable via persisted `LayersDto` (DataContract). The grid is always at the bottom of the stack.

### Dimensions
- Grid tile unit: dynamic (see GridSizeMultiConverter table above)
- Major grid lines: 2px thick (RowDefinition/ColumnDefinition Height/Width="2")
- Minor grid lines: 1px thick (RowDefinition/ColumnDefinition Height/Width="1")
- Left shadow overlay: 100px wide × full height

---

## Component 2: Map Shape Types (from MapContentControl.xaml)

### Shape Inheritance
```
BaseMapShapeControl
  └── SelectShapeControl
        ├── ObstacleShapeControl
        ├── ReferenceShapeControl
        ├── RoadShapeControl
        └── AozShapeControl
```

### Shape Visual Properties (from C# code-behind)

| Shape Type | Outline Width | Outline Style | Fill | Selection |
|-----------|---------------|---------------|------|-----------|
| **IMapShapeVM** (default) | 1 × Scale | Solid, Bevel/Flat/Square | DriveableShapeFill | 2px fg / 6px bg |
| **DrivableAreaVM** | 1 × Scale | Solid, Bevel/Flat/Square | DriveableShapeFill | 2px fg / 6px bg |
| **ReferenceShapeVM** | 1 × Scale | Dashed `[2,2]` | Pattern (Zone brush + ReferenceShapeFill) | 2px fg / 6px bg |
| **TransparentReferenceShapeVM** | — | Transparent outline | — | 2px fg / 6px bg |
| **ObstacleVM** | 2 × Scale | Solid, Bevel/Flat/Square | Conditional (Selectable vs Not) uses Pattern brush | 2px fg / 6px bg |
| **AozShapeVM** | 6 × Scale (bg) | Double: 4px solid + 4px dashed `[1,1]` | — | 2px fg / 6px bg |
| **SensedObstacleVM** | — | Ellipse 2.4 units + dashed ring 3 units | BackgroundStrong fill + InformationRed dashed | — |

### Selection State Rendering (all shapes)
When `IsSelected = true`, three layers render:
1. Base shape (fill + outline)
2. Background outline: `MapBackground` color, `6 × Scale` width
3. Foreground outline: `SelectionPrimary` color, `2 × Scale` width

### Locked State (from MapContentControl styles)
- Outline: `MapBackground` color, `6 × Scale` width (background)
- Overlay: `InformationOrange` color, `2 × Scale` width, dashed `3 3`

### Filtered-Out State
- `opacity: 0.175` when filtered out of view (XAML line 406)

---

## Component 3: ImageLayerControl

### Structure (from XAML)
```
LayerControl
  └── ItemsControl (ItemsSource: Images)
        ├── VectorImageShapeVM → Canvas > SelectShapeControl
        └── RasterImageShapeVM → Canvas > Image (ScaleY: -1, Stretch: Fill)
```

### Vector Image Properties
- Outline: `ForegroundPrimary`, width 1
- Selected foreground: `SelectionPrimary`, width 2
- Selected background: `MapBackground`, width 6
- Filtered opacity: 0.175

### Raster Image Properties
- ScaleY: -1 (flipped vertically — coordinate system inversion)
- BitmapScalingMode: Linear
- Stretch: Fill
- Filtered opacity: 0.175

---

## Component 4: TilingCanvas

### Structure (from XAML)
```
UserControl
  └── Canvas (x:Name="TileContainer")
```

Purely code-behind rendered. The canvas hosts dynamically generated tile elements based on:
- `DrawingExtents` — map bounding box
- `Scale` — meters per pixel
- `Transform` — world matrix
- `VisibleRegion` — screen viewport
- `Drawing` — tile content

---

## Pen/Stroke Defaults (from ShapeStyles.xaml + C# code-behind)

All shape paths share these base properties:
- `StrokeLineJoin: Bevel` (CSS: `stroke-linejoin: bevel`)
- `StrokeEndLineCap: Square` (CSS: `stroke-linecap: square`)
- `StrokeStartLineCap: Flat` (CSS: `stroke-linecap: butt`)
- `UseLayoutRounding: False`
- `SnapsToDevicePixels: False`

**Note:** WPF allows different start/end line caps. CSS `stroke-linecap` applies to both ends uniformly. Use `butt` (closest to Flat) for general shapes.
