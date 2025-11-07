---
categories:
- Machine Learning
- homework
createdAt: '2025-09-17'
description: 'Solutions to CS 446/ECE 449 Homework 1 covering K-NN, Perceptron Algorithm, and MLE/MAP estimation'
tags:
- Machine Learning
- K-NN
- Perceptron
- MLE
- MAP
- Statistics
- In Progress
title: Machine Learning Homework 1 Solutions
---

# Machine Learning Homework 1 Solutions

This post contains my solutions to the first homework assignment for CS 446/ECE 449 Machine Learning. The problems cover fundamental concepts in K-Nearest Neighbors (K-NN), the Perceptron Algorithm, and Maximum Likelihood Estimation (MLE) / Maximum A Posteriori (MAP) estimation.

## K-Nearest Neighbors (K-NN)

### Problem 1: Binary Search for Class Distribution

**Question:** Given a dataset with two non-overlapping circles (blue labeled 0, green labeled 1), we have N training samples total and a single test point from the green circle. What is the minimum number of queries to a K-NN classifier needed to determine the number of training points from each class?

**Solution:** The minimum number of queries is $\log N$.

Since the two circles do not overlap, data points are certainly closer to their neighbors within the same circle, leading the classifier to output the majority label when $K = N$. Given that:
- The number of samples in the green circle is less than $N/2$
- We can query with any value of K

We can perform a binary search on the size of the green circle by:
1. Starting with $K = N/2$
2. Dividing K by 2 in each iteration
3. The output tells us whether there are more or fewer than K green points

This effectively performs binary search on the class distribution, minimizing queries to $\log N$.

**Part (b):** Can the 1-NN classifier fail in any setting?

**Answer:** Yes, if the data points are imbalanced between the two circles. If the blue circle is dense while the green circle is sparse, a green test point may end up closer to a point in the blue circle and be misclassified as blue.

### Problem 2: K-NN with Specific Data Points

Given the following dataset in $\mathbb{R}^3$:

| Index | $x_1$ | $x_2$ | $x_3$ | Label |
|-------|-------|-------|-------|-------|
| 1     | 1     | 1     | 1     | 1     |
| 2     | 0     | 0     | 1     | 1     |
| 3     | 0     | 0     | 0     | -1    |
| 4     | 1     | 0     | 0     | -1    |
| 5     | 0     | 1     | 0     | -1    |

**Part (a):** For $K = 1$ and test point $\mathbf{x} = (0.4, 0.4, 1.5)$, what is the predicted label?

**Answer:** Label 1

The data point with index 2 is the closest to the input $\mathbf{x}$ with Euclidean distance:

$$
\sqrt{(0 - 0.4)^2 + (0 - 0.4)^2 + (1 - 1.5)^2} = \sqrt{0.57} \approx 0.755
$$

**Part (b):** When there is more noise in the training dataset, should we choose smaller or larger K?

**Answer:** Larger K.

To avoid overfitting, a larger K value should be adopted so the input is not affected by the labels of outliers. As the K-NN algorithm classifies an input based on the most common labels among K nearest neighbors, the more neighbors considered, the less influence a single neighbor has. Thus, increasing K suppresses the negative impact of noise.

### Problem 3: Probability Analysis with 1-NN

**Setting:** Input space $S = \{x^{(i)}\}_{i=1}^N$ with all distinct points. For each $x^{(i)}$, the label $y^{(i)} \in \{1, 2\}$ is drawn independently with $\mathbb{P}(y^{(i)} = 1 | x^{(i)}) = 0.9$.

**Question:** What is the probability of correct prediction for a test sample $x \in S$ using 1-NN?

**Answer:** 0.82

