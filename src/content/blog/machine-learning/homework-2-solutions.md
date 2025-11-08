---
categories:
- Machine Learning
- homework
createdAt: '2025-10-01'
description: 'Solutions to ML Homework 2 covering Naive Bayes classification, Gaussian Naive Bayes, Logistic Regression theory, and optimization techniques including gradient descent variants'
tags:
- Machine Learning
- Naive Bayes
- Logistic Regression
- Optimization
- Gradient Descent
title: Homework 2 Solutions
---
## Problem 1: Naive Bayes (25 pt)

### 1.1 Conditional Independence Properties

#### (a) Conditional Independence Implies Joint Conditional Factorization

**Question:** If $X \perp Y \mid Z$, can we conclude that $P(X, Y \mid Z) = P(X \mid Z)P(Y \mid Z)$?

**Answer: Yes**

$$
\begin{aligned}
P(X, Y \mid Z) &= \frac{P(X, Y, Z)}{P(Z)} \\
&= \frac{P(Z)P(X, Y \mid Z)}{P(Z)} \\
&= \frac{P(Z)P(Y \mid Z)P(X \mid Y, Z)}{P(Z)} \quad \text{(chain rule)} \\
&= \frac{P(Z)P(Y \mid Z)P(X \mid Z)}{P(Z)} \quad (Y \perp X \mid Z) \\
&= P(Y \mid Z)P(X \mid Z)
\end{aligned}
$$

#### (b) Conditional Independence Does Not Imply Marginal Independence

**Question:** If $X \perp Y \mid Z$, can we conclude that $P(X, Y) = P(X)P(Y)$?

**Answer: No**

$$
\begin{aligned}
& \because P(X, Y) = P(X)P(Y) \iff X \perp Y \text{, and we only know that } X \perp Y \mid Z \\
& \therefore P(X, Y) \neq P(X)P(Y)
\end{aligned}
$$

Conditional independence does not imply marginal independence.

#### (c) Number of Parameters for Boolean Features

**Question:** How many independent $\theta_{jc}$ parameters must be estimated for $d$ Boolean attributes and $C$ classes?

**Answer: $C \times d$ independent $\theta_{jc}$ parameters**

- $X$ has $d$ attributes
- For each class $c$, we estimate $\theta_{jc}$ for each attribute $X_j$
- Therefore, the total number of independent parameters is $C \times d$

#### (d) Number of Parameters for Gaussian Features

**Question:** How many distinct $\mu_{jc}$ and $\sigma_{jc}$ parameters must be estimated for Gaussian features?

**Answer: $2 \times C \times d$ distinct parameters (both $\mu_{jc}$ and $\sigma_{jc}$ have $C \times d$ parameters each)**

- Each attribute $X_j$ requires a distinct set of $\mu_{jc}$ and $\sigma_{jc}$
- The respective numbers of $\mu_{jc}$ and $\sigma_{jc}$ are both $C \times d$
- Therefore, the total number of distinct parameters are $2 \times C \times d$

#### (e) Why Can We Omit the Denominator?

**Question:** Why is omitting the denominator in the classification rule acceptable?

**Answer:** The $Y$ variable is not dependent on the denominator as the denominator is just a constant for normalization.

When computing $\arg\max_c P(Y = c \mid X)$, the denominator $\sum_{v=1}^C P(Y = v)\prod_{k=1}^{d} P(X_k^{\text{new}}\mid Y = v)$ is the same for all classes $c$, so it doesn't affect which class achieves the maximum.

#### (f) Computing P(X) from Naive Bayes Parameters

**Question:** Is it possible to calculate $P(X)$ with Naive Bayes?

**Answer: Yes**

Using the law of total probability and the Naive Bayes likelihood:

$$
P(X = x) = \sum^C_{c = 1} P(X = x \mid Y = c)P(Y = c) = \sum^C_{c = 1}P(Y = c) \prod^d_{j = 1} P(X_j \mid Y = c)
$$

### 1.2 Joint Distribution Factorization

**Question:** Express the joint distribution $P(X_1, X_2, X_3, Y)$ as a product of simpler conditional probabilities.

