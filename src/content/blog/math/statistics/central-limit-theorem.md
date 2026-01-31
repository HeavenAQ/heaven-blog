---
createdAt: '2025-09-25'
description: Proofs of the Laws of Large Numbers and Central Limit Theorem
status: in-progress
tags:
- Math
- Statistics
title: 4. Central Limit Theorem
---

## The Law of Large Numbers

### Definition

- *Given*
  - random variables $X_1 X_2, \dots, X_n$ that are $i.i.d.$
  - $\mathbb{E}[X] = \mu$
  - $\mathbb{V}[X] = \sigma^2$
- According to the `Law of Large Numbers`

$$
\bar{X_n} = \frac{1}{n} \sum^n_{i = 1} X_i 
          \;\;\overset{\mathbb{P},\; a.s.}{\underset{n \rightarrow \infty}{\longrightarrow}} 
          \;\;\mu
$$

### Proof

- Let an event $A \in \{0, 1\}$, where $P(A = 1) = p$ with $p$ being unknown.
- Given the total number of trials $n$ and the number of times $A = 1$ in those trials being $x$, we:
  - calculate $\frac{x}{n}$
  - formulate the marginal distribution function of X to be:

$$
\begin{align*}
  &P_X(x) = \begin{pmatrix} n \\ x\end{pmatrix} p^{x} q^{n - x} \quad (p + q = 1) \\
  &\begin{cases}
    \mu = np \\
    \sigma^2 = npq
  \end{cases}
\end{align*}
$$

- As the $n \rightarrow \infty$, $x \rightarrow \infty$, and $p$ is fixed, the binomially distributed event $X$ is now normally distributing.

$$
X \sim N(\mu, \sigma^2)
$$

- The original $PMF$ function is also reformulated as a $PDF$

$$
f_X(x) = \frac{1}{\sqrt{2\pi\sigma}} \exp\left({-\frac{(x - \mu)^2}{2\sigma^2}}\right)
$$

- Now, define a new random variable $\bar X = \frac{X}{n}$ representing the number of times $x$ happens in $n$ trials. We need to formulate its distribution function from $f_X(x)$
- Given the `Total Probability Theorem`:

$$
\int^{\infty}_{-\infty} f_{\bar X}(\bar x) d{\bar x} 
= \int^{\infty}_{-\infty} f_X(x) dx 
= 1
$$
- We can then use variable substitution with the facts that: 
  - $x = n\bar{x}$ 
  - $\frac{dx}{d\bar x} = n$ 

$$
\begin{align*}
&\int^{\infty}_{-\infty} f_{\bar X}(\bar x) d{\bar x} \\
&= \int^{\infty}_{-\infty} f_X(n\bar x) \frac{dx}{d\bar x} d\bar x \\
&= \int^{\infty}_{-\infty} n f_X(n\bar x) d\bar x \\
&\Rightarrow f_{\bar X} (\bar x) = n \cdot f_X(n\bar x)
\end{align*}
$$

- Now, expand this formula

$$
\begin{align*}
&f_{\bar X} (\bar x) \\
&= n \cdot f_X(n\bar x) \\
&= \frac{\cancel{n}}{\sqrt{2 \pi \cancel{n}pq}} \exp\left(-\frac{(\cancel{n}\bar x - \cancel{n}p)^2}{2\cancel{n}pq}\right) \quad (\mu = np, \;\; \sigma^2 = npq) \\
&= \frac{1}{\sqrt{2 \pi \frac{pq}{n}}} \exp\left(-\frac{(\bar x - p)^2}{2\frac{pq}{n}}\right) \quad (\mu = np, \;\; \sigma^2 = npq) \\
&\Rightarrow \mu_{\bar X} = p, \quad \sigma^2_{\bar X} = \frac{pq}{n} 
\end{align*}
$$

- As $n \rightarrow \infty$, $\sigma^2 \rightarrow 0$

$$
\lim_{n \rightarrow \infty} \sigma^2 = \lim_{n \rightarrow \infty} \frac{pq}{n} = 0
$$

- We can then derive that:

$$
\bar X \sim N(p, \frac{pq}{n}) \overset{n \rightarrow \infty}{\longrightarrow} \bar X \sim N(p, 0)
$$

- So, when the number of trails approaches infinity, the probability of $P(A = 1) = p$ will be the mean value.

$$
\lim_{n \rightarrow \infty} \frac{x}{n} = p
$$
