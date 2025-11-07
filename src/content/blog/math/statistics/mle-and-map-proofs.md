---
categories:
- Math
- Probability
createdAt: '2025-09-21'
description: '- **$\mathcal{D}$:** $\alpha_H$ heads, $\alpha_T$ tails.'
tags:
- Math
- Probability
title: MLE and MAP Proofs
---

# MLE and MAP Proofs

## MLE and MAP for Coin Flipping

- **$\mathcal{D}$:** $\alpha_H$ heads, $\alpha_T$ tails.
- **$P(\mathcal{D}|\theta)$:**

 $$
 \begin{pmatrix}
 \alpha_H + \alpha_T \\
 \alpha_H
 \end{pmatrix}
 \theta^{\alpha_H} (1 - \theta)^{\alpha_T}
 $$

### MLE Proof

$$
\begin{align*}
 \hat{\theta}^{MLE}
 &= \argmax_{\theta}
 \begin{pmatrix}
 \alpha_H + \alpha_T \\
 \alpha_H
 \end{pmatrix}
 \theta^{\alpha_H} (1 - \theta)^{\alpha_T} \\
 &= \argmax_{\theta}\{ \ln{(\theta^{\alpha_H}(1 - \theta)^{\alpha_T})} \} \\
 &= \argmax_{\theta}\{ \alpha_H\ln{\theta} + \alpha_T\ln{(1 - \theta)} \} \\
 &\Rightarrow 0 = \frac{\partial}{\partial \theta} (\alpha_H\ln{\theta} + \alpha_T\ln{(1 - \theta)}) \\
 &\Rightarrow 0 = \frac{\alpha_H}{\theta} - \frac{\alpha_T}{1 - \theta} \\
 &\Rightarrow \hat{\theta}^{MLE} = \frac{\alpha_H}{\alpha_H + \alpha_T}
\end{align*}
$$

### MAP Proof

- **Prior (Beta Distribution)**

 $$
 P(\theta) = \frac{\theta^{\beta_{H} - 1} (1 - \theta)^{\beta_T - 1}}{B(\beta_H, \beta_T)} \sim Beta(\beta_H, \beta_T)
 $$

- **Posterior**

 $$
 \begin{align*}
 P(\theta \mid \mathcal{D}) &\propto P(\mathcal D \mid \theta)P(\theta) \\
 &\propto \theta^{\alpha_H}(1-\theta)^{\alpha_T}\frac{\theta^{\beta_{H} - 1} (1 - \theta)^{\beta_T - 1}}{B(\beta_H, \beta_T)} \\
 &\propto \frac{\theta^{\alpha_H + \beta_{H} - 1} (1 - \theta)^{\alpha_T + \beta_T - 1}}{B(\beta_H, \beta_T)}
 \end{align*}
 $$

$$
\begin{align*}
 \hat{\theta}^{MAP}
 &= \argmax_{\theta}\frac{\theta^{\alpha_H + \beta_{H} - 1} (1 - \theta)^{\alpha_T + \beta_T - 1}}{B(\beta_H, \beta_T)} \\
 &= \argmax_{\theta}\theta^{\alpha_H + \beta_{H} - 1} (1 - \theta)^{\alpha_T + \beta_T - 1} \quad (B(\beta_H, \beta_T) \text{ does not depend on } \theta)\\
 &= \argmax_{\theta}(\alpha_H + \beta_{H} - 1)\ln\theta + (\alpha_T + \beta_T - 1)\ln(1 - \theta) \\
 &\Rightarrow 0 = \frac{\partial}{\partial\theta}(\alpha_H + \beta_{H} - 1)\ln\theta + (\alpha_T + \beta_T - 1)\ln(1 - \theta) \\
 &\Rightarrow 0 = \frac{(\alpha_H + \beta_{H} - 1)}{\theta} + \frac{(\alpha_T + \beta_T - 1)}{(1 - \theta)} \\
 &\Rightarrow \hat{\theta}^{MAP} = \frac{(\alpha_H + \beta_{H} - 1)}{(\alpha_T + \beta_T - 1) + (\alpha_H + \beta_{H} - 1)}

\end{align*}
$$

> [!TIP]
>
> - $\beta_H - 1:$ # of hallucinated heads
> - $\beta_T - 1:$ # of hallucinated tails

> [!NOTE]
>
> Check the full proof of Beta Distribution in [Beta and Gamma Distribution Proofs](/blog/math/statistics/beta-and-gamma-distribution-proofs)

## Beta Distribution - Illustration

![clipboard.png](/blog/mle-and-map-proofs/yltpd91L-clipboard.webp)
![clipboard.png](/blog/mle-and-map-proofs/ltLIC9Zc-clipboard.webp)
![clipboard.png](/blog/mle-and-map-proofs/osgWfZTt-clipboard.webp)
![clipboard.png](/blog/mle-and-map-proofs/zYCaXZaT-clipboard.webp)
![clipboard.png](/blog/mle-and-map-proofs/NzTwxpo_-clipboard.webp)
![clipboard.png](/blog/mle-and-map-proofs/iV2p2yya-clipboard.webp)
![clipboard.png](/blog/mle-and-map-proofs/xICnXp0I-clipboard.webp)