Given:
- $P(X_1 \mid X_2, X_3, Y) = P(X_1 \mid Y) \Rightarrow X_1 \perp X_2, X_3 \mid Y$
- $P(X_2 \mid X_1, X_3, Y) = P(X_2 \mid Y) \Rightarrow X_2 \perp X_1, X_3 \mid Y$
- $P(X_3 \mid X_1, X_2, Y) = P(X_3 \mid X_1) \Rightarrow X_3 \perp X_2, Y \mid X_1$

**Answer:** $P(Y)P(X_1 \mid Y)P(X_3 \mid X_1)P(X_2 \mid Y)$

$$
\begin{aligned}
P(X_1, X_2, X_3, Y) &= P(Y)P(X_1, X_2, X_3 \mid Y) \\
&= P(Y)P(X_1 \mid Y)P(X_2, X_3 \mid X_1, Y) \\
&= P(Y)P(X_1 \mid Y)\underbrace{P(X_3 \mid X_1, Y)}_{= P(X_3 \mid X_1)}\underbrace{P(X_2 \mid X_3, X_1, Y)}_{= P(X_2 \mid Y)} \\
&= P(Y)P(X_1 \mid Y)P(X_3 \mid X_1)P(X_2 \mid Y)
\end{aligned}
$$

#### Maximum Likelihood Estimators

Let $\mathbb{I}\{e\}$ be the indicator function: $\mathbb{I}\{e\} = \begin{cases}1 & \text{if } e \text{ is true} \\ 0 & \text{if } e \text{ is false}\end{cases}$

**(i) $P(Y = 1)$**

**Answer:** $\frac{\sum^{N}_{i = 1} \mathbb{I}\{y^{(i)} = 1\}}{N}$

**(ii) $P(X_1 = 1 \mid Y = y)$ for $y \in \{0, 1\}$**

**Answer:** $\frac{\sum^{N}_{i = 1}\mathbb{I}\{x_1^{(i)} = 1, y^{(i)} = y\}}{\sum^{N}_{i = 1} \mathbb{I}\{y^{(i)} = y\}}$

**(iii) $P(X_3 = 1 \mid Y = y)$ for $y \in \{0, 1\}$**

**Answer:** $\sum^{1}_{x_1 = 0} \frac{\sum^{N}_{i = 0} \mathbb{I}\{x^{(i)}_1 = x_1, x_3^{(i)} = 1\}}{\sum^{N}_{i = 0} \mathbb{I}\{x^{(i)}_1 = x_1\}} \frac{\sum^{N}_{i = 1} \mathbb{I}\{y^{(i)} = y, x^{(i)}_1 = x_1 \}}{\sum^{N}_{i = 1} \mathbb{I}\{y^{(i)} = y\}}$

Using marginalization:

$$
\begin{aligned}
& P(X_3 \mid Y) = \sum^{1}_{x_1 = 0} P(X_3, X_1 = x_1 \mid Y) \\
& P(X_3 \mid Y) = \sum^{1}_{x_1 = 0} P(X_3 \mid X_1 = x_1, Y) P(X_1 = x_1 \mid Y) \\
& \Rightarrow P(X_3 = 1 \mid Y = y) = \sum^{1}_{x_1 = 0} P(X_3 = 1 \mid X_1 = x_1)P(X_1 = x_1 \mid Y)
\end{aligned}
$$

### 1.3 MAP Rule for Gaussian Naive Bayes

Given:
- $P(Y=0)=P(Y=1)=0.5$
- $(X_1 \mid Y=y) \sim \mathcal{N}(\mu_{1y},1)$, where $\mu_{10}=0, \mu_{11}=1$
- $(X_2 \mid Y=y) \sim \mathcal{N}(\mu_{2y},1)$, where $\mu_{20}=0, \mu_{21}=1$
- $(X_3 \mid X_1=x_1) \sim \mathcal{N}(2x_1,1)$ (independent of $Y$ given $X_1$)

#### (a) Derive the MAP Rule

**Answer:** $\hat{y}(x) = \begin{cases} 1 & \text{if } x_1 + x_2 > 1 \\ 0 & \text{otherwise} \end{cases}$

Using the same conditional independence structure:

$$
P(X_1, X_2, X_3, Y) = P(Y)P(X_1 \mid Y)P(X_2 \mid Y)P(X_3 \mid X_1)
$$

For classification, we choose $Y = 1$ when:

$$
\begin{aligned}
& P(Y=1 \mid X_1,X_2,X_3) > P(Y=0 \mid X_1,X_2,X_3) \\
& \iff P(X_1\mid Y=1)P(X_2\mid Y=1) > P(X_1\mid Y=0)P(X_2\mid Y=0) \\
& \iff (\mu_{11}-\mu_{10})x_1 - \tfrac{1}{2}(\mu_{11}^2-\mu_{10}^2) + (\mu_{21}-\mu_{20})x_2 - \tfrac{1}{2}(\mu_{21}^2-\mu_{20}^2) > 0
\end{aligned}
$$

Substituting $\mu$ values:

$$
x_1 - \tfrac{1}{2} + x_2 - \tfrac{1}{2} > 0 \implies x_1 + x_2 > 1
$$

#### (b) Classify Two Points

**Points to classify:**
- $X^{(a)} = \langle 0.2, 0.7, -10 \rangle$
- $X^{(b)} = \langle 0.2, 0.7, 10 \rangle$

**Answer:** Both $X^{(a)}$ and $X^{(b)}$ are classified with the label $y = 0$ as the sum of their $X_1$ and $X_2$ equals 0.9 (< 1), and their $X_3$ values are not used by the classifier.

The $X_3$ feature doesn't affect the classification because it's conditionally independent of $Y$ given $X_1$.

## Problem 2: Gaussian Naive Bayes Implementation (25 pt)

### Show Linear Classifier Equivalence

**Question:** Show that Gaussian Naive Bayes with equal class priors and equal variances across classes is equivalent to a linear classifier.

**Answer:**

For classification, we choose $Y = 1$ when $P(Y = 1 \mid x) > P(Y = 0 \mid x)$:

$$
\begin{aligned}
& P(Y=1 \mid x) > P(Y=0 \mid x) \\
& \iff P(x \mid Y=1) > P(x \mid Y=0) \quad \text{(equal priors)} \\
& \iff \sum_{j=1}^d \log P(X_j=x_j \mid Y=1) > \sum_{j=1}^d \log P(X_j=x_j \mid Y=0) \\
& \iff \sum_{j=1}^d \frac{(x_j-\mu_{0j})^2 - (x_j-\mu_{1j})^2}{2\sigma_j^2} > 0 \\
& \iff \sum_{j=1}^d \left(\frac{\mu_{1j}-\mu_{0j}}{\sigma_j^2}\right) x_j > -\sum_{j=1}^d \frac{\mu_{0j}^2 - \mu_{1j}^2}{2\sigma^2_j}
\end{aligned}
$$

Let $w_j = \frac{\mu_{1j}-\mu_{0j}}{\sigma_j^2}$ and $\tau = \sum_{j=1}^d \frac{\mu_{1j}^2 - \mu_{0j}^2}{2\sigma^2_j}$. Then:

$$
\hat{y}(x) = \begin{cases} 1 & \text{if } \sum^{d}_{j = 1} w_j x_j > \tau \\ 0 & \text{if } \sum^{d}_{j = 1} w_j x_j < \tau \end{cases}
$$

This shows the decision boundary is linear in the feature space.

## Problem 3: Logistic Regression Theory (25 pt)

### 3.1 Sigmoid Function Properties

**(a) Prove $\sigma(-s) = 1 - \sigma(s)$**

$$
\begin{aligned}
\sigma(-s) &= \frac{1}{1 + e^s} \\
&= \frac{1 + e^s}{1 + e^s} - \frac{e^s}{1 + e^s} \\
&= 1 - \frac{1}{e^{-s} + 1} \\
&= 1 - \sigma(s)
\end{aligned}
$$

This proves $P(y^{(i)} = -1 \mid x^{(i)}) + P(y^{(i)} = 1 \mid x^{(i)}) = \sigma(-w^\intercal x^{(i)}) + \sigma(w^\intercal x^{(i)}) = 1$

**(b) Prove $\sigma'(s) = \sigma(s)(1 - \sigma(s))$**

