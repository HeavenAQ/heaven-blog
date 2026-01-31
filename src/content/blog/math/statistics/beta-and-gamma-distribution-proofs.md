---
createdAt: '2025-09-25'
description: $$
tags:
- Math
- Probability
title: 3. Beta and Gamma Distribution Proofs
---
# Beta and Gamma Distribution Proofs

## $\Gamma$ Function

### Definition

$$
\Gamma(p) = \int^{\infty}_{0} x^{p - 1} e^{-x} dx
$$

![clipboard.png](/blog/beta-and-gamma-distribution-proofs/Ibx0YuQg-clipboard.webp)

### Properties

- $\Gamma(p + 1) = p\Gamma(p) = p!$
- $\Gamma(1) = 1$
- $\Gamma(\frac{1}{2}) = \sqrt{\pi}$
- $\Gamma(\frac{n}{2}) = \begin{cases} (\frac{n}{2} - 1)! \quad (\text{n is even}) \\ (\frac{n}{2} - 1)(\frac{n}{2} - 2)\cdots \frac{3}{2}\cdot \frac{1}{2}\sqrt\pi \quad (\text{n is odd})\end{cases}$

## $\Beta$ Function

$$
\Beta(p, q) = \int^1_0 x^{p - 1} (1 - x)^{q - 1} dx \quad (p > 0, q > 0)
$$

$$
\Beta(p, q) = \frac{\Gamma(p) + \Gamma(q)}{\Gamma(p + q)}
$$

<mark style="background-color: skyblue">TO-DO: Proof for the gamma form</mark>
