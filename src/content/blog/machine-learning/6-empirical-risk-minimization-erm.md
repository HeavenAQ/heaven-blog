---
categories:
- Machine Learning
- lectures
createdAt: '2025-10-16'
description: $$
tags:
- Machine Learning
- Machine Learning
- lectures
- AI
title: 6. Empirical Risk Minimization (ERM)
---

# 6. Empirical Risk Minimization (ERM)

## Recall: SVM

$$
\min_{w, b} \frac{1}{2} ||w||^2_2 + C\sum^N_{i = 1} \max \left(0, 1 - y^{(i)}(w^\intercal x^{(i)} + b)\right)
$$

- $||w||^2_2$
 - regularizer
- $\sum^N_{i = 1} \max(0, 1 - y^{(i)}(w^\intercal x^{(i)} + b))$
 - loss

### Rewrite

$$
\min_w \frac{1}{N} \sum^N_{i = 1} \underbrace{\max (1 - y^{(i)}(\underbrace{w^\intercal x^{(i)} + b}_{h_w(x^{(i)})} ), 0)}_{\text{Hinge Loss}} + \lambda \underbrace{||w||^2_2}_{L2-Regularizer}
$$

> [!TIP]
>
> Check out more on SVM in [5. SVM](/blog/machine-learning/5-svm)

## Loss Function

$$
\min_w \frac{1}{N} \sum^N_{i = 1} l(h_w(x^{(i)}), y^{(i)}) + \lambda r(w)
$$

- The loss function $l(h_w(x), y)$ quantifies how badly the estimate $h_w(x)$ approximates the real $y$
 - Smaller value $\rightarrow$ good approximation

## Risk

$$
\min_w \frac{1}{N} \sum^N_{i = 1} l(h_w(x^{(i)}), y^{(i)}) + \lambda r(w)
$$

- $R(h) = E_{X, Y} [l(h(X), Y)]$
 - Risk of a prediction function $h$

> [!WARNING]
>
> How can we minimize the risk without knowing the true distribution.

## Empirical Risk Minimization (ERM)

$$
\min_w \underbrace{\frac{1}{N} \sum^N_{i = 1} \underbrace{l(h_w(x^{(i)}), y^{(i)})}_{loss}}_{\text{empirical risk}}
$$

- empirical risk (EM) is the average loss over all the data points
- ERM is a general method to bring down the empirical risk
- Choose $w$ by attempting to match given dataset well, as measured by the loss $l$

## An example of a very poor predictor

![Screenshot 2025-10-16 at 16.34.12](/blog/6-empirical-risk-minimization-erm/jG0KbQcz-Screenshot_2025-10-16_at_16.34.12.webp)

- Does not generalize at all since $h(x^{(i)}) = y^{(i)}$

## Regularized Empirical Risk Minimization

$$
\min_w \frac{1}{N} \sum^N_{i = 1} l(h_w(x^{(i)}), y^{(i)}) + \lambda r(w)
$$

- When $\lambda = 0$, RERM becomes ERM

## Commonly used Binary Classification Loss Function

$$
y \in \{-1, 1\}
$$

### $\bullet$ Hinge Loss

$$
\max \left[1 - y^{(i)}h_w(x^{(i)}), 0\right]^p
$$

- _p = 1_: standard SVM
- _p = 2_: squared hingeless SVM

### $\bullet$ Log Loss

$$
\log(1 + e^{-y^{(i)}h_w(x^{(i)})})
$$

- Logistic regression
- outputs are well-calibrated probabilities

### $\bullet$ Exponential Loss

$$
e^{-y^{(i)}h_w(x^{(i)})}
$$

- AdaBoost
- Mis-prediction can lead to exponential loss
- Nice convergence result but fail to handle noisy data well.

### $\bullet$ Zero-One Loss

$$
\begin{align*}
&\mathbb{I}(h_w(x^{(i)}) \ne y^{(i)}) \\
&\mathbb{I(e)}\begin{cases}
1 \quad (\text{e is }False) \\
0 \quad (\text{e is }True)
\end{cases}
\end{align*}
$$

- Actual classification loss
- Non-continuous and impractical to optimize

### Plots

