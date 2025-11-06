---
categories:
- Computational Photography
- lectures
createdAt: '2025-10-11'
description: $$
tags:
- lectures
- Computational Photography
title: 5.2 Image Warping
---

# 5.2 Image Warping

![clipboard.png](/blog/52-image-warping/d416vVDu-clipboard.webp)

### How would you make a sharpening filter using gradient domain processing? What are the constraints on the gradients and the intensities?

$$
\alpha(S(x, y) - S(x + 1, y)) \approx t(x, y) - t(x + 1, y)
$$

where

- $\alpha > 1$
- We simply use $\alpha$ to increase the gradient to enlarge the difference between neighboring pixels

## Image Warping

- Changing the domain or corner of an image

![clipboard.png](/blog/52-image-warping/3HlAQBbh-clipboard.webp)

### Parametric Warping

![clipboard.png](/blog/52-image-warping/rDJ1QSXY-clipboard.webp)

- Transformation $T$ is a coordinate-changing machine:

$$
p' = T(p)
$$

#### What does it me3an that T is global?

- Is the same for any point p
- For lienar transformations, we can represent T as a matrix

$$
\begin{align*}
&p' = Mp \\
&\begin{bmatrix}
x' \\
y' \\
\end{bmatrix}
=
\textbf{M}
\begin{bmatrix}
x' \\
y' \\
\end{bmatrix}

\end{align*}
$$

![clipboard.png](/blog/52-image-warping/1GQva8qn-clipboard.webp)

## Scaling

- A coordinate means multiplying each of its components by a scalar

### $\bullet$ Uniform scaling

- The scalar applied is the same for all components:

![clipboard.png](/blog/52-image-warping/eSTDRVZw-clipboard.webp)

### $\bullet$ Non-uniform scaling

- different scalars per component:

![clipboard.png](/blog/52-image-warping/gyFDmxLZ-clipboard.webp)

### Formula

$$
\begin{align*}
&x' = ax \\
&y' = by \\
&\begin{bmatrix}
x' \\
y' \\
\end{bmatrix}
=
&\begin{bmatrix}
a \quad 0 \\
0 \quad b \\
\end{bmatrix}
&\begin{bmatrix}
x \\
y \\
\end{bmatrix}
\end{align*}
$$

> [!TIP]
> To transform back from (x', y'), you just change a and b to $\frac{1}{a}$ and $\frac{1}{b}$ (inverse of the matrix)

## 2-D Rotation

![clipboard.png](/blog/52-image-warping/NFBGtiEZ-clipboard.webp)

$$
\begin{align*}
&x = rcos(\phi)\\
&y = rsin(\phi) \\
&x' = rcos(\phi + \theta) \\
&y' = rsin(\phi + \theta) \\
\end{align*}
$$

$$
\begin{align*}
x' &= r(cos(\phi)cos(\theta) - sin(\phi)sin(\theta)) \\
 &= xcos(\theta) - y(sin\theta)\\
y' &= r(sin(\phi)cos(\theta) + cos(\phi)sin(\theta)) \\
 &= xsin(\theta) + ycos(\theta) \\
\implies
&\begin{bmatrix}
x' \\
y' \\
\end{bmatrix}

=

\begin{bmatrix}
&cos(\theta) \quad &-sin(\theta) \\
&sin(\theta) \quad &cos(\theta)
\end{bmatrix}
\begin{bmatrix}
x \\
y\\
\end{bmatrix}
\end{align*}
$$

> [!IMPORTANT]
>
> Even though $cos$ and $sin$ are non-linear functions, $x'$ and $y'$ are linear combinations of $x$ and $y$.

> [!TIP]
>
> **Inverse Transformation**
>
> - Rotation by $-\theta$
> - For rotation matrices $R^{-1} = R^T$

## Operations for 2x2 Matrices

### Identity

$$
\begin{bmatrix}
x' \\
y' \\
\end{bmatrix}
=
\begin{bmatrix}
1 \quad 0 \\
0 \quad 1 \\
\end{bmatrix}
\begin{bmatrix}
x \\
y\\
\end{bmatrix}
$$

### Scale around (0, 0)

$$
\begin{bmatrix}
x' \\
y' \\
\end{bmatrix}
=
\begin{bmatrix}
s_x \quad 0 \\
0 \quad s_y \\
\end{bmatrix}
\begin{bmatrix}
x \\
y\\
\end{bmatrix}
$$

### 2D Rotate around (0, 0)

$$
\begin{bmatrix}
x' \\
y' \\
\end{bmatrix}

=

\begin{bmatrix}
&cos(\theta) \quad &-sin(\theta) \\
&sin(\theta) \quad &cos(\theta)
\end{bmatrix}
\begin{bmatrix}
x \\
y\\
\end{bmatrix}
$$

