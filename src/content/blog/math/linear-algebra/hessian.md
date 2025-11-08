---
categories:
- Math
- Linear Algebra
createdAt: '2025-09-29'
description: If you have a real-valued function
tags:
- Math
- Linear Algebra
title: 1. Hessian Matrix
---
# Hessian

## Definition

If you have a real-valued function

$$
f: \R^d \rightarrow \R
$$

The Hessian matrix of f at a point $\textbf{w} \in \R^d$ is the square matrix of all second-order partial derivaties:

$$
H(w) = \nabla^2f(w) =

\begin{bmatrix}
\frac{\partial^2 f}{\partial w_1^2} & \frac{\partial^2 f}{\partial w_1 \partial w_2} & \cdots & \frac{\partial^2 f}{\partial w_1 \partial w_d} \\
\frac{\partial^2 f}{\partial w_2 \partial w_1} & \frac{\partial^2 f}{\partial w_2^2} & \cdots & \frac{\partial^2 f}{\partial w_2 \partial w_d} \\
\vdots & \vdots & \ddots & \vdots \\
\frac{\partial^2 f}{\partial w_d \partial w_1} & \frac{\partial^2 f}{\partial w_d \partial w_2} & \cdots & \frac{\partial^2 f}{\partial w_d^2}
\end{bmatrix}
$$

- Entry $H_{ij} = \frac{\partial^2 f}{\partial w_i \partial w_j}$
- If $f$ is **smooth**, the Hessian is **symmetric** $(H_{ab} = H_{ba})$

> [!TIP]
>
> **What does "smooth" mean?**
>
> $$
> f \in C^2(\R^d)
> $$
>
> - $f$ has continuous first and second derivatives s.t.
> $$
> \frac{\partial^2 f}{\partial w_i \partial w_j} = \frac{\partial^2 f}{\partial w_j \partial w_i} \quad\quad \forall i, j
> $$

## Geometric Meaning

- The gradient $\nabla f(w)$ tells you the slope/direction of the steepest ascent
- The $Hessian$ tells you about the **curvature**

 - How much the slope changes as you move
 - Whether the current surface bends upwards (convex), downwards (concave), or in a saddle point.

![clipboard.png](/blog/hessian/_-rpDEHV-clipboard.webp)

> [!TIP]
>
> **Second derivative test**
>
> - **Univariate**
>
> $$
> \begin{cases}
> \text{concave, local maximum}\quad (f''(x) < 0) \\
> \text{convex, local mimimum}\quad (f''(x) > 0) \\
> \text{saddle point}\quad (f''(x) = 0) \\
> \end{cases}
> $$
>
> - **Multivariate**
>
> - The sign of the determinant of the Hessian matrix
> - Or $D = f_{xx}f_{yy} - f_{xy}^2$
>
> $$
> \begin{cases}
> D = 0 \quad (inconclusive) \\
> D < 0 \quad (saddle point) \\
> D >0, f_{xx} > 0 \quad (local\ minimum) \\
> D >0, f_{xx} < 0 \quad (local\ maximum)
> \end{cases}
> $$

## Definiteness and Curvature

*A way to classify the nature of a point*

- **Positive Definite (PD)**
  - $z^\intercal Hz > 0, \forall z \ne 0$
  - function curves **upward** everywhere (local minimum)
- **Negative Definite (ND)**
  - $z^\intercal Hz < 0, \forall z \ne 0$
  - function curves **downwards** everywhere (local maximum)
- **Positive Semi-definite (PSD)**
  - $z^\intercal Hz \ge 0, \forall z \ne 0$
  - function curves **upward** (convex) but may be flat in some directiosn
- **Negative Semi-definite (NSD)**
  - $z^\intercal Hz \le 0, \forall z \ne 0$
  - function curves **downward** (concave) but may be flat in some directiosn
- **Indefinite**
  - Some directions curve up, others down.

| Type | Quadratic form | Eigenvalues condition | Geometry |
| ---------------------------- | ---------------------------------- | -------------------------- | ---------------------- |
| Positive definite (PD) | $(>0)$ for all $(\mathbf z\neq 0)$ | All $(\lambda > 0)$ | Strict convex bowl |
| Positive semi-definite (PSD) | $(\geq 0)$ for all $(\mathbf z)$ | All $(\lambda \geq 0)$ | Convex, flat possible |
| Negative definite (ND) | $(<0)$ for all $(\mathbf z\neq 0)$ | All $(\lambda < 0)$ | Strict concave dome |
| Negative semi-definite (NSD) | $(\leq 0)$ for all $(\mathbf z)$ | All $(\lambda \leq 0)$ | Concave, flat possible |
| Indefinite | Both positive and negative values | Mix of + and – eigenvalues | Saddle |