Since the test point $x$ is in the input space $S$, there exists a training sample $x^{(j)} = x$. The probability of correct prediction requires that two independent draws of the labels (one for the true label $y$ and one for the classifier's prediction $\hat{y}$) match:

$$
\begin{align*}
\mathbb{P}(\hat{y} = y) &= \mathbb{P}(y = 1, \hat{y} = 1) + \mathbb{P}(y = 2, \hat{y} = 2) \\
&= 0.9^2 + 0.1^2 = 0.82
\end{align*}
$$

### Problem 4: 3-NN with Replicated Labels

**Setting:** Same as Problem 3, but now each $x^{(i)}$ has three independent labeled replicas $(x^{(i)}, y^{(i,1)})$, $(x^{(i)}, y^{(i,2)})$, $(x^{(i)}, y^{(i,3)})$.

**Question:** What is the probability of correct prediction using 3-NN? How does it compare to 1-NN?

**Answer:** 0.8776 (increased by 0.0576)

The 3-NN classifier's prediction distribution:

$$
\begin{cases}
\mathbb{P}(\hat{y} = 1) = \binom{3}{2} \cdot 0.9^2 \cdot 0.1 + \binom{3}{3} \cdot 0.9^3 = 0.972 \\
\mathbb{P}(\hat{y} = 2) = 1 - \mathbb{P}(\hat{y} = 1) = 0.028
\end{cases}
$$

Updated probability of correct predictions:

$$
\begin{align*}
\mathbb{P}(\hat{y} = y) &= \mathbb{P}(y = 1, \hat{y} = 1) + \mathbb{P}(y = 2, \hat{y} = 2) \\
&= 0.9 \times 0.972 + 0.1 \times 0.028 = 0.8776
\end{align*}
$$

The 3-NN classifier improves accuracy by approximately 5.76% compared to 1-NN.

### Problem 5: Handling Missing Features

**Question:** Is it possible to apply K-NN when test data points have missing features?

**Answer:** Yes, using K-NN imputation. The algorithm:
1. Finds the K nearest neighbors
2. Replaces missing values with an aggregation (mean, median, or mode) of the neighbors' values

This approach allows K-NN to handle incomplete data effectively.

## Perceptron Algorithm

### Problem 1: Perceptron on 3D Data

Using the same dataset from the K-NN section with the "hacked notation" (augmented vectors):

**Part (a):** What is $\mathbf{w} \in \mathbb{R}^4$ after the first iteration over the first data point?

**Solution:**
- $x^{(1)} = [1, 1, 1]$, $y^{(1)} = 1$, $w^{(1)} = [0, 0, 0, 0]$
- Augmented: $\hat{x}^{(1)} = [1, 1, 1, 1]$
- Since $y^{(1)}(w^{(1)\top}\hat{x}^{(1)}) = 0 \leq 0$, update: $w^{(1)} \leftarrow w^{(1)} + y^{(1)}\hat{x}^{(1)}$

**Answer:** $\mathbf{w} = [1, 1, 1, 1]$

**Part (b):** Compute $\mathbf{w}$ after the algorithm converges.

**Answer:** $\mathbf{w} = [-2, 0, 0, 3]$

**Part (c):** If we switch labels of points 2 and 3, is the perceptron algorithm still applicable?

**Answer:** No, the data becomes linearly inseparable.

After swapping the labels:
- Point 2: $(0, 0, 1)$ with label -1
- Point 3: $(0, 0, 0)$ with label 1

The updated dataset cannot be separated by any hyperplane in 3D space.

**Part (d):** Will K-NN and perceptron always have the same results on the test set?

**Answer:** No.

The perceptron algorithm is designed for linearly separable data and finds a global linear boundary. K-NN is an instance-based method that assigns labels based on local neighborhood information. When data is not linearly separable, the perceptron may fail to find a suitable hyperplane and misclassify points, while K-NN can often handle such cases more effectively by relying on local structure.

### Problem 2: Adapted Perceptron Convergence Proof

This problem analyzes an adapted perceptron algorithm with margin condition $\gamma$.

**Assumptions:**
1. $\exists \mathbf{w}^*$ such that $y^{(i)}(\mathbf{w}^{*\top})\mathbf{x}^{(i)} > 0$ for all training samples
2. $\|\mathbf{w}^*\| = 1$ and $\|\mathbf{x}^{(i)}\| \leq 1$
3. Margin $\gamma = \min |\mathbf{w}^{*\top}\mathbf{x}^{(i)}|$

**Part (a):** Prove that $\mathbf{w}_{new}^\top\mathbf{w}^* \geq \mathbf{w}^\top\mathbf{w}^* + \gamma$.

**Proof:**

$$
\begin{align*}
w_{new}^\top w^* &= (w + yx)^\top w^* \\
&= w^\top w^* + yw^{*\top}x \\
&\geq w^\top w^* + \gamma
\end{align*}
$$

Since the update only occurs when misclassification happens, $\text{sign}(y) = \text{sign}(w^{*\top}x)$, which means $yw^{*\top}x = |w^{*\top}x| \geq \gamma$.

**Part (b):** Prove that if $a \geq 0$, $b \geq 0$, $\gamma \geq 0$ and $a^2 \leq b^2 + b\gamma + 1$, then $a \leq b + \frac{1}{2b} + \frac{\gamma}{2}$.

**Proof:**

$$
\begin{align*}
a^2 &\leq b^2 + b\gamma + 1 \\
&\leq (b + \frac{\gamma}{2})^2 + 1 - \frac{\gamma^2}{4} \\
&\leq (b + \frac{\gamma}{2})^2 + 1
\end{align*}
$$

Since $(b + \frac{1}{2b} + \frac{\gamma}{2})^2 = (b + \frac{\gamma}{2})^2 + 2(b + \frac{\gamma}{2})\frac{1}{2b} + \frac{1}{4b^2} > (b + \frac{\gamma}{2})^2 + 1$, we have $a \leq b + \frac{1}{2b} + \frac{\gamma}{2}$.

**Part (c):** Prove that $\|\mathbf{w}_{new}\| \leq \|\mathbf{w}\| + \frac{1}{2\|\mathbf{w}\|} + \frac{\gamma}{2}$.

**Proof:**

$$
\begin{align*}
\|w_{new}\|^2 &= \|w + yx\|^2 \\
&= \|w\|^2 + 2yw^\top x + \|yx\|^2
\end{align*}
$$

The algorithm only updates when $yw^\top x \leq \frac{\gamma}{2}\|w\|$ and $\|x\| \leq 1$, so:

$$
\|w_{new}\|^2 \leq \|w\|^2 + \gamma\|w\| + 1
$$

Applying the result from part (b) with $a = \|w_{new}\|$ and $b = \|w\|$:

$$
\|w_{new}\| \leq \|w\| + \frac{1}{2\|w\|} + \frac{\gamma}{2}
$$

**Part (d):** Prove that if $M \geq \frac{2}{\gamma^2}$, then $\exists t \leq M$ such that after $t$ updates, $\|\mathbf{w}\| \geq \frac{2}{\gamma}$.

**Proof:**

From part (a), after $t$ updates:

$$
w_t^\top w^* \geq t\gamma
$$

By Cauchy-Schwarz inequality:

$$
w_t^\top w^* \leq \|w_t\| \cdot \|w^*\| = \|w_t\|
$$

Therefore: $t\gamma \leq \|w_t\|$

Assume for contradiction that $\|w_M\| < \frac{2}{\gamma}$ when $t = M$:

$$
M\gamma \leq \|w_M\| < \frac{2}{\gamma}
$$

This implies $M < \frac{2}{\gamma^2}$, contradicting our assumption that $M \geq \frac{2}{\gamma^2}$. Therefore, $\|w\| \geq \frac{2}{\gamma}$ for some $t \leq M$.

**Part (e):** Prove that $M \leq \frac{8}{\gamma^2}$.

**Proof:**

From the analysis above:

$$
M\gamma \leq w_M^\top w^* \leq \|w_M\|
$$

From part (c), we can show that:

$$
\|w_M\|^2 \leq 2M
$$

(Since each update increases $\|w\|^2$ by at most $\gamma + 1 \leq 2$ when $\gamma \leq 1$)

Therefore:

$$
M\gamma \leq \|w_M\| \leq \sqrt{2M}
$$

Squaring both sides:

$$
M^2\gamma^2 \leq 2M
$$

$$
M \leq \frac{2}{\gamma^2}
$$

Since the adapted algorithm has a tighter condition, the bound extends to:

$$
M \leq \frac{8}{\gamma^2}
$$

### Python Implementation

Here's a Python implementation of the perceptron algorithm for the 3D data:

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Data points from the table
X = np.array([
    [1, 1, 1],  # index 1
    [0, 0, 1],  # index 2
    [0, 0, 0],  # index 3
    [1, 0, 0],  # index 4
    [0, 1, 0],  # index 5
])

y = np.array([1, 1, -1, -1, -1])  # labels

# Add bias term -> augmented vector [1, x1, x2, x3]
X_aug = np.hstack([np.ones((X.shape[0], 1)), X])

# Initialize weight vector w ∈ R^4
w = np.zeros(X_aug.shape[1])

def predict(x):
    return 1 if np.dot(w, x) > 0 else -1

# Perceptron learning
changed = True
iteration = 0
while changed:
    changed = False
    for i in range(len(X_aug)):
        if y[i] * np.dot(w, X_aug[i]) <= 0:
            w = w + y[i] * X_aug[i]
            changed = True
    iteration += 1
    if iteration > 100:  # safeguard
        break

print("Final weight vector w:", w)
print("Iterations:", iteration)

# Plotting 3D decision boundary
pos = X[y == 1]
neg = X[y == -1]

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(pos[:, 0], pos[:, 1], pos[:, 2],
           c='b', marker='o', label='Positive (+1)')
ax.scatter(neg[:, 0], neg[:, 1], neg[:, 2],
           c='r', marker='x', label='Negative (-1)')

xx, yy = np.meshgrid(np.linspace(-0.5, 1.5, 10),
                      np.linspace(-0.5, 1.5, 10))
zz = (-w[0] - w[1]*xx - w[2]*yy) / w[3]
ax.plot_surface(xx, yy, zz, alpha=0.3, color='green')

ax.set_xlabel('x1')
ax.set_ylabel('x2')
ax.set_zlabel('x3')
ax.set_title('3D Data + Perceptron Decision Boundary')
ax.legend()

plt.show()
```

## Maximum Likelihood Estimation (MLE) and Maximum A Posteriori (MAP)

### Problem 1: Triangle Distribution

**Part (a):** Find the MLE estimate $\hat{b}$ for the Triangle$(a, b)$ distribution.

Given PDF:

$$
p(x|a,b) = \begin{cases}
\frac{2(x-a)}{(b-a)^2} & \text{for } x \in [a,b] \\
0 & \text{otherwise}
\end{cases}
$$

**Solution:**

The likelihood function:

$$
\begin{align*}
L(b) &= \prod_{i=1}^N p(x^{(i)} | a, b) \\
&= (b - a)^{-2N} \prod_{i=1}^N 2(x^{(i)} - a)
\end{align*}
$$

Taking the logarithm:

$$
\ln L(b) = -2N \ln(b - a) + \sum_{i=1}^N \ln 2(x^{(i)} - a)
$$

The derivative:

$$
\frac{\partial \ln L(b)}{\partial b} = -\frac{2N}{b - a} < 0
$$

Since the derivative is always negative, $L(b)$ decreases with $b$. The maximum occurs at the smallest feasible $b$:

**Answer:** $\hat{b}_{MLE} = \max_i x^{(i)}$ (the maximum observed value)

### Problem 2: Discrete Distribution Estimation

Given 100 samples with observations:

| | X = 1 | X = 2 | X = 3 |
|---|---|---|---|
| Z = 1 | 18 | 7 | 6 |
| Z = 2 | 9 | 12 | 3 |
| Z = 3 | 10 | 2 | 9 |
| Z = 4 | 3 | 19 | 2 |

**Part (a):** Given measurement $Z = 3$, what is the MLE for $X$?

**Solution:**

Column totals: $n_{X=1} = 40$, $n_{X=2} = 40$, $n_{X=3} = 20$

Estimated probabilities:

$$
\begin{cases}
\hat{P}(Z = 3 | X = 1) = \frac{10}{40} = 0.25 \\
\hat{P}(Z = 3 | X = 2) = \frac{2}{40} = 0.05 \\
\hat{P}(Z = 3 | X = 3) = \frac{9}{20} = 0.45
\end{cases}
$$

Since MLE ignores priors:

**Answer:** $X_{MLE} = 3$

**Part (b):** What is the MAP estimate given priors $P(X=1) = 0.2$, $P(X=2) = 0.5$, $P(X=3) = 0.3$?

**Solution:**

Joint probabilities:

$$
\begin{cases}
P(Z = 3, X = 1) = 0.25 \times 0.20 = 0.05 \\
P(Z = 3, X = 2) = 0.05 \times 0.50 = 0.025 \\
P(Z = 3, X = 3) = 0.45 \times 0.30 = 0.135
\end{cases}
$$

Normalizing by $P(Z = 3) = 0.21$:

$$
\begin{cases}
P(X = 1 | Z = 3) \approx 0.238 \\
P(X = 2 | Z = 3) \approx 0.119 \\
P(X = 3 | Z = 3) \approx 0.643
\end{cases}
$$

**Answer:** $X_{MAP} = 3$

### Problem 3: Poisson Distribution

**Part (a):** Derive MLE estimate for Poisson distribution.

Given PMF: $P(k|\lambda) = \frac{\lambda^k e^{-\lambda}}{k!}$

**Solution:**

Likelihood:

$$
\begin{align*}
L(\lambda) &= \prod_{i=1}^N \frac{\lambda^{k^{(i)}}e^{-\lambda}}{k^{(i)}!} \\
&= e^{-\lambda N} \cdot \lambda^{N\bar{k}} \cdot C
\end{align*}
$$

where $\bar{k} = \frac{1}{N}\sum_{i=1}^N k^{(i)}$ and $C = \frac{1}{\prod k^{(i)}!}$

Log-likelihood:

$$
\ln L(\lambda) = -\lambda N + N\bar{k}\ln \lambda + \ln C
$$

Derivative:

$$
\frac{\partial \ln L(\lambda)}{\partial \lambda} = -N + \frac{N\bar{k}}{\lambda}
$$

Setting to zero:

**Answer:** $\hat{\lambda}_{MLE} = \bar{k}$ (sample mean)

**Part (b):** Derive MAP estimate with Gamma prior.

Given prior: $p(\lambda) = \frac{\lambda^{\alpha-1}e^{-\lambda/\beta}}{\Gamma(\alpha)\beta^\alpha}$

**Solution:**

Posterior kernel:

$$
p(\lambda | k) \propto \lambda^{\alpha + N\bar{k} - 1} e^{-(N + 1/\beta)\lambda}
$$

Log-posterior:

$$
l(\lambda) = (\alpha + N\bar{k} - 1)\ln \lambda - (N + 1/\beta)\lambda
$$

Derivative:

$$
l'(\lambda) = \frac{\alpha + N\bar{k} - 1}{\lambda} - (N + 1/\beta) = 0
$$

**Answer:** $\hat{\lambda}_{MAP} = \frac{\alpha + N\bar{k} - 1}{N + 1/\beta}$

**Part (c):** What happens as $N \to \infty$?

**Solution:**

$$
\begin{align*}
\hat{\lambda}_{MAP} - \hat{\lambda}_{MLE} &= \frac{\alpha - 1 - (1/\beta)\bar{k}}{N + 1/\beta} \\
&\to 0 \text{ as } N \to \infty
\end{align*}
$$

**Answer:** As $N \to \infty$, both $\hat{\lambda}_{MAP}$ and $\hat{\lambda}_{MLE}$ converge to the true population mean.

### Problem 4: Gaussian Sensor Measurements

**Part (a):** Derive MLE for 1D position from sonar measurements.

Given: $p(z^{(i)}|x) = \frac{1}{\sigma_i\sqrt{2\pi}}e^{-\frac{(z^{(i)} - x)^2}{2\sigma_i^2}}$

**Solution:**

Log-likelihood:

$$
\ln L(x) = -\sum \ln(\sigma_i\sqrt{2\pi}) - \sum_{i=1}^N \frac{(z^{(i)} - x)^2}{2\sigma_i^2}
$$

Derivative:

$$
\frac{d \ln L(x)}{dx} = \sum_{i=1}^N \frac{z^{(i)} - x}{\sigma_i^2}
$$

Setting to zero (assuming equal variances):

**Answer:** $\hat{x}_{MLE} = \bar{z} = \frac{1}{N}\sum_{i=1}^N z^{(i)}$ (sample mean)

**Part (b):** Derive MAP estimate with Gaussian prior $x \sim \mathcal{N}(\theta_0, \sigma_0^2)$.

**Solution:**

Log-posterior:

$$
l(x) = -\frac{1}{2}\left[\frac{(x - \theta_0)^2}{\sigma_0^2} + \sum_{i=1}^N \frac{(z^{(i)} - x)^2}{\sigma_i^2}\right]
$$

Derivative:

$$
l'(x) = \frac{x - \theta_0}{\sigma_0^2} + \sum_{i=1}^N \frac{z^{(i)} - x}{\sigma_i^2} = 0
$$

Solving:

**Answer:** $\hat{x}_{MAP} = \frac{\frac{\theta_0}{\sigma_0^2} + \sum_{i=1}^N \frac{z^{(i)}}{\sigma_i^2}}{\frac{1}{\sigma_0^2} + \sum_{i=1}^N \frac{1}{\sigma_i^2}}$

This is a weighted average of the prior mean and the measurements, with weights inversely proportional to variances.

**Part (c):** What happens as $N \to \infty$?

**Solution:**

Let $W = \sum_{i=1}^N \frac{1}{\sigma_i^2}$. Rewrite:

$$
\hat{x}_{MAP} = \frac{W}{W + \frac{1}{\sigma_0^2}}\hat{x}_{MLE} + \frac{\frac{1}{\sigma_0^2}}{W + \frac{1}{\sigma_0^2}}\theta_0
$$

As $N \to \infty$, $W \to \infty$, so $\frac{W}{W + \frac{1}{\sigma_0^2}} \to 1$.

**Answer:** As $N \to \infty$, $\hat{x}_{MAP} \to \hat{x}_{MLE}$. The influence of the prior diminishes as we gather more data.

## Key Takeaways

1. **K-NN**: Binary search can optimize query complexity; larger K reduces overfitting; replication improves robustness
2. **Perceptron**: Converges for linearly separable data with bounded number of updates; fails on non-separable data
3. **MLE vs MAP**: MLE maximizes likelihood alone; MAP incorporates prior knowledge; both converge as sample size increases

These fundamental concepts form the foundation for more advanced machine learning algorithms.