> [!IMPORTANT]
>
> - When $\alpha_H + \alpha_T$ is small, MAP can work better than MLE if our prior is accurate
> - If prior is wrong $\rightarrow$ MAP can be very wrong
> - When $\alpha_H + \alpha_T \rightarrow \infty$, $\hat{\theta}^{MAP} \rightarrow \hat{\theta}^{MLE}$ ($\beta_H$ and $\beta_T$ become irrelevant in this case)

## MLE and MAP of Rolling an M-sided Die

- **$\mathcal{D}$:** Dataset of i.i.d. rolls of an M-sided die.
- **$P(\mathcal{D}|\theta)$:** Likelihood of Mutinomial $\theta$ ~ $\{\theta_1, \theta_2, \dots, \theta_M\}$

 $$
 P(\mathcal{D} | \theta) \propto \theta^{\alpha_1}_1 \cdot \theta^{\alpha_2}_2 \cdots \theta^{\alpha_M}_M
 $$

- **$\theta_m$:** Probability of rolling side m

#### $\bullet$ The Prior

_Dirichlet Distribution is used in this case_

$$
P(\theta) = \frac{\theta^{\beta_1 - 1}_1\theta^{\beta_2 - 1}_2 \cdots \theta^{\beta_M - 1}_M}{B(\beta_1, \dots, B_M)} \sim Dirichlet(\beta_1, \dots, \beta_M)
$$

where $B(\beta_1, \dots, B_M)$ is the multivariate Beta function

#### $\bullet$ The Posterior

$$
P(\theta | \mathcal{D}) \propto P(\mathcal{D} | \theta) P(\theta) \sim Dirichlet(\alpha_1 + \beta_1, \dots, \alpha_M + \beta_M)
$$

### MLE Proof

- Given that $L(\theta) = P(\mathcal{D} | \theta)$ is subject to the constraint $\sum^M_{m = 1} \theta_m = 1$, we can define the maximization equations with **Lagrangian** and **log-likelihood** as:

$$
l(\theta) = \ln L(\theta) = \sum^M_{m=1} \alpha_m \ln \theta_m - \lambda(\sum^M_{m = 1} \theta_m - 1)
$$

- Then, we partially differentiate the it by $\theta_m$ and $\lambda$ and set them to zero, respectively.

$$
\begin{align*}
 &\begin{align*}
 \frac{\partial l}{\partial \theta_m} &= \frac{a_m}{\theta_m} - \lambda = 0 \\
 &\Rightarrow \hat{\theta}^{MLE}_{m} = \frac{a_m}{\lambda}
 \end{align*} \\
 &\begin{align*}
 \frac{\partial l}{\partial \lambda} &= -\sum^M_{m = 1} \theta_m + 1 = 0 \\
 &\Rightarrow \sum^M_{m = 1} \hat{\theta}_m^{MLE} = 1 \\
 &\Rightarrow \sum^M_{m = 1} \frac{a_m}{\lambda} = 1 \\ &\Rightarrow \sum^M_{m = 1} a_m = \lambda
 \end{align*}\\
 &\Rightarrow \hat{\theta}_m^{MLE} = \frac{a_m}{\sum^M_{v = 1} a_v}
\end{align*}
$$

- Therefore, we can derive that:

$$
\hat{\theta}_m^{MLE} = \frac{a_m}{\sum^M_{v = 1} a_v}
$$

### MAP Proof

- The derivation is similar to the MLE, but we change the `likelihood` part to `posterior`

$$
P(\theta | \mathcal{D}) = \sum^M_{m =1} (\alpha_m + \beta_m - 1) \ln \theta_m - \lambda(\sum^M_{m = 1} \theta_m - 1)
$$

- Take partial derivatives

$$
\begin{align*}
 \frac{\partial l}{\partial \theta_m} &= \frac{\alpha_m + \beta_m - 1}{\theta_m} - \lambda = 0 \\
 &\Rightarrow \hat{\theta}^{MAP}_m = \frac{\alpha_m + \beta_m -1}{\lambda} \\
 \frac{\partial l}{\partial \lambda}&\Rightarrow \sum^M_{m = 1} \frac{\alpha_m + \beta_m -1}{\lambda} = 1 \\
 &\Rightarrow \lambda = \sum^M_{m = 1} \alpha_m + \beta_m -1 \\
\end{align*} \\
\Rightarrow \hat\theta^{MAP}_m = \frac{\alpha_m + \beta_m - 1}{\sum^M_{v = 1} (\alpha_v + \beta_v -1)}
$$

- Therefore, we get:

$$
\hat\theta^{MAP}_m = \frac{\alpha_m + \beta_m - 1}{\sum^M_{v = 1} (\alpha_v + \beta_v -1)}
$$
