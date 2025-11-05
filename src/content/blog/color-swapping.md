---
categories:
- Computational Photography
- homework
createdAt: '2025-09-13'
description: '- Substituting a specific color in an image with some targeted color
 for the purpose of exploration, design, image, and creation.'
tags:
- homework
- Computational Photography
title: Color Swapping
---

# Color Swapping

## Definition

- Substituting a specific color in an image with some targeted color for the purpose of exploration, design, image, and creation.

## Color Spaces

- Different numerical systems to represent the association of color/colors in a particular display/image.

### $\bullet$ RGB Color Space

![clipboard.png](/blog/color-swapping/bncbOyrF-clipboard.webp)

- 3-dimensional space based on an $RGB$ color
- Any color is a mixture of different intensities of the three primary color components (RGB)

### $\bullet$ HSV Color Space

![clipboard.png](/blog/color-swapping/rTfLsLr5-clipboard.webp)

- Separate components for representing color and intensity
- **Hue**
 - Represents the color of a pixel with a value ranges from 0 to 360 (azimuthal angle)
- **Saturation**
 - amount of `purity` and `colorfulness` of a color.
 - Lower saturation $\Rightarrow$ faded or grayed out.
- **Value**
 - the brightness or darkness of a hue

### $\bullet$ LAB color space

![clipboard.png](/blog/color-swapping/rxCBmgQW-clipboard.webp)

- Similar to how HSV color space separate color components to represent
- `2` components to `represent color` and `1` separate component for brightness value
- `128` is the neutral value (gray) for both `A` and `B`
- **L**
 - Lightness component
 - $0: Black\quad\quad100: White$
- **A**
 - color component specifying the combination of Red and Green
 - $a< 0\quad(\rightarrow green)\quad\quad a > 0\quad(\rightarrow red)$
- **B**
 - color component specifying the combination of Blue and Yellow
 - $a< 0\quad(\rightarrow blue)\quad\quad a > 0\quad(\rightarrow yellow)$