$$
\begin{aligned}
\sigma'(s) &= -(1 + e^{-s})^{-2} (-e^{-s}) \\
&= (1 + e^{-s})^{-1} (1 + e^{-s})^{-1}(e^{-s}) \\
&= \sigma(s) \frac{e^{-s}}{1 + e^{-s}} \\
&= \sigma(s)(1 - \sigma(s))
\end{aligned}
$$

### 3.2 Gradient of Log-Likelihood

**Answer:** $X^\intercal(\sigma(-y\odot Xw) \odot y)$

where $\odot$ denotes element-wise multiplication.

$$
\begin{aligned}
\log P(y \mid X, w) &= \sum^{N}_{i = 1} \log \sigma(y^{(i)}w^\intercal x^{(i)}) \\
\nabla_w \log P(y \mid X, w) &= \sum^{N}_{i = 1} (1 - \sigma(y^{(i)}w^\intercal x^{(i)}))y^{(i)}x^{(i)} \\
&= \sum^{N}_{i = 1} \sigma(- y^{(i)}w^\intercal x^{(i)})y^{(i)}x^{(i)} \\
&= X^\intercal(\sigma(-y\odot Xw) \odot y)
\end{aligned}
$$

### 3.3 Hessian Matrix

**Answer:** $-X D X^\intercal$ where $D$ is a diagonal matrix with $D_{ii} = \sigma(y^{(i)}w^\intercal x^{(i)})(1 - \sigma(y^{(i)}w^\intercal x^{(i)}))$

Taking the derivative of the gradient:

$$
\begin{aligned}
\nabla^2 \log P(y \mid X, w) &= \sum^{N}_{i = 1} (1 - \sigma(y^{(i)}w^\intercal x^{(i)}))\sigma(y^{(i)}w^\intercal x^{(i)})(-x^{(i)})x^{(i)\intercal} \\
&= -X D X^\intercal
\end{aligned}
$$

### 3.4 Prove Hessian is Negative Semi-Definite

For any vector $z$:

$$
\begin{aligned}
z^\intercal H z &= -z^\intercal X D X^\intercal z \\
&= -(X^\intercal z)^\intercal D(X^\intercal z) \\
&= -\sum^{N}_{i = 1} (1 - \sigma(y^{(i)}w^\intercal x^{(i)}))\sigma(y^{(i)}w^\intercal x^{(i)}) a_i^2
\end{aligned}
$$

where $a = X^\intercal z$. Since both terms in the product are non-negative (probabilities), we have $z^\intercal Hz \le 0$, proving the Hessian is negative semi-definite. This means the log-likelihood is concave with only a global maximum.

### 3.5 Gradient Descent Update Rule

**Answer:** $w_{t + 1} = w_{t} + \alpha X^\intercal(\sigma(-y\odot Xw_t) \odot y)$ at iteration $t$

### 3.6 Newton's Method Update Rule

**Answer:** $w_{t+1} = w_{t} + (XDX^\intercal)^{-1} \nabla l(w_t)$

Newton's method approximates the gradient using Taylor expansion:

$$
\nabla l(w_{t+1}) \approx \nabla l(w_{t}) + \nabla^2 l(w_t)(w_{t+1} - w_t)
$$

Setting this to zero and solving for $w_{t+1}$:

$$
w_{t + 1} = w_t - H^{-1}g = w_{t} - (-XDX^\intercal)^{-1} \nabla l(w_t) = w_{t} + (XDX^\intercal)^{-1} \nabla l(w_t)
$$

## Problem 4: Programming - Optimization (25 pt)

### 4.1 Logistic Regression Implementation

#### Analysis of Feature Transformation

Given that the input data are in circular distribution which is linearly inseparable, the Logistic Regression model, a linear model, cannot classify the input data with a linear decision boundary.

However, by mapping the existing data points to higher dimensions using polynomial features ($x_1^2, x_2^2, x_1x_2$), we enable our linear model to capture the non-linear patterns in the data. The transformation creates a feature space where the classes become linearly separable.

### 4.2 L1 vs. L2 Regularization

Both L1 and L2 regularizations reduce overfitting by penalizing large weights:

**L1 Regularization (Lasso):** Adds penalty $\frac{\lambda}{m}\|w\|_1$
- Gradient penalty: $\lambda \cdot \text{sign}(w)$
- Drives insignificant features to exactly zero (feature selection)
- Preferred when only certain features matter

**L2 Regularization (Ridge):** Adds penalty $\frac{\lambda}{2m}\|w\|_2^2$
- Gradient penalty: $\lambda w$
- Shrinks weights proportionally to their current values
- Preserves all features with reduced magnitudes
- Preferred when all features need to be considered

The key difference is that L1 produces sparse solutions (many weights become zero), while L2 produces dense solutions (all weights remain non-zero but small).

### 4.3 Hyperparameter Tuning Results

Best Performing Hyperparameter Combination:
- Learning rate: 0.1
- Lambda: 0.0001
- Best validation accuracy: 100.00%
- Test Set Accuracy: 98.67%

### 4.4 Gradient Descent Variants Comparison

**Convergence Speed:** Stochastic GD > Mini-batch GD > Batch GD
- More parameter updates per epoch leads to faster convergence

**Stability:** Batch GD > Mini-batch GD > Stochastic GD
- Batch GD provides the most stable and predictable convergence
- Stochastic and Mini-batch GD have noisier updates but converge faster

The plot shows:
- **Batch GD:** Smooth convergence curve, slowest to converge
- **Mini-batch GD:** Moderate noise, balanced speed and stability
- **Stochastic GD:** Fastest convergence but most oscillation in individual updates

## Code Implementation

### Gaussian Naive Bayes (hw2_q2.py)

```python
def gaussian_theta(X: List[FloatTensor], y: LongTensor) -> Tuple[Tensor, Tensor]:
    """Calculate MLE for mu and sigma2 in Gaussian Naive Bayes"""
    mu = torch.stack([
        X[y == 0].mean(dim=0),
        X[y == 1].mean(dim=0),
    ], dim=0)

    sigma2 = torch.stack([
        ((X[y == 0] - mu[0]) ** 2).mean(dim=0),
        ((X[y == 1] - mu[1]) ** 2).mean(dim=0),
    ], dim=0)

    return mu, sigma2

def gaussian_p(y: LongTensor):
    """Calculate MLE for P(Y=0)"""
    return (y == 0).sum() / len(y)

def gaussian_classify(mu: Tensor, sigma2: Tensor, p: FloatTensor, X: Tensor):
    """Classify using Gaussian Naive Bayes"""
    log_p = torch.tensor([torch.log(p), torch.log(1 - p)])

    posteriors = []
    for c in range(2):
        log_likelihoods = (
            -0.5 * torch.log(2 * torch.pi * sigma2[c])
            - (X - mu[c]) ** 2 / (2 * sigma2[c])
        ).sum(dim=1)
        posteriors.append(log_likelihoods + log_p[c])

    posteriors = torch.stack(posteriors, dim=1)
    return torch.argmax(posteriors, dim=1)
```

### Logistic Regression Core Functions (hw2_q4.py)

```python
def _sigmoid(self, z):
    """Sigmoid activation function"""
    return 1 / (1 + np.exp(-z))

def transform(self, X):
    """Transform features to polynomial space"""
    col_v1 = X[:, 0].reshape(-1, 1)
    col_v2 = X[:, 1].reshape(-1, 1)
    return np.hstack([
        col_v1, col_v2,
        col_v1**2, col_v2**2,
        col_v1 * col_v2,
    ])

def _compute_cost(self, y, y_pred):
    """Binary cross-entropy with regularization"""
    m = len(y)
    y_pred_clipped = np.clip(y_pred, EPSILON, 1 - EPSILON)
    cost = -np.sum(y * np.log(y_pred_clipped) +
                   (1 - y) * np.log(1 - y_pred_clipped)) / m

    # Add L2 or L1 regularization
    reg_cost = 0
    if self.regularization == "L2":
        reg_cost = self.lambda_val / (2 * m) * np.linalg.norm(self.weights) ** 2
    elif self.regularization == "L1":
        reg_cost = self.lambda_val / m * np.linalg.norm(self.weights, ord=1)

    return cost + reg_cost
```
