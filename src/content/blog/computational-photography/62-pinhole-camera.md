---
categories:
- Computational Photography
- lectures
createdAt: '2025-10-12'
description: '- Angless and length are lost'
tags:
- lectures
- Computational Photography
title: 12. Pinhole Camera
---
# 6.2 Pinhole Camera

## Projective Geometry

- Angless and length are lost

![clipboard.png](/blog/62-pinhole-camera/M_NwXzKQ-clipboard.webp)
![clipboard.png](/blog/62-pinhole-camera/h-vEPbbA-clipboard.webp)

---

### Vanishing Points and Lines

![clipboard.png](/blog/62-pinhole-camera/w4tIUIqz-clipboard.webp)

- The projections of **parallel 3D lines** intersect at a <mark>vanishing point</mark>
 - vanishing point $\rightarrow$ 3D direction of a line
- The projections of **parallel 3D lines** intersect at a <mark>vanishing line</mark>
 - vanishing line $\rightarrow$ 3D orientation of a surface
- If a set of **parallel 3D lines** are also parallel to a particular plane, their vanishing point will lie on the vanishing line of the plane

![clipboard.png](/blog/62-pinhole-camera/GvOmLXeG-clipboard.webp)

## Projection: world coordinates $\rightarrow$ image coordinates

![clipboard.png](/blog/62-pinhole-camera/rRhDbKcQ-clipboard.webp)

$$
\frac{Y - Y_c}{Z} = \frac{v - v_0}{f} \\
v = f\frac{Y - Y_c}{Z} + v_0 \\
u = f\frac{X - X_c}{Z} + u_0
$$

![clipboard.png](/blog/62-pinhole-camera/0XxZYvRN-clipboard.webp)

## Projection Matrix

![clipboard.png](/blog/62-pinhole-camera/GVAEkrzR-clipboard.webp)

$$
\begin{cases}
 wu = fx \\
 wv = fy \\
\end{cases}
\quad
(w = z)
\\ \implies
\begin{cases}
 u = \frac{fx}{z} \\
 v = \frac{fy}{z} \\
\end{cases}
$$

- **Intrinsic Assumptions**
 - Unit aspect ratio
 - Principal point at (0, 0)
 - No skew
- **Extrinsic Assumptions**
 - No rotation
 - Camera at (0, 0, 0)

$$
x = K[I \quad 0] X \implies w\begin{bmatrix}u \\ v \\ 1\end{bmatrix} =
\begin{bmatrix}
 f &0 &0 &0 \\
 0 &f &0 &0 \\
 0 &0 &1 &0 \\
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}
$$

where

$$
K =
\begin{bmatrix}
 f &0 &0 \\
 0 &f &0 \\
0 &0 &1 \\
\end{bmatrix}
$$

### If not at (0, 0)

$$
K =
\begin{bmatrix}
 f &0 &u_0 \\
 0 &f &v_0 \\
0 &0 &1 \\
\end{bmatrix}
\quad
(u = \frac{fx}{z} + u_0)
$$

---

### If pixels are not square

$$
K =
\begin{bmatrix}
 \alpha &0 &u_0 \\
 0 &\beta &v_0 \\
0 &0 &1 \\
\end{bmatrix}
\quad
\left(
\begin{cases}
 \alpha: \text{scale of focal in x direction} \\
 \beta: \text{scale of focal in y direction}
\end{cases}
\right)
$$

---

### If pixels are skewed

$$
K =
\begin{bmatrix}
 \alpha &s &u_0 \\
 0 &\beta &v_0 \\
 0 &0 &1 \\
\end{bmatrix}
$$

---

### Allow Camera Translation

$$
\begin{align*}
&x = K[I \mid t]X \\
&\implies
w
\begin{bmatrix}
u \\
v \\
1
\end{bmatrix}
=
\begin{bmatrix}
 \alpha &0 &u_0 \\
 0 &\beta &v_0 \\
0 &0 &1 \\
\end{bmatrix}
\begin{bmatrix}
1\quad 0\quad 0\quad t_x \\
0\quad 1\quad 0\quad t_y \\
0\quad 0\quad 1\quad t_z \\
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}
\end{align*}
$$

