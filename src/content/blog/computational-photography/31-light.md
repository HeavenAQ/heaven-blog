---
categories:
- Computational Photography
- lectures
createdAt: '2025-09-10'
description: '- We perceives color from the complex interacction of multiple factors'
tags:
- lectures
- Computational Photography
title: 3.1 Light
---

# 3.1 Light

![clipboard.png](/blog/31-light/aCrvh87Q-clipboard.webp)

## Introduction to Light and Color Perception

- We perceives color from the complex interacction of multiple factors

### Factors Determining Perceived Color

- **Material properties** (albedo / reflectnace)
- **Surface Geometry** (angles, shadows, highlights)
- **Illumination specturm** (color temperature of light source)
- **Viewing conditions** (adaptation state, surrounding colors)
 > **albedo:** the proportion of the incident light or radiation that is reflected by a surface, typically that a planet or moon

### Mathematical Representation:

$$
I_{perceieved}(x, y) = R(x, y) \times L(x, y) \times G(x, y)
$$

where:

- $R(x, y)$: reflectance (material property)
- $L(x, y)$: illumination intensity
- $G(x, y)$: geometric fctors (surface, angles)

## The Eye

![clipboard.png](/blog/31-light/PcKmBsRh-clipboard.webp)
| **Eye Component** | **Camera Equivalent** | **Function** |
| ---- | ----| ----|
| _Iris_ | Aperture diaphragm | Spans and contracts pupils to control light amount |
| _Pupil_ | Aperture opening | Light entry point |
| _Lens_ | Camera lens | Focuses light |
| _Retina_ | Image sensor/film | Detects light |
| _Optic nerve_ | Data cable | Transmits signals |

## Retinal Structure

- The retina is **NOT** a simple light-detection surface. Light must pass through multiple layers.

![clipboard.png](/blog/31-light/HnX3EIfa-clipboard.webp)

1. **Ganglion cells**
 - First layer light encounters
 - contrast-sensitive
 - control iris response
 - process initial visual information
2. **Bipolar and horizontal cells**
 - Intermediate processing layers
 - handle lateral inhibitation (edge enhancement)
 - contribute to automatic responses (blink reflex)
3. **Photoreceptors**
 - Rods and cones for actual light detection
 - Convert photons to electrical signals
 - Foundation of all vision

> [!IMPORTANT]
> This _backwards_ arrangement means light is partially filtered and processed before reaching phtoreceptors

## Phtoreceptors: Rods and Cones

![clipboard.png](/blog/31-light/_xLWDtww-clipboard.webp)

- Humans have two separate visual systems operating simultaneously.

| Feature | Rods | Cones |
| ----------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| Primary Function | Vision in low light, peripheral vision, motion detection | Color vision, central vision, and detail acuity |
| Light Sensitivity | High; active in dim light | Low; active in bright light |
| Color Perception | Responsible gray-scale vision | Responsible color vision |
| Distribution | More numerous and concentrated in the periphery of the retina | Less numerous and concentrated in the center of the retina |
| Detail Acuity | low | high |

## LMS cone cells

- OPN1LW
 - (long-wavelength, red)
 - X chromosome
- OPN1MW
 - (medium-wavelength, green)
 - X chromosome
- OPN1SW
 - (short-wavelength, blue)
 - chromosome 7

## Surface

### Lambertian Surface

![clipboard.png](/blog/31-light/t4jUtrIl-clipboard.webp)

- Some light is absorbed
 - albedo
- Remaining light is reflected in all directions
 - diffuse reflection

## Diffuse reflection

![clipboard.png](/blog/31-light/2mmWOT-d-clipboard.webp)

- Intensity depends on illumination angle
 - less light comes in at oblique angles

![clipboard.png](/blog/31-light/HrYaJvRF-clipboard.webp)

- **However**, perceived intensity does not depend on viewer angle
 - The amount of reflected light are proportional to $cos(\theta)$
 - Visible solid angle also proportional to $cos(\theta)$

---

## Specular Reflection

![clipboard.png](/blog/31-light/7RZSG365-clipboard.webp)
- Light reflected in one direction
- Reflected direction depends on light orientation and surface normal
- **Specularity**
 - spot where specular reflection dominates (typically reflects light source)

---

## BRDF

- Bidirectional reflectance distribution function

![clipboard.png](/blog/31-light/oKI0DEy_-clipboard.webp)

## More complicated effects

![clipboard.png](/blog/31-light/wiOnJ4Aa-clipboard.webp)
![clipboard.png](/blog/31-light/8YnqDobz-clipboard.webp)
![clipboard.png](/blog/31-light/_e1gIAzp-clipboard.webp)

## Things to remember

- Light has a spectrum of wavelengths
- Observed light depends on illumination intensities, surface orientation, material
- Every object is an indirect light source for every other
- Shading and shadows are informative about shape and position
