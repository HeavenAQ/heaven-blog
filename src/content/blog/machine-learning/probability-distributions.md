---
categories:
- Machine Learning
- reading materials
createdAt: '2025-09-20'
description: '- The number of successes in a fixed number of independent trials,
 each with the same probability of success.'
tags:
- reading materials
- Machine Learning
- AI
title: Probability Distributions
---

# Probability Distributions

## Binomial Distribution

- The number of successes in a fixed number of independent trials, each with the same probability of success.

$$
B(n, p) = \sum^n_{k = 0} \begin{pmatrix}n \\ k\end{pmatrix}p^k(1 - p)^{(n -k)} = 1
$$

### $\bullet$ Properties

- **Mean:** 
 - $\mu = np$
- **Variance:**
 - $\sigma^2 = np(1-p)$
- **Probability mass function**
 - $P(X = k) = \begin{pmatrix}n \\ k\end{pmatrix}p^k(1 - p)^{(n -k)}$

> [!TIP]
> Full proofs of properties can be found in [Distribution Proofs](/blog/math/statistics/distribution-proofs)

## Poisson Distribution

$$
P(\lambda) = \sum^{n}_{k = 0} k \cdot \frac{\lambda^k e^{-\lambda}}{k!} 
$$

### $\bullet$ Properties

- **Mean:** 
 - $\mu = \lambda$
- **Variance:**
 - $\sigma^2 = \lambda$
- **Probability mass function**
 - $P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}$
