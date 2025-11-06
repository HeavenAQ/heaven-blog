---
categories:
- Machine Learning
- lectures
createdAt: '2025-10-30'
description: '- Let''s say we have the following two models:'
tags:
- Machine Learning
- Machine Learning
- lectures
- AI
title: 9.1 Cross Validation and Model Selection
---

# 9.1 Cross Validation and Model Selection

## Example: Sine Target

- Let's say we have the following two models:

$$
\begin{align*}
 &H_0: h(x) = b \\
 &H_1: h(x) = ax + b
\end{align*}
$$

> [!IMPORTANT]
>
> **Which is better?**
>
> - Main question $\rightarrow$ better for what?

### Approximation

- Let's say we want to approximate the following function

$$
f: [-1, 1] \rightarrow \R \;\; f(x) = sin(\pi x)
$$

![clipboard.png](/blog/91-cross-validation-and-model-selection/2xLPZsHj-clipboard.webp)

#### $\bullet$ Approximate with $H_1$

![clipboard.png](/blog/91-cross-validation-and-model-selection/q9D8hX-N-clipboard.webp)

- the yellow part tells us how far we are from the sine function
- $Error = 0.20$

#### $\bullet$ Approximate with $H_0$

![clipboard.png](/blog/91-cross-validation-and-model-selection/qnwz8zxH-clipboard.webp)

- $Error = 0.50$

> [!TIP]
>
> From the approximation perspective, the linear model wins.

### Learning

- For learning, we give our two models two data points and train them

![clipboard.png](/blog/91-cross-validation-and-model-selection/QVK8swuw-clipboard.webp)
![clipboard.png](/blog/91-cross-validation-and-model-selection/Yo4daptY-clipboard.webp)
![clipboard.png](/blog/91-cross-validation-and-model-selection/0FeI1oeF-clipboard.webp)

- Which one is better? We don't know as it depends on what are the initial two data points given. Therefore, we need the bias variance method for us to determine which method produces less error.

---

## Bias Variance

![clipboard.png](/blog/91-cross-validation-and-model-selection/jcEpgpRd-clipboard.webp)

- From each possible models, we calculate the expected model (mean)
- From the mean model, we calculate the variance and the bias

![clipboard.png](/blog/91-cross-validation-and-model-selection/roKnqItA-clipboard.webp)

---

### Learning in Practice

- more training examples with noise

![clipboard.png](/blog/91-cross-validation-and-model-selection/YEbmlDgC-clipboard.webp)
![clipboard.png](/blog/91-cross-validation-and-model-selection/DRBJJpXk-clipboard.webp)
![clipboard.png](/blog/91-cross-validation-and-model-selection/tvVdNC_P-clipboard.webp)

- Models to the left of best model may underfit
- Models to the right of the best model may overfit

![clipboard.png](/blog/91-cross-validation-and-model-selection/R7u2lyWl-clipboard.webp)

---

## REM and Overfitting and Underfitting

$$
REM = \min_w \frac{1}{N} \sum^N_{i = 1}l(h_w(x^{(i)}), y^{(i)}) + \lambda \gamma(w)
$$

![clipboard.png](/blog/91-cross-validation-and-model-selection/FLG8Gdi7-clipboard.webp)

> [!IMPORTANT]
>
> Hoow to identify the sweet spot?

---

## Hold-out Method

### How

- Can judge test error by using an independent sample of data
- Split data into **training set** and **validation set**
- Use the two sets for training and testing respectively.

> [!IMPORTANT]
>
> **Telescopic Search**
>
> Find the best order of magnitude $(\lambda)$

### Drawback

- May not have enough data to afford setting one subset aside for getting generalizability
- Validation error may be misleading (bad estimate of test error) if we get an unfortunate split

## K-Fold Cross-Validation

- Create `K-fold` partition of the dataset

![clipboard.png](/blog/91-cross-validation-and-model-selection/MiLwzy1g-clipboard.webp)

- Train using $K - 1$ partitions and calculate the validation error using the remaining partition

### Large K

- Validation error can approximate test error well
- Observed validation error will be unstable (few validation points)
- The computational time will be very large as well

### Small K

- The # of runs and computational time are reduced
- Observed validation error will be stable
- Validation error cannot approximate test error well

> [!TIP]
>
> $K = 10$ is a common choice.

### Leave-One-Out (LOO) Cross-Validation

- Special case of **K-fold validation** with $K = N$ partitions

![clipboard.png](/blog/91-cross-validation-and-model-selection/zgb9qqU7-clipboard.webp)

## Early Stopping

- Stop your optimization after $M \ge 0$ number of gradient steps, even if optimization has not converged yet.

### What's the connection between early stopping and regularization?

#### Early Stopping

![clipboard.png](/blog/91-cross-validation-and-model-selection/4p9KHYOV-clipboard.webp)

#### Regularization

![clipboard.png](/blog/91-cross-validation-and-model-selection/ahBab7s--clipboard.webp)

- Regularization restricts the predictions going outside of the green area.

### The plot of early stopping

![clipboard.png](/blog/91-cross-validation-and-model-selection/0eJsgoSs-clipboard.webp)

### Think about the variance

![clipboard.png](/blog/91-cross-validation-and-model-selection/C2-J3MJt-clipboard.webp)

- If we stop early, we can stop the variance caused by different dataset