> [!WARNING]
>
> $
> \begin{bmatrix}
> x \\
> y\\
> z\\
> 1
> \end{bmatrix}
>$
> is not the camera center. It is the amount of 3D points that have to have to move in order to enter the camera's coordinates

---

### Allow camera rotation

$$
\begin{align*}
&x = K[R \mid t]X \\
&\implies
w
\begin{bmatrix}
u \\
v \\
1
\end{bmatrix}
=
\begin{bmatrix}
 \alpha &s &u_0 \\
 0 &\beta &v_0 \\
0 &0 &1 \\
\end{bmatrix}
\begin{bmatrix}
r_{11}\quad r_{12}\quad r_{13}\quad t_x \\
r_{21}\quad r_{22}\quad r_{23}\quad t_y \\
r_{31}\quad r_{32}\quad r_{33}\quad t_z \\
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}
\end{align*}
$$

> [!IMPORTANT]
>
> - Matrix R is orthonormal
> - DoF
> - Intrinsic matrix: 5
> - Extrinsic matrix: 6

## Vanishing Point = Projection from infinity

$$
\begin{align*}
p
&=
K [R \quad \cancel{t}]
\begin{bmatrix}
x \\
y \\
z \\
\cancel{0} \\
\end{bmatrix} \\
&= KR
\begin{bmatrix}
x \\
y \\
z
\end{bmatrix} \\
&= K
\begin{bmatrix}
x_R \\
y_R \\
z_R \\
\end{bmatrix}
\end{align*}
$$

$$
w
\begin{bmatrix}
u \\
v \\
1
\end{bmatrix}
=
\begin{bmatrix}
f \quad 0 \quad u_0 \\
0 \quad f \quad v_0 \\
0 \quad 0 \quad 1
\end{bmatrix}
\begin{bmatrix}
x_R \\
y_R \\
z_R \\
\end{bmatrix}

\implies
\begin{cases}
u = \frac{fx_R}{z_R} + u_0 \\
v = \frac{fy_R}{z_R} + v_0
\end{cases}
$$

## Orthographic Projection

![clipboard.png](/blog/62-pinhole-camera/lEAqZ0wt-clipboard.webp)

- Special case of perspective projection
- used when the scene is far away or depth variation is small.
- It assumes <mark>parallel projection rays</mark>
 - All lines of sight are parallel, not converging.

$$
\begin{bmatrix}
u\\
v\\
1
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0 & u_0\\
0 & 1 & 0 & v_0\\
0 & 0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
x\\
y\\
z\\
1
\end{bmatrix}
$$

## Scaled Orthographic Projection

![clipboard.png](/blog/62-pinhole-camera/vvd4_7tC-clipboard.webp)

- <mark>weak perspective</mark>
- Assume that all points in the object are roughly at the same average depth $Z_0$
- Perspective effects are approximated by a constant scale factor.

$$
x = sX, \quad y = sY
$$

where

- $s = \frac{f}{Z_0}$

$$
\begin{bmatrix}
u\\
v\\
1
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0 & 0\\
 0 & 1 & 0 & 0\\
0 & 0 & 0 & s
\end{bmatrix}
\begin{bmatrix}
x\\
y\\
z\\
1
\end{bmatrix}
$$

## Summary

| Model | Projection Equations | Notes |
| ------------------------------------------ | ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Perspective** | $ x = \frac{fX}{Z} \\ y = \frac{fY}{Z} $ | Realistic camera model; nonlinear; introduces foreshortening and vanishing points. |
| **Scaled Orthographic (Weak Perspective)** | $ x = sX\\ y = sY\\ s = \frac{f}{Z_0}$ | Linear approximation of perspective; assumes small depth variation; preserves shape ratios. |
| **Orthographic** | $x = X\\ y = Y \\$ | Simplest linear model; no scaling or depth effect; preserves parallelism and true dimensions. |

> [!TIP]
>
> Homogeneous coordinates allows 3D world points mapped to 2D image points in a linear way
