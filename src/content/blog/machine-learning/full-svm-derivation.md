---
categories:
- Machine Learning
- reading materials
createdAt: '2025-10-17'
description: $$
tags:
- reading materials
- Machine Learning
- Machine Learning
- AI
title: 'Supplement: Full SVM Derivation'
---
# Full SVM Derivation

## 1) Primal (soft-margin, L1 slack)

$$
\begin{aligned}
\min_{w,b,\xi}\quad
& \frac12|w|*2^2 + C\sum*{i=1}^N \xi_i \
\text{s.t.}\quad
& y_i\big(w^\top x_i + b\big) \ge 1-\xi_i,\quad \xi_i\ge 0\qquad (i=1,\dots,N).
\end{aligned}
$$

---

## 2) Lagrangian and KKT

Introduce multipliers $\alpha_i\ge 0$ for $1-\xi_i - y_i(w^\top x_i+b)\le 0$ and $\mu_i\ge 0$ for $-\xi_i\le 0$:

$$
\mathcal L(w,b,\xi,\alpha,\mu)
=\frac12|w|^2 + C\sum_i \xi_i
+\sum_i \alpha_i\big(1-\xi_i - y_i(w^\top x_i+b)\big) - \sum_i \mu_i \xi_i.
$$

Stationarity:

$$
\frac{\partial \mathcal L}{\partial w}=0 \Rightarrow w=\sum_i \alpha_i y_i x_i,\qquad
\frac{\partial \mathcal L}{\partial b}=0 \Rightarrow \sum_i \alpha_i y_i=0,
$$

$$
\frac{\partial \mathcal L}{\partial \xi_i}=0 \Rightarrow C-\alpha_i-\mu_i=0
\ \Rightarrow\ 0\le \alpha_i\le C.
$$

Complementary slackness:

$$
\alpha_i\big(1-\xi_i-y_i(w^\top x_i+b)\big)=0,\qquad \mu_i\xi_i=0.
$$

---

## 3) Dual (linear features)

Eliminate $(w,b,\xi)$ using stationarity:

$$
\boxed{
\max_{\alpha}\ \sum_{i=1}^N \alpha_i
-\frac12\sum_{i,j=1}^N \alpha_i\alpha_j y_i y_j, x_i^\top x_j
\quad\text{s.t.}\quad
\sum_i \alpha_i y_i=0,\;\; 0\le \alpha_i\le C.
}
$$

Matrix form: let $K\_{ij}=x_i^\top x_j$, $Y=\mathrm{diag}(y)$, $\alpha\in\mathbb{R}^N$,

$$
L(\alpha)=\mathbf{1}^\top\alpha - \tfrac12,\alpha^\top (YKY)\alpha,
\quad \text{with}\ \sum_i \alpha_i y_i=0,\ 0\le \alpha_i\le C.
$$

---

## 4) Kernel trick

Replace $x_i^\top x_j$ by a kernel $K(x_i,x_j)=\phi(x_i)^\top\phi(x_j)$. Define the Gram matrix

$$
K_{ij}=K(x_i,x_j).
$$

Then the dual is identical with this (K):

$$
\boxed{
L(\alpha)=\sum_i \alpha_i - \tfrac12,\alpha^\top (YKY)\alpha,\quad
\sum_i \alpha_i y_i=0,\ 0\le \alpha_i\le C.
}
$$

---

## 5) Dual gradient (for updates)

$$
\frac{\partial L}{\partial \alpha_i}
= 1 - \sum_{j=1}^N \alpha_j y_i y_j K_{ij}
= 1 - y_i\sum_{j=1}^N \alpha_j y_j K(x_i,x_j).
$$

Vector form:

$$
\nabla_\alpha L = \mathbf{1} - (YKY)\alpha.
$$

---

## 6) Projected gradient ascent on (\alpha)

Ascent step (step size $\eta>0$):

$$
\tilde\alpha \leftarrow \alpha + \eta,\nabla_\alpha L.
$$

Project onto the affine constraint $\sum_i \alpha_i y_i=0$:

$$
\tilde\alpha \leftarrow \tilde\alpha - y,\frac{y^\top \tilde\alpha}{y^\top y}.
$$

Project onto the box $0\le \alpha_i\le C$:

$$
\alpha_i \leftarrow \min{\max{\tilde\alpha_i,0},,C}.
$$

(For hard margin, use only $\alpha_i\ge 0$.)

---

## 7) Recover (w) and (b)

Linear kernel (explicit (w)):

$$
w^*=\sum_{i=1}^N \alpha_i^* y_i x_i.
$$

For any **support vector** (k) with $0<\alpha_k^*<C$, KKT gives

$$
y_k\big(w^{*\top}x_k + b^*\big)=1
\ \Rightarrow
b^* = y_k - w^{*\top}x_k.
$$

In practice, average over all such (k).

Kernel case (no explicit (w)):

$$
b^* = y_k - \sum_{j=1}^N \alpha_j^* y_j K(x_j,x_k),
\quad \text{average over }k\text{ with }0<\alpha_k^*<C.
$$

---

## 8) Decision function and prediction

Linear:

$$
f(x)=w^{*\top}x + b^*,\qquad \hat y=\mathrm{sign}\big(f(x)\big).
$$

Kernel:

$$
\boxed{f(x)=\sum_{i=1}^N \alpha_i^* y_i, K(x_i,x) + b^*,\qquad \hat y=\mathrm{sign}\big(f(x)\big).}
$$

---

## 9) If your kernel is a pairwise function (no batching)

Build Gram matrices by pairs:

$$
K_{ij}=K(x_i,x_j),\qquad
K^{\text{test}}_{ij}=K(x_i,x^{\text{test}}*j),
$$

then use the same formulas above for $(L(\alpha)), (\nabla*\alpha L), (b^*), and (f(x))$.

That’s the full deduction, start to finish.