### 2D Shear

- Transform a rectangular shape to a parallegram

$$
\begin{bmatrix}
x' \\
y' \\
\end{bmatrix}

=

\begin{bmatrix}
1 \quad k_x \\
k_y \quad 1 \\
\end{bmatrix}
\begin{bmatrix}
x \\
y\\
\end{bmatrix}
$$

### Mirror about Y axis

$$
\begin{bmatrix}
x' \\
y' \\
\end{bmatrix}

=

\begin{bmatrix}
-1 \quad 0 \\
0 \quad 1 \\
\end{bmatrix}
\begin{bmatrix}
x \\
y\\
\end{bmatrix}
$$

### Mirror over (0, 0)

$$
\begin{bmatrix}
x' \\
y' \\
\end{bmatrix}

=

\begin{bmatrix}
-1 \quad 0 \\
0 \quad -1 \\
\end{bmatrix}
\begin{bmatrix}
x \\
y\\
\end{bmatrix}
$$

> [!CAUTION]
>
> **2D translation is NOT FEASIBLE**
>
> _Due to the consant terms for translating x and y_
>
> - $x' = x + t_x$
> - $y' = y + t_y$

## Homogeneous Coordinates

- Represent coordinates in 2 dimensions with a 3-vector

$$
\begin{bmatrix}
x \\
y \\
\end{bmatrix}

\overbrace{\rightarrow}^{\text{homogeneous coords}}

\begin{bmatrix}
x \\
y \\
1
\end{bmatrix}
$$

- Homogeneous coordinates are scale-invariant
- Any scale version of this vector represents the same point:
 $$
 (X, Y, Z, 1) \sim (\lambda X, \lambda Y, \lambda Z, \lambda)
 $$

![clipboard.png](/blog/52-image-warping/baxzWUY6-clipboard.webp)

> [!WARNING]
>
> - $(x, y, 0)$ represents a point at infinity
> - $(0, 0, 0)$ is not allowed

## 2D Image Transformations

![clipboard.png](/blog/52-image-warping/lXUfy3E7-clipboard.webp)

### $\bullet$ Translation

#### Form

- $x' = x + t_x, \quad y' = y + t_y$

#### Matrix

$$
\begin{bmatrix}
I \mid t
\end{bmatrix}
$$

#### DoF

- $2: (t_x, t_y)$

#### Preserves

- Every relative geometry as it only shifts the pixels

---

### $\bullet$ Rigid (Euclidean)

- **Rotation + Translation**

#### Form

- $x' = Rx + t_x, \quad y' = Ry + t_y$

#### Matrix

$$
\begin{bmatrix}
R \mid t
\end{bmatrix},
\quad
R=
\begin{bmatrix}
&cos(\theta) \quad &-sin(\theta) \\
&sin(\theta) \quad &cos(\theta) \\
\end{bmatrix}
$$

#### DoF

- $3: \theta, (t_x, t_y)$

#### Preserves

- Lengths, angles, parallelism, straight lines, orientation.

---

### $\bullet$ Similarity

- **uniform scale + rotation + translation**

#### Form

- $x' = sRx + t_x, \quad y' = sRy + t_y \quad(s > 0)$

#### Matrix

$$
\begin{bmatrix}
sR \mid t
\end{bmatrix},
\quad
R=
\begin{bmatrix}
&cos(\theta) \quad &-sin(\theta) \\
&sin(\theta) \quad &cos(\theta) \\
\end{bmatrix}
$$

#### DoF

- $4: s, \theta, (t_x, t_y)$

#### Preserves

- Angles and shape

---

### $\bullet$ Affine

- linear 2x2 translation

#### Form

- $x' = Ax + t_x, \quad y' = Ay + t_y \quad(\text{A is any 2x2 matrix})$

#### Matrix

$$
\begin{bmatrix}
A \mid t
\end{bmatrix}
$$

#### DoF

- $6: A = \begin{bmatrix}a\quad b \\ c\quad d\end{bmatrix}, (t_x, t_y)$

#### Preserves

- Parallelism and ratios of lengths along a line.

---

### $\bullet$ Projective (Homography)

- Full $3 \times 3$

#### Form

- $\tilde{x}' \sim H\tilde{x} \quad \quad(H \in \R^{3 \times 3}, \tilde{x} = (x, y, 1)^T)$

#### Matrix

$$
H =
\begin{bmatrix}
a \quad b \quad c \\
d \quad e \quad f \\
g \quad h \quad i \\
\end{bmatrix}
$$

#### DoF

- $8: A = 9$ entries minus 1 overall scale constraint

#### Preserves

- Straight lines. Parallel lines need not remain parallel.
 