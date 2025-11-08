---
categories:
- Machine Learning
- homework
createdAt: '2025-10-31'
description: 'Solutions to ML Homework 4 covering bias-variance decomposition in Ridge Regression, optimal classifier under squared loss, and model selection using k-fold cross-validation'
tags:
- Machine Learning
- Bias-Variance Tradeoff
- Ridge Regression
- Model Selection
- Cross Validation
title: Homework 4 Solutions
---
## Problem 1: Bias-Variance in Ridge Regression (23 pt)

### Setup

Consider scalar features $\{x^{(i)}\}_{i=1}^N$ (fixed, non-random) with labels:

$$
y^{(i)} = w^* x^{(i)} + \epsilon^{(i)}
$$

where $w^*$ is fixed (unknown) and $\epsilon^{(i)} \sim N(0, \sigma^2)$ i.i.d.

Ridge regression with $\lambda \ge 0$:

$$
w_{\mathcal{D}} = \argmin_w \frac{1}{N} \sum_{i=1}^N (wx^{(i)}-y^{(i)})^2 + \lambda w^2
$$

Closed-form solution:

$$
w_{\mathcal{D}} = \frac{\frac{1}{N}\sum_{i=1}^N x^{(i)} y^{(i)}}{\lambda + \frac{1}{N} \sum_{i=1}^N x^{(i)2}}
$$

Let $s^2 = \frac{1}{N}\sum_{i=1}^N x^{(i)2}$.

### 1.1 Expected Label and Noise

#### (a) Prove $\bar{y}(x) = w^*x$

$$
\begin{aligned}
\bar{y}(x) &= \mathbb{E}_{y \mid x}[y] \\
&= \mathbb{E}_{y \mid x}[w^*x + \epsilon] \\
&= w^*x + \mathbb{E}_{y \mid x}[\epsilon] \quad (\epsilon \sim N(0, \sigma^2)) \\
&= w^*x
\end{aligned}
$$

#### (b) Prove Noise = $\sigma^2$

$$
\begin{aligned}
\text{Noise} &= \frac{1}{N} \sum_{i=1}^N \mathbb{E}_{y^{(i)}|x^{(i)}}[(\bar{y}(x^{(i)})-y^{(i)})^2] \\
&= \frac{1}{N} \sum_{i=1}^N \mathbb{E}_{y^{(i)}|x^{(i)}}[(w^*x^{(i)} - (w^*x^{(i)} + \epsilon))^2] \\
&= \frac{1}{N} \sum_{i=1}^N \mathbb{E}_{y^{(i)}|x^{(i)}}[\epsilon^2] \\
&= \frac{1}{N} \sum_{i=1}^N \sigma^2 = \sigma^2
\end{aligned}
$$

### 1.2 Expected Predictor

**Prove:** $\bar{w} = \frac{s^2}{\lambda + s^2} w^*$

$$
\begin{aligned}
\bar{w} &= \mathbb{E}_\mathcal{D}[w_\mathcal{D}] \\
&= \mathbb{E}_\mathcal{D}\left[\frac{\frac{1}{N} \sum^{N}_{i = 1} x^{(i)} y^{(i)}}{\lambda + s^2}\right] \\
&= \frac{1}{N(\lambda + s^2)} \sum^{N}_{i = 1} \mathbb{E}_\mathcal{D}\left[x^{(i)} y^{(i)}\right] \\
&= \frac{1}{N(\lambda + s^2)} \sum^{N}_{i = 1} \mathbb{E}_\mathcal{D}\left[x^{(i)} (w^* x^{(i)} + \epsilon^{(i)})\right] \\
&= \frac{1}{N(\lambda + s^2)} \sum^{N}_{i = 1} x^{(i)2} w^* \quad (\mathbb{E}[\epsilon^{(i)}] = 0) \\
&= \frac{s^2}{\lambda + s^2}w^*
\end{aligned}
$$

### 1.3 Squared Bias

**Prove:** $\text{Bias}^2 = \left(\frac{\lambda}{\lambda + s^2}\right)^2 w^{*2} s^2$

$$
\begin{aligned}
\text{Bias}^2 &= \frac{1}{N} \sum_{i=1}^N (\bar{w}x^{(i)} - \bar{y}(x^{(i)}))^2 \\
&= \frac{1}{N} \sum_{i=1}^N (\bar{w}x^{(i)} - w^*x^{(i)})^2 \\
&= s^2(\bar{w} - w^*)^2 \\
&= s^2\left(\frac{s^2}{\lambda + s^2}w^* - w^*\right)^2 \\
&= s^2 w^{*2}\left(\frac{s^2}{\lambda + s^2} - 1\right)^2 \\
&= s^2 w^{*2}\left(\frac{-\lambda}{\lambda + s^2}\right)^2 \\
&= \left(\frac{\lambda}{\lambda + s^2}\right)^2 w^{*2}s^2
\end{aligned}
$$

