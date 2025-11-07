---
categories:
- Math
- Probability
- Statistics
createdAt: '2025-09-20'
description: $$
tags:
- Math
- Probability
- Statistics
- in progress
title: Distribution Proofs
---

# Distribution Proofs

## Properties of Binomial Distribution

### $\mu = np$

$$
\begin{align*}
\mu &= \sum^n_{k=0} k\begin{pmatrix}n \\ k\end{pmatrix}p^k(1 - p)^{(n -k)} \\
&= n \sum^n_{k = 0} \begin{pmatrix}n - 1 \\ k - 1 \end{pmatrix}p^k(1 - p)^{(n -k)} \quad (Property of Combination)\\
&= np\sum^n_{k = 0} \begin{pmatrix}n - 1 \\ k - 1 \end{pmatrix}p^{k -1 }(1 - p)^{(n -k)} \\
&= np\sum^{n - 1}_{k = 0} \begin{pmatrix}n - 1 \\ k \end{pmatrix}p^{k }(1 - p)^{(n -k - 1)} \quad \text{(Binomial Theorem)}\\
&= np (p + (1 - p))^{(n - 1)} \\
&= np
\end{align*}
$$

> [!TIP]
>
> 1. Property of Combination
>
> $$r \cdot \begin{pmatrix}n \\ r\end{pmatrix} = n \cdot \begin{pmatrix}n - 1 \\ r - 1\end{pmatrix}$$
>
> 2. Binomial Theorem
>
> $$(a + b)^n = \sum^n_{k=0} \begin{pmatrix}n \\ k\end{pmatrix}a^kb^{(n -k)} $$

### $\sigma^2 = np(1 - p)$

$$
\begin{align*}
\sigma^2 &= \sum^n_{k=0} k^2\begin{pmatrix}n \\ k\end{pmatrix}p^k(1 - p)^{(n -k)} - (np)^2 \\
&= np\sum^n_{k = 1} k \begin{pmatrix}n - 1 \\ k - 1 \end{pmatrix}p^{k - 1}(1 - p)^{n - k} - (np)^2\\
 &= np\sum^{n - 1}_{k = 0} (k + 1) \begin{pmatrix}n - 1 \\ k \end{pmatrix}p^{k}(1 - p)^{n - k - 1} - (np)^2\\
 &= np\begin{bmatrix}
 \sum^{n -1}_{k = 1} k
 \begin{pmatrix}
 n - 1 \\ k
 \end{pmatrix}
 p^{k}(1 - p)^{n - k - 1} + np\sum^n_{k = 1}
 \begin{pmatrix}
 n - 1 \\ k
 \end{pmatrix}
 p^{k}(1 - p)^{n - k - 1} \end{bmatrix} - (np)^2
 \\
 &= np((n - 1)p + 1) - np \\
 &= n^2p^2 - np^2 + np - n^2p^2\\
 &= np - np^2 \\
 &= np(1 - p)
\end{align*}
$$
