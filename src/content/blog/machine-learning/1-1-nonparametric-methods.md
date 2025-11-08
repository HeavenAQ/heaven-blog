---
categories:
- Machine Learning
- reading materials
createdAt: '2025-09-03'
description: '- use of probability distributions that have specific functional forms
 governed by a small number of parameters whose values are to be determinied fro...'
tags:
- reading materials
- Machine Learning
- Machine Learning
- AI
title: 3. Nonparametric Methods
---
# 1-1. Nonparametric Methods

## Introduction

### Parametric methods

- use of probability distributions that have specific functional forms governed by a small number of parameters whose values are to be determinied from a data set.

> [!CAUTION]
>
> **LIMITATION**
>
> - The chosen density might be a poor model of the distribution that generates the data resulting in poor predictive performance
> - Gaussian distribution cannot capture multimodal data

### Nonparametric Methods

- Consider a case of a single continuous variable $x$.
- Using a standard historgrams to partition $x$ into distinct bins:
 - $i$: index of bin
 - $\Delta_i$: width of bins
 - $n_i$: the number of $x$ falling in bin $i$

#### $\bullet$ Normalized Probability Density

- The bins to obtain probability values:

 $$
 p_i = \frac{n_i}{N\Delta_i}
 $$

- Where:
 - $\int p(x) dx = 1$
 - $\Delta_i = \Delta$

#### $\bullet$ Example - Histogram

![clipboard.png](/blog/1-1-nonparametric-methods/lSWO8ROV-clipboard.webp)

- Data is formed from a mixture of `2 Gaussians`
- small $\Delta$
 - with a lot of structure that is not present in the underlying distribution
- large $\Delta$
 - fails to capture the bimodal property

> [!TIP]
>
> **ADVANTAGES**
>
> - Data set can be discarded after histogram is generated
> - Easily applicable if data points arrive sequentially

> [!CAUTION]
>
> **LIMITATION**
>
> - Discontinuities occur due to bin edges rather than the properties of underlying distributions
> - When data are in a high-dimensional space, we would experience

#### $\bullet$ Takeaway from Histogram

1. Consider the points lie in local neighborhoods (the bins in histogram)
 - Some distance measurements are required
2. Smoothing parameter should be neither too large nor too small.

## Kernel Estimator

- Assume observations are drawn from a probability density $p(x)$ in D-dimensional space.
- Consider a small region $R$ containing $x$

### $\bullet$ The probability associated with the region $R$

$$
P = \int_R p(x) dx
$$

### $\bullet$ The probability distribution of the total number of K points falling within the region $R$

$$
Bin(K \mid N, P) = \frac{N!}{K!(N - K)!} P^K (1-P)^{N - K}
$$

### $\bullet$ For large N, the peak is around the mean of K

$$
\because Bin(N, P) \Rightarrow \mu = NP, \sigma^2 = NP(1-P)
$$

$$
\begin{align*}
\therefore
Var[\frac{K}{N}] &= \frac{1}{N^2}Var[K] \\
 &= \frac{1}{N^2}NP(1-P) \\
 &= \frac{P(1-P)}{N}
\end{align*}
$$

> [!IMPORTANT]
>
> **Mean of $K$ (the count)**
>
> $$
> \mathbb{E}[K] = NP
> $$
>
> **Mean of $K/N$ (the fraction)**
>
> $$
> \mathbb{E}[\frac{K}{N}] = P
> $$

$$
\begin{align*}
& N \rightarrow \infty, Var \rightarrow 0 \\
& K \approx NP
\end{align*}
$$

### $\bullet$ If $R$ is sufficiently small

$$
P \approx p(x)V
$$

- where $V$ is the volume of $R$

### $\bullet$ Combine $K$ and $P$

$$
\begin{align*}
&K \approx NP \\
&\Rightarrow P \approx \frac{K}{N} \\
\end{align*}
$$

$$
\begin{align*}
&P \approx p(x)V \\
&\Rightarrow \frac{K}{N} \approx p(x)V \\
&\Rightarrow p(x) \approx \frac{K}{NV}
\end{align*}
$$