### 1.4 Variance

**Prove:** $\text{Variance} = \frac{s^4 \sigma^2}{N(\lambda + s^2)^2}$

$$
\begin{aligned}
\text{Variance} &= \frac{1}{N} \sum_{i=1}^N \mathbb{E}_{\mathcal{D}}[(w_{\mathcal{D}}x^{(i)} - \bar{w}x^{(i)})^2] \\
&= \frac{1}{N} \sum_{i=1}^N x^{(i)2}\mathbb{E}_{\mathcal{D}}[(w_{\mathcal{D}} - \bar{w})^2] \\
&= s^2 \cdot \text{Var}_\mathcal{D}[w_\mathcal{D}]
\end{aligned}
$$

Computing $\text{Var}_\mathcal{D}[w_\mathcal{D}]$:

$$
\begin{aligned}
\text{Var}_\mathcal{D}[w_\mathcal{D}] &= \text{Var}_\mathcal{D}\left[\frac{1}{N(\lambda + s^2)} \sum^{N}_{i = 1} x^{(i)}y^{(i)}\right] \\
&= \frac{1}{N^2(\lambda + s^2)^2} \sum^{N}_{i = 1} x^{(i)2}\text{Var}_\mathcal{D}[\epsilon^{(i)}] \\
&= \frac{1}{N^2(\lambda + s^2)^2} \sum^{N}_{i = 1} x^{(i)2}\sigma^2 \\
&= \frac{s^2\sigma^2}{N(\lambda + s^2)^2}
\end{aligned}
$$

Therefore:

$$
\text{Variance} = s^2 \cdot \frac{s^2\sigma^2}{N(\lambda + s^2)^2} = \frac{s^4 \sigma^2}{N(\lambda + s^2)^2}
$$

### 1.5 Behavior as $\lambda$ Changes

#### Monotonicity Analysis

**Bias$^2$ is increasing in $\lambda$:**
- As $\lambda$ increases, both numerator $\lambda^2$ and denominator $(\lambda + s^2)^2$ grow
- The fraction $\left(\frac{\lambda}{\lambda + s^2}\right)^2$ approaches 1 as $\lambda \to \infty$

**Variance is decreasing in $\lambda$:**
- Only the denominator $N(\lambda + s^2)^2$ grows with $\lambda$
- This shrinks the variance value

#### Limiting Behavior

**(a) When $\lambda \to 0$:**
- $\text{Bias}^2 \to 0$ (unbiased estimator)
- $\text{Variance} \to \frac{\sigma^2}{N}$ (standard OLS variance)

This is the OLS solution with no regularization.

**(b) When $\lambda \to \infty$:**
- $\text{Bias}^2 \to w^{*2}s^2$ (maximum bias)
- $\text{Variance} \to 0$ (minimum variance)

The predictor becomes constant (heavily regularized).

**Interpretation:** Increasing $\lambda$ creates a bias-variance tradeoff:
- Higher $\lambda$: Lower variance, higher bias
- Lower $\lambda$: Higher variance, lower bias

Since we don't know $w^*$ or the true distribution of $\epsilon$, we use model selection (e.g., cross-validation) to find optimal $\lambda$.

### 1.6 Triangle Inequality Bound

**Prove:** $|w_{\mathcal{D}} - \bar{w}|^2 \le 4R$ for constraint $w^2 \le R$

Given the regularization constraint forces $w$ inside a ball of radius $\sqrt{R}$:
- For every dataset $\mathcal{D}$: $|w_\mathcal{D}| \le \sqrt{R}$
- For the expected predictor: $|\bar{w}| \le \sqrt{R}$

By triangle inequality:

$$
|w_\mathcal{D} - \bar{w}| \le |w_\mathcal{D}| + |\bar{w}| \le \sqrt{R} + \sqrt{R} = 2\sqrt{R}
$$

Therefore:

$$
|w_\mathcal{D} - \bar{w}|^2 \le (2\sqrt{R})^2 = 4R
$$

**Interpretation:** The maximum Euclidean distance between any two points in the ball is at most $2\sqrt{R}$.

### 1.7 Variance Bound

**Prove:** $\text{Variance} \le 4Rs^2$

Rewrite the variance formula:

$$
\begin{aligned}
\text{Variance} &= \frac{1}{N} \sum_{i=1}^N \mathbb{E}_{\mathcal{D}}[(w_{\mathcal{D}}x^{(i)} - \bar{w}x^{(i)})^2] \\
&= \frac{1}{N} \sum_{i=1}^N x^{(i)2}\mathbb{E}_{\mathcal{D}}[(w_{\mathcal{D}} - \bar{w})^2]
\end{aligned}
$$

