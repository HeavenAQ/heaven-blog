---
categories:
- Computational Photography
- lectures
createdAt: '2025-10-12'
description: '- Affine transformation'
tags:
- lectures
- Computational Photography
title: 11. Image Morphing
---
# 6.1 Image Morphing

![clipboard.png](/blog/61-image-morphing/q1XjEeVa-clipboard.webp)

- Affine transformation

## Image Morphing

- How do we map intensities from one image to another image

### Forward Mapping

![clipboard.png](/blog/61-image-morphing/GUdfNlI9-clipboard.webp)

- Send each pixel $f(x, y)$ to its corresponding location $(x', y') = T(x, y)$ in the second image
- Use <mark>splatting</mark> if the pixel to be transferred lies in between two pixels in the target image
 - Distribute color among neighboring pixels $(x', y')$
 - The neighboring pixels are partly colored with the current pixel

> [!CAUTION]
>
> - You may create a lot of artifacts when the number of pixels is small
> - You may have a lot of blank pixels when the number of pixels is large

## Inverse Mapping

![clipboard.png](/blog/61-image-morphing/ZDDVnXdi-clipboard.webp)

- Find the position in the source image from the target image
- Get each pixel $g(x', y')$ from its corresponding
 location $(x, y) = T^{-1}(x', y')$ in the first image
- Use <mark>interpolation</mark> if the pixel to be transferred lies in between two pixels in the source image
 - nearest neighbor
 - bilinear
 - Gaussian
 - bicubic

### Bilinear Interpolation

![clipboard.png](/blog/61-image-morphing/ZZpzOpbc-clipboard.webp)

- **estimates** the pixel value at a **non-integer position $(x, y)$** using the **four nearest** pixels surrounding it.

$$
f(x, y) \approx \left[1 - x \quad x \right] \begin{bmatrix} f(0,0) \quad f(0, 1) \\ f(1, 0) \quad f(1, 1)\end{bmatrix} \begin{bmatrix}1 - y \\ y\end{bmatrix}
$$

1. Interpolate along x between each pair of horizontal
2. Then interpolate those results along y.

> [!TIP]
>
> Usually, inverse mapping eliminates holes; however, it requires **invertible warp function**

## Morphing = Object Averaging

![clipboard.png](/blog/61-image-morphing/0u8YmLFf-clipboard.webp)

- The aim is to find "an average" between two objects
 - **NOT** an average of two **images of objects**
 - an image of **average object**
 - involves transforming both the <mark>coordinates (alignment)</mark> and the <mark>intensities (texture combination)</mark>
 - Smooth transition $\rightarrow$ weighted average over time

## Averaging Points

- What's the average of P and Q?

![clipboard.png](/blog/61-image-morphing/wTMvWbLO-clipboard.webp)

### Linear Interpolation

- Given $0 < t < 1$
 - New point: $P + t(Q - P)$
 - Or: $(1 - t)P + tQ$
- **Meaning**
 - Generate intermediate frames between the source and target
- **Effect**
 - Smoothly blends position and color between two images

---

### Extrapolation

- Given $ t > 1, t < 0$
 - New point: $P + t(Q - P)$
 - Or: $(1 - t)P + tQ$
- **Meaning**
 - Moving beyond the original range of blending
- **Effect**
 - $t < 0$: extrapolates before the source
 - $t > 1$: extrapolate past the target
 - Produces exaggerated transformation

## Cross-Dissolve

![clipboard.png](/blog/61-image-morphing/vShCpf-e-clipboard.webp)

- Interpolate whole images:
 $$
 Image_{halfway} = (1 - t) \times Image_1 + t \times Image_2
 $$
- This is called cross-dissolve in film industry
- As long as the change of color values is monotonous, interpolation would work

> [!IMPORTANT]
>
> If the images are not aligned, you need to align them first and then cross-dissolve

## Local warp, then cross-dissolve

![clipboard.png](/blog/61-image-morphing/wkDLRaUO-clipboard.webp)

### Feature matching

- Nose to nose, tail to tail, etc.
- This is a local (non-parametric) warp

### Morphing Procedure

1. Find the average shape

- local warping

2. Find the average color

- Cross-dissolve the warped images

## Warp Specification - dense

![clipboard.png](/blog/61-image-morphing/XuQQp0br-clipboard.webp)

### 1. Specify corresponding points

![clipboard.png](/blog/61-image-morphing/qdSyJSJJ-clipboard.webp)

---

### 2. Triangular Mesh

![clipboard.png](/blog/61-image-morphing/8TplsH8c-clipboard.webp)

- Define a triangular mesh over the points
 - same mesh in both images
 - Now we have triangle to triangle correspondences
 - Warp each triangle separately from source to target
 - Affine warp with three corresponding points

#### Triangulations

![clipboard.png](/blog/61-image-morphing/ixBYlIBr-clipboard.webp)

- A partition of the convex hull to triangles whose vertices are the points, and do not contain other points
- $O(n^3)$ Algorithm

 ```
 Repeat until impossible
 1. Select two sites
 2. If the dedge connecting them does not intersect previous edges, keep it.
 ```

- Quality
 - A triangulation $T_1$ is **better** than $T_2$ if the smallest angle of $T_1$ is larger than the smallest angle of $T_2$

#### Delaunay Triangulation by Duality

![clipboard.png](/blog/61-image-morphing/FYEIguLB-clipboard.webp)
![clipboard.png](/blog/61-image-morphing/mjWxa0eK-clipboard.webp)

- Draw the dual to the Voronoi diagram by connecting each two neighboring sites in the Voronoi diagram.
- The DT may be constructed in O(nlogn) time

---

### 3. Morphing Sequence

#### 3-1. Create an intermediate shape (by interpolation)

- How do we create an intermediate shape at time $t$?
- Assume $t = [0, 1]$
- $(1 - t) \times p_1 + t \times p_0$

#### 3-2. Warp both images towards it

#### 3-3. Cross-dissolve the colors in the newly warped images


## Summary of Morphing
1. Define corresponding points
2. Define triangulation on points
 - Use same triangulation for both images
3. For each t = 0:step:1
 1. Compute the average shape (weighted average of points)
 2. For each pixel in the triangle, find the corresponding points in each image and set value to the weighted average <mark>(warp image toward the average shape)</mark>
 3. Save the image as the next frame of the sequence
 
