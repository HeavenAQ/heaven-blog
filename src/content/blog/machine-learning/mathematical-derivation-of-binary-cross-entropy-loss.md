---
categories:
- Machine Learning
- reading materials
createdAt: '2025-09-30'
description: 'For a single training example:'
tags:
- reading materials
- Machine Learning
- Machine Learning
- AI
title: Mathematical Derivation of Binary Cross-Entropy Loss
---

# Mathematical Derivation of Binary Cross-Entropy Loss

## 1. The Cost Function (Binary Cross-Entropy)

For a single training example:

$$L(y, \hat{y}) = -[y \cdot \log(\hat{y}) + (1-y) \cdot \log(1-\hat{y})]$$

For $m$ training examples, the cost function is the average:

$$J(w,b) = -\frac{1}{m} \sum_{i=1}^{m} [y^{(i)} \cdot \log(\hat{y}^{(i)}) + (1-y^{(i)}) \cdot \log(1-\hat{y}^{(i)})]$$

Where:

- $y \in \{0, 1\}$ is the true label
- $\hat{y} = \sigma(z)$ is the predicted probability
- $z = w^T x + b$ is the linear combination
- $\sigma(z) = \frac{1}{1 + e^{-z}}$ is the sigmoid function

## 2. The Forward Pass

$$z = w^T x + b$$

$$\hat{y} = \sigma(z) = \frac{1}{1 + e^{-z}}$$

## 3. Derivative of Sigmoid

First, let's derive the sigmoid derivative (we'll need this):

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

$$\frac{d\sigma}{dz} = \frac{d}{dz}\left[\frac{1}{1 + e^{-z}}\right]$$

$$= -(1 + e^{-z})^{-2} \cdot (-e^{-z})$$

$$= \frac{e^{-z}}{(1 + e^{-z})^2}$$

$$= \frac{1}{1 + e^{-z}} \cdot \frac{e^{-z}}{1 + e^{-z}}$$

$$= \sigma(z) \cdot [1 - \sigma(z)]$$

**Key result:**

$$\boxed{\frac{d\sigma}{dz} = \sigma(z) \cdot (1 - \sigma(z)) = \hat{y} \cdot (1 - \hat{y})}$$

## 4. Derivative of Cost w.r.t. $\hat{y}$

Now let's find $\frac{\partial L}{\partial \hat{y}}$ for a single example:

$$L = -[y \cdot \log(\hat{y}) + (1-y) \cdot \log(1-\hat{y})]$$

$$\frac{\partial L}{\partial \hat{y}} = -\left[y \cdot \frac{1}{\hat{y}} + (1-y) \cdot \frac{1}{1-\hat{y}} \cdot (-1)\right]$$

$$= -\left[\frac{y}{\hat{y}} - \frac{1-y}{1-\hat{y}}\right]$$

$$= -\frac{y(1-\hat{y}) - \hat{y}(1-y)}{\hat{y}(1-\hat{y})}$$

$$= -\frac{y - y\hat{y} - \hat{y} + y\hat{y}}{\hat{y}(1-\hat{y})}$$

$$= -\frac{y - \hat{y}}{\hat{y}(1-\hat{y})}$$

$$= \frac{\hat{y} - y}{\hat{y}(1-\hat{y})}$$

**Key result:**

$$\boxed{\frac{\partial L}{\partial \hat{y}} = \frac{\hat{y} - y}{\hat{y}(1-\hat{y})}}$$

## 5. Chain Rule: $\frac{\partial L}{\partial z}$

Now apply the chain rule:

$$\frac{\partial L}{\partial z} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial z}$$

$$= \frac{\hat{y} - y}{\hat{y}(1-\hat{y})} \cdot \hat{y}(1-\hat{y})$$

$$= \hat{y} - y$$

**This is the beautiful simplification!** The $\hat{y}(1-\hat{y})$ terms cancel out perfectly.

**Key result:**

$$\boxed{\frac{\partial L}{\partial z} = \hat{y} - y}$$

## 6. Gradient w.r.t. Weights

Using the chain rule again:

$$\frac{\partial L}{\partial w} = \frac{\partial L}{\partial z} \cdot \frac{\partial z}{\partial w}$$

Since $z = w^T x + b$, we have $\frac{\partial z}{\partial w} = x$

$$\frac{\partial L}{\partial w} = (\hat{y} - y) \cdot x$$

For $m$ examples:

$$\frac{\partial J}{\partial w} = \frac{1}{m} \sum_{i=1}^{m} (\hat{y}^{(i)} - y^{(i)}) \cdot x^{(i)}$$

$$= \frac{1}{m} X^T (\hat{y} - y)$$

**Result:**

$$\boxed{dw = \frac{1}{m} X^T (\hat{y} - y)}$$

## 7. Gradient w.r.t. Bias

Similarly:

$$\frac{\partial L}{\partial b} = \frac{\partial L}{\partial z} \cdot \frac{\partial z}{\partial b}$$

$$= (\hat{y} - y) \cdot 1$$

$$= \hat{y} - y$$

For $m$ examples:

$$\frac{\partial J}{\partial b} = \frac{1}{m} \sum_{i=1}^{m} (\hat{y}^{(i)} - y^{(i)})$$

**Result:**

$$\boxed{db = \frac{1}{m} \sum_{i=1}^{m} (\hat{y}^{(i)} - y^{(i)})}$$

## Summary

The final gradient formulas are remarkably simple:

$$\text{error} = \hat{y} - y$$

$$dw = \frac{1}{m} X^T \cdot \text{error}$$

$$db = \frac{1}{m} \sum \text{error}$$

```python
error = y_pred - y
dw = (1/m) * X.T @ error
db = (1/m) * np.sum(error)
```

The key insight is that **binary cross-entropy loss paired with sigmoid activation produces this clean gradient** because the derivative of the sigmoid function $\hat{y}(1-\hat{y})$ cancels with the denominator from the cross-entropy derivative.

This is one reason why cross-entropy is preferred over MSE for classification—the gradients are cleaner and don't suffer from the vanishing gradient problem that MSE + sigmoid would have!

## Derivation: From Log-Likelihood to Cost Function

### Step 1: Start with Log-Likelihood (Maximization)

$$\log P(y | X, w) = \sum_{i=1}^{N} \log P(y^{(i)} | x^{(i)}, w)$$

$$= \sum_{i=1}^{N} \log \sigma(y^{(i)} w^T x^{(i)})$$

Gradient (for ascent):
$$\nabla_w \log P(y|X,w) = X(\sigma(-y \odot Xw) \odot y)$$

### Step 2: Define Cost as Negative Log-Likelihood

To convert to a **minimization** problem:

$$J(w) = -\log P(y | X, w)$$

$$= -\sum_{i=1}^{N} \log \sigma(y^{(i)} w^T x^{(i)})$$

### Step 3: Take Gradient of Cost Function

$$\nabla_w J(w) = -\nabla_w \log P(y|X,w)$$

$$= -X(\sigma(-y \odot Xw) \odot y)$$

### Step 4: Gradient Descent Update Rule

$$w_{t+1} = w_t - \alpha \nabla_w J(w)$$

$$= w_t - \alpha \cdot [-X(\sigma(-y \odot Xw) \odot y)]$$

$$= w_t + \alpha X(\sigma(-y \odot Xw) \odot y)$$

## Wait, That's the Same as Gradient Ascent!

Yes! Because:

$$\text{Gradient Descent on } (-\log P) = \text{Gradient Ascent on } (\log P)$$

They're mathematically identical operations.

## Converting to Standard Form

To get the familiar $X^T(\hat{y} - y)$ form, you need to work through the algebra. Let me show you:

For binary classification with $y \in \{0, 1\}$:

$$\log P(y^{(i)} | x^{(i)}, w) = y^{(i)} \log(\hat{y}^{(i)}) + (1 - y^{(i)}) \log(1 - \hat{y}^{(i)})$$

Where $\hat{y}^{(i)} = \sigma(w^T x^{(i)})$

So the negative log-likelihood is:

$$J(w) = -\sum_{i=1}^{N} [y^{(i)} \log(\hat{y}^{(i)}) + (1 - y^{(i)}) \log(1 - \hat{y}^{(i)})]$$

Taking the gradient (as I showed in my earlier derivation):

$$\nabla_w J(w) = \frac{1}{N} X^T(\hat{y} - y)$$

## Gradient Descent Update

$$w_{t+1} = w_t - \alpha \nabla_w J(w)$$

$$\boxed{w_{t+1} = w_t - \frac{\alpha}{N} X^T(\hat{y} - y)}$$

## Summary Table

| Framework | Objective | Gradient | Update Rule |
| -------------------------------------- | ---------------------- | --------------------------------- | ----------------------------------------- |
| **Log-Likelihood (Maximize)** | $\max \log P(y\|X,w)$ | $X(\sigma(-y \odot Xw) \odot y)$ | $w \leftarrow w + \alpha \nabla \log P$ |
| **Negative Log-Likelihood (Minimize)** | $\min -\log P(y\|X,w)$ | $-X(\sigma(-y \odot Xw) \odot y)$ | $w \leftarrow w - \alpha \nabla(-\log P)$ |
| **Cross-Entropy Cost (Minimize)** | $\min J(w)$ | $\frac{1}{N}X^T(\hat{y} - y)$ | $w \leftarrow w - \alpha \nabla J$ |

All three approaches are **mathematically equivalent** and will converge to the same solution!

The cross-entropy form is most common in practice because:

1. The gradient formula $X^T(\hat{y} - y)$ is very clean
2. It's easier to interpret as "error times features"
3. It generalizes nicely to multi-class problems
