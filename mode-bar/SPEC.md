# ModeBar XAML-to-HTML Structural Spec

## Resolved Dimensions
| Property | Value | Source |
|----------|-------|--------|
| BrandHeight | 100px | ASIBrand.xaml |
| BrandedModeBarWidth | 70px | ASIBrand.xaml |
| BrandedModeBarVerticalOffsetHeight | 13px | ASIBrand.xaml |
| ListView Margin | 0,50,0,0 | DefaultControls.xaml:6569 |
| Selection column | 4px | DefaultControls.xaml:6357 |
| Selection edge height (selected) | 44px (TouchSize) | spacingTokens.css |
| Icon grid height | 35px | DefaultControls.xaml:6285 |
| Icon OffsetMargin | 25,15,0,0 | DefaultControls.xaml:6273 |
| StatusIcon size | 12x12 | DefaultControls.xaml:6292 |
| StatusIcon margin | 0,-9,0,9 | DefaultControls.xaml:6294 |
| ActionPanel margin | 0,50,0,0 | DefaultControls.xaml:6590 |
| Help/About IconLabelExpander margin | 10,0,0,0 | DefaultControls.xaml:6654/6672 |
| Help/About OffsetMargin | 14,0,0,0 | DefaultControls.xaml:6656/6674 |
| Brand inner border margin | 10,0 (L,R) | ASIBrand.xaml:22 |
| Logo path margin | 10,0,10,8 | ASIBrand.xaml:29 |
| PoweredByRegion | 60px, Collapsed | DefaultControls.xaml:6685 |
| DisabledOpacity | 0.35 | spacingTokens.css |
| _contentSite margin | -4,0,0,0 | DefaultControls.xaml:6376 |

## Key Structural Facts
1. Hamburger lives in MainWindow.xaml, NOT in the ModeBar template. It overlays at y=113 (100+13).
2. ListView Margin="0,50,0,0" reserves space for the hamburger.
3. First list item starts at y=163 from top (100 brand + 13 offset + 50 margin).
4. _contentSite Margin=-4,0,0,0 pulls icon content into the 4px selection column.
5. OffsetMargin="25,15,0,0" on each mode icon: 25px left, 15px top within the 35px grid.
6. ActionPanel is VerticalAlignment=Bottom, separate sibling of ModePanel.
7. Brand: outer 70x100 (no bg), inner 50x100 (#002B45), logo margin 10,0,10,8 inside inner.

## HTML Element Mapping

```
aside.mob-modebar                          ← Grid[Column 0] Background=BackgroundStrong
├─ div.mob-modebar__brand                  ← Outer Border 70x100
│  └─ div.mob-modebar__brand-inner         ← Inner Border Margin=10,0 Background=#002B45
│     └─ span.mob-modebar__logo.mob-icon   ← Path VAlign=Bottom Margin=10,0,10,8
├─ div.mob-modebar__modes                  ← StackPanel "ModePanel" (minus brand rectangle)
│  ├─ (13px padding-top)                   ← Rectangle Height=13
│  ├─ button.mob-modebar__hamburger        ← ToggleButton from MainWindow (overlaid in WPF)
│  │  └─ span.mob-icon                     ← Path (hamburger icon)
│  └─ ul.mob-modebar__list                 ← ListView Margin=0,50,0,0 (adjusted for hamburger in flow)
│     └─ li.mob-modebar__item              ← ListBoxItem Grid (4px + * columns)
│        ├─ span.mob-modebar__selection-edge ← Border _selectionEdge
│        └─ span.mob-modebar__icon-wrap     ← IconLabelExpander > Grid Height=35
│           ├─ span.mob-icon                ← Path (mode icon)
│           └─ span.mob-modebar__status-badge ← StatusIcon 12x12
│        └─ span.mob-modebar__label         ← ExpanderItem > TextBlock
├─ div.mob-modebar__actions                ← StackPanel "ActionPanel" VAlign=Bottom
│  └─ button.mob-modebar__action-btn       ← Button with IconLabelExpander
│     ├─ span.mob-icon                     ← Path (action icon)
│     └─ span.mob-modebar__label           ← TextBlock label
```