### $\bullet$ Different Exploitations of $p(x) \approx \frac{K}{NV}$

#### Fix K, determine V

- **KNN** density estimator

#### Fix V, determine K

- **Kernel Approach**

> [!NOTE]
> Both converge to the true probability density in the limit $N \rightarrow \infty$ with $V$ shrinking with $N$, and $K$ growing with $N$

## Kernel Method

- Take the region $R$ to be a small hypercube centered on the point $x$

 - $x$ is the point where we wanna determine the probability density.

 $$
 k(\mathbf{u}) =
 \begin{cases}
 1, & |u_i| \leq \tfrac{1}{2}, \quad i = 1, \ldots, D, \\[6pt]
 0, & \text{otherwise}
 \end{cases}
 $$

- helps to count the # of $K$ points falling within $R$
- represents a unit cube centered on the origin
- $k(\mathbf{u})$ is a kernel function called `Parzen Window`

 $$
 k(\frac{x - x_n}{h}) = 1
 $$

 - if $x_n$ in a cube of **side $h$** **centered on x**, and 0 otherwise

- **Total #** of the datapoints in cube

 $$
 K = \sum_{n = 1}^{N} k (\frac{x - x_n}{h})
 $$

- Swap the total into **probability density** with $V = h^D$

 $$
 p(x)= \frac{1}{N}\sum_{n = 1}^{N} \frac{1}{h^D} k (\frac{x - x_n}{h})
 $$

- To **prevent artificial discontinuities**, we can user smoother kernel functions (i.e. Gaussian)

 $$
 p(x)= \frac{1}{N}\sum_{n = 1}^{N} \frac{1}{\sqrt{2\pi h^2}} e^ {(\frac{||x - x_n||^2}{2h^2}})
 $$

 - $h$ is the standard deviation

![Screenshot 2025-09-04 at 12.48.39](/blog/1-1-nonparametric-methods/LBs0f785-Screenshot_2025-09-04_at_12.48.39.webp)

> [!TIP]
>
> - Any kernel methods satisfying the following conditions can be chosen.
>
> $$
> \begin{align*}
> &k(\mathbf{u}) \ge 0, \\
> &\int k(\mathbf{u}) du = 1
> \end{align*}
> $$
>
> - No computational cost during the training time

> [!CAUTION]
> Kernel approach may lead to over-smoothing due to that the $h$ parameter governing the kernel width is fixed for all kernels

## KNN Methods

![Screenshot 2025-09-04 at 13.03.44](/blog/1-1-nonparametric-methods/a-MCuSk_-Screenshot_2025-09-04_at_13.03.44.webp)

- The parameter $K$ governs the degree of smoothing.

### Method

- Assume a data set of sizes $N$ with $N_k$ points in class $C_k$

 $$
 \sum N_k = N
 $$

- Draw a `sphere` centered on a new point $x$ containing $K$ points
 - $V$: Volume of the `sphere`
 - $K_k$: points from class $C_k$
- The **estimate of the density** associated with each class
 $$
 p(x \mid C_k) = \frac{K_k}{N_kV}
 $$
- **Unconditional Density**
 $$
 p(x) = \frac{K}{NV}
 $$
- **Priors**
 $$
 p(C_k) = \frac{N_k}{N}
 $$
- **Posteriors**
 $$
 \begin{align*}
 p(C_k \mid x) &= \frac{p(x \mid C_k)p(C_k)}{p(x)} \\
 &= \frac{\frac{K_k}{N_kV} \cdot \frac{N_k}{N}}{\frac{K}{NV}} \\
 &= \frac{K_k}{K}
 \end{align*}
 $$

> [!NOTE]
> In the case where K = 1, the KNN is called "the nearest-neighbor" approach

![Screenshot 2025-09-04 at 13.28.51](/blog/1-1-nonparametric-methods/LKeHns97-Screenshot_2025-09-04_at_13.28.51.webp)