Using $|w_\mathcal{D} - \bar{w}|^2 \le 4R$:

$$
\begin{aligned}
\text{Variance} &\le \frac{1}{N} \sum_{i=1}^N x^{(i)2} \cdot 4R \\
&= 4R \cdot \frac{1}{N}\sum_{i=1}^N x^{(i)2} \\
&= 4Rs^2
\end{aligned}
$$

**Note:** This bound doesn't depend on $w^*$ or $\epsilon$, but it can be looser than the actual variance value from 1.4.

## Problem 2: Optimal Classifier under Squared Loss (12 pt)

### 2.1 Find the Optimal Classifier

**Goal:** Minimize expected squared error loss:

$$
L = \mathbb{E}_{(x, y)\sim P, D\sim P^N}\left[(h_D(x) - y)^2\right]
$$

**Answer:** $h_{\text{opt}}(x) = \mathbb{E}[y \mid x]$

#### Derivation

Using the law of total expectation:

$$
L = \mathbb{E}_{(x, D)}\left[\mathbb{E}_{y \mid x}[(h_D(x) - y)^2 \mid x]\right]
$$

For fixed $x$ and $D$, expand the inner expectation:

$$
\begin{aligned}
\mathbb{E}_{y \mid x}[(h_D(x) - y)^2 \mid x] &= h_D(x)^2 - 2h_D(x)\mathbb{E}[y \mid x] + \mathbb{E}[y^2 \mid x] \\
&= h_D(x)^2 - 2h_D(x)\mathbb{E}[y \mid x] + \text{Var}(y \mid x) + \mathbb{E}[y \mid x]^2 \\
&= (h_D(x) - \mathbb{E}[y \mid x])^2 + \text{Var}(y \mid x)
\end{aligned}
$$

Thus:

$$
L = \mathbb{E}_{(x, D)}\left[(h_D(x) - \mathbb{E}[y \mid x])^2\right] + \mathbb{E}_x[\text{Var}(y \mid x)]
$$

The second term is independent of $h_D$. To minimize $L$, we minimize the first term by setting:

$$
h_{\text{opt}}(x) = \mathbb{E}[y \mid x]
$$

This is the **conditional mean** or **regression function**.

### 2.2 Find the Optimal Error Rate

**Answer:** $L^* = \mathbb{E}_x[\text{Var}(y \mid x)]$

Plugging $h_{\text{opt}}(x) = \mathbb{E}[y \mid x]$ back into $L$:

$$
\begin{aligned}
L^* &= \mathbb{E}_{(x, D)}\left[(\mathbb{E}[y \mid x] - \mathbb{E}[y \mid x])^2\right] + \mathbb{E}_x[\text{Var}(y \mid x)] \\
&= 0 + \mathbb{E}_x[\text{Var}(y \mid x)] \\
&= \mathbb{E}_x[\text{Var}(y \mid x)]
\end{aligned}
$$

**Interpretation:** This is the **irreducible error** or **Bayes error**. It represents the inherent noise in the data that cannot be reduced by any predictor, as it comes from the variance of $y$ given $x$.

No predictor can achieve error lower than this, as it's determined by the randomness in the labels given the features.

## Problem 3: Model Selection (19 pt)

### 3.1 K-Fold Cross-Validation Implementation

**Task:** Implement k-fold cross-validation to estimate model performance.

**Algorithm:**
1. Split data into $k$ folds using `KFold(n_splits=k, shuffle=True, random_state=42)`
2. For each fold:
   - Use $k-1$ folds for training
   - Use remaining fold for validation
   - Train a copy of the model (using `deepcopy`)
   - Compute validation MSE
3. Return mean and standard deviation of validation errors

**Key Implementation Points:**
- Always create a fresh copy of the model for each fold using `deepcopy(model)`
- Calculate MSE: $\text{MSE} = \frac{1}{n}\sum_{i=1}^n (y_i - \hat{y}_i)^2$
- Return both average and standard deviation for statistical analysis

### 3.2 Model Selection

**Task:** Select best model across polynomial degrees and regularization strengths.

**Search Space:**
- Polynomial degrees: [1, 2, 3, 4, 5, 6, 7, 8]
- Regularization strengths (alpha): [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]

**Models Evaluated:**
1. **Linear Regression:** No regularization
2. **Ridge Regression:** L2 regularization with various $\alpha$ values
3. **Lasso Regression:** L1 regularization with various $\alpha$ values