![Screenshot 2025-10-16 at 17.00.10](/blog/6-empirical-risk-minimization-erm/8qNlprPr-Screenshot_2025-10-16_at_17.00.10.webp)

- **Hinge Loss** and **Exponential Loss** are the upper bounds of the zero-one loss

---

## Commonly Used Regression Loss Functions

$$
y \in \R^1
$$

### $\bullet$ Squared Loss

$$
\left(h_w(x^{(i)}) - y^{(i)}\right)^2
$$

- Most popular
- Also known as **Ordinary Least Squares (OLS)**
- Estimates <mark>mean label</mark>
- Pros:
 - differentiable everywhere
- Cons:
 - sensitive to outliers/noise

### $\bullet$ Absolute Loss

$$
|h_w(x^{(i)}) - y^{(i)}|
$$

- Estimates <mark>median label</mark>
- Pros:
 - Less sensitive to noises
- Cons:
 - Not differentiable at 0

### $\bullet$ Huber Loss

$$
\begin{cases}
 \frac{1}{2} (h_w(x^{(i)}) - y^{(i)})^2 \quad\quad(\mid h_w(x^{(i)}) - y^{(i)} > \delta \mid) \\
 \delta(\mid h_w(x^{(i)} - y^{(i)})\mid - \frac{\delta}{2}) \quad\quad(otherwise) \\
\end{cases}
$$

- Also known as **Smooth Absolute Loss**
- Set a threshold $\delta$
 - $loss > \delta$: Large error, absolute loss
 - $loss < \delta$: Small error, squared loss

### $\bullet$ Log-cosh loss

$$
\log(\cosh(h_w(x^{(i)}) - y^{(i)}))
$$

where

$$
cosh(x) = \frac{e^x + e^{-x}}{2}
$$

### Plots

![Screenshot 2025-10-16 at 17.24.25](/blog/6-empirical-risk-minimization-erm/cMZd_IeQ-Screenshot_2025-10-16_at_17.24.25.webp)

---

## Regularizers

![Screenshot 2025-10-16 at 17.28.07](/blog/6-empirical-risk-minimization-erm/i5aL9Aj7-Screenshot_2025-10-16_at_17.28.07.webp)

$$
\begin{align*}
&\min_w \frac{1}{N} \sum^N_{i = 1} l(h_w(x^{(i)}), y^{(i)}) - \lambda r(w) \\
&\iff \min_w \frac{1}{N} \sum^N_{i = 1} l(h_w(x^{(i)}), y^{(i)}) \quad s.t. \quad r(w) \le B
\end{align*}
$$

- $\forall \lambda, \lambda \ge 0 \implies \exists B\ge 0 \\ \text{ s.t. the above formulations hold}$

---

## Types of Regularizers

### $l_2 - regularization$

![clipboard.png](/blog/6-empirical-risk-minimization-erm/xtHwLoPY-clipboard.webp)

$$
r(w) = w^\intercal w = ||w||^2_2
$$

- strictly convex (+)
- differentiable (+)
- uses weights on all features (-)

### $l_1 - regularization$

![clipboard.png](/blog/6-empirical-risk-minimization-erm/L3UP0w6V-clipboard.webp)

$$
r(w) = ||w||_1
$$

- convex (but not strictly)
- not differentiable at 0 (minimization intends to bring us to)
- sparse (most of its elements are zeros)

### $l_p - regularization$

![clipboard.png](/blog/6-empirical-risk-minimization-erm/EibqoeVH-clipboard.webp)

$$
r(w) = ||w||_p = (\sum^N_{i = 1} w^p_i)^\frac{1}{p}
$$

- non-convex (-)
- very-sparse solutions (+)
- initialization-dependent
- not differentiable (-)

---

## Elastic Net

- The combination of <mark>Lasso (L1)</mark> and <mark>Ridge (L2) regressions</mark>

$$
\min_w \frac{1}{N} \sum^N_{i = 1}(w^\intercal x^{(i)} - y^{(i)})^2 + \alpha ||w||_1 + (1 - \alpha)||w||^2_2
$$

- strictly convex
- sparsity inducing
- non-differentiable

![clipboard.png](/blog/6-empirical-risk-minimization-erm/24c-QDn3-clipboard.webp)