**Procedure:**
1. For each polynomial degree:
   - Transform features using `PolynomialFeatures(degree)`
   - Standardize using `StandardScaler()`
   - Evaluate Linear Regression
   - Evaluate Ridge with each $\alpha$
   - Evaluate Lasso with each $\alpha$
2. Select model with lowest cross-validation error
3. Return trained model pipeline

## Code Implementation

### K-Fold Cross-Validation (hw4_q3.py)

```python
def cross_validate_model(X, y, model, k_folds=5):
    """
    Perform k-fold cross-validation and return average validation error.

    Args:
        X: Training features (n_samples, n_features)
        y: Training labels (n_samples,)
        model: Sklearn model object
        k_folds: Number of folds for cross-validation

    Returns:
        avg_val_error: Average validation MSE across all folds
        std_val_error: Standard deviation of validation MSE
    """
    val_errors = []
    kf = KFold(n_splits=k_folds, shuffle=True, random_state=42)

    for train_idx, validate_idx in kf.split(X):
        # Clone the model for this fold
        model_clone = deepcopy(model)

        # Split data
        cur_train_x, cur_validate_x = X[train_idx], X[validate_idx]
        cur_train_y, cur_validate_y = y[train_idx], y[validate_idx]

        # Train and evaluate
        model_clone.fit(cur_train_x, cur_train_y)
        y_pred = model_clone.predict(cur_validate_x)
        val_errors.append(np.mean((cur_validate_y - y_pred) ** 2))

    # Calculate statistics
    avg_val_error = np.mean(val_errors)
    std_val_error = np.std(val_errors)

    return avg_val_error, std_val_error
```

### Model Selection (hw4_q3.py)

```python
def select_best_model(X_train, y_train):
    """
    Select the best model using cross-validation.

    Args:
        X_train: Training features
        y_train: Training labels

    Returns:
        returned_best_model: Trained best model pipeline
    """
    degrees = [1, 2, 3, 4, 5, 6, 7, 8]
    alphas = [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]

    cur_best_model = {
        "error": np.inf,
        "model": None,
    }
    best_degree = None

    for degree in degrees:
        # Create polynomial features
        X_poly = create_polynomial_features(X_train, degree)
        scaler = StandardScaler()
        X_poly_scaled = scaler.fit_transform(X_poly)

        # Models to evaluate
        all_models = {
            "Linear": [LinearRegression()],
            "Ridge": [Ridge(alpha=a, random_state=42) for a in alphas],
            "Lasso": [Lasso(alpha=a, random_state=42, max_iter=2000) for a in alphas],
        }

        # Evaluate all models
        for name, models in all_models.items():
            print(f"Evaluating {name} Regression with degree {degree}")
            results = [
                evaluate_model(X_poly_scaled, y_train, model)
                for model in models
            ]
            errors = [result[0] for result in results]
            min_idx = np.argmin(errors)

            # Update best model if needed
            if errors[min_idx] < cur_best_model["error"]:
                cur_best_model["error"] = errors[min_idx]
                cur_best_model["model"] = results[min_idx][1]
                best_degree = degree

    best_model = cur_best_model["model"]
    returned_best_model = ModelPipeline(best_degree, best_model, StandardScaler())

    return returned_best_model

def evaluate_model(X, y, model):
    """Helper function to evaluate a single model"""
    avg_err, std_err = cross_validate_model(X, y, model)
    return avg_err, model
```

## Key Takeaways

### Bias-Variance Tradeoff in Ridge Regression

1. **As $\lambda$ increases:**
   - Bias increases (predictor moves away from true $w^*$)
   - Variance decreases (predictions become more stable)

2. **Optimal $\lambda$:**
   - Balances bias and variance
   - Found through cross-validation
   - Different for each dataset

3. **Variance Bounds:**
   - Regularization provides distribution-free bounds
   - Actual variance depends on data, noise, and true parameters

### Optimal Predictors

1. **Under squared loss:**
   - Optimal predictor is conditional mean: $h^*(x) = \mathbb{E}[y \mid x]$
   - Irreducible error is conditional variance: $\mathbb{E}_x[\text{Var}(y \mid x)]$

2. **Implications:**
   - No predictor can beat the Bayes error
   - Focus on approximating conditional mean well
   - Understand sources of irreducible noise

### Model Selection Best Practices

1. **Cross-validation:**
   - Provides unbiased estimate of generalization error
   - K-fold balances bias and variance of error estimate
   - Must use independent folds (no data leakage)

2. **Hyperparameter tuning:**
   - Search over multiple dimensions (degree, regularization)
   - Use validation set to select, test set to evaluate
   - Report both mean and variance of CV scores

3. **Model complexity:**
   - Higher polynomial degrees increase model capacity
   - Regularization controls effective complexity
   - Goal is to match model complexity to data complexity
