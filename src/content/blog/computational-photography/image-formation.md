---
categories:
- Computational Photography
- reading materials
createdAt: '2025-09-14'
description: $$
tags:
- reading materials
- Computational Photography
title: 'Lab: Image Formation'
---
# Image Formation

## Pinhole Camera

### Components

![clipboard.png](/blog/image-formation/hQ6-Coy7-clipboard.webp)

### Mathematical Perspective

![clipboard.png](/blog/image-formation/93TUNEDR-clipboard.webp)

## Perspective Projection

$$
\begin{align*}
\vec{P} &= \frac{X}{Z} = -\frac{x}{f} \\
 &\Rightarrow x = -\frac{fX}{Z}
\end{align*}
$$

![clipboard.png](/blog/image-formation/eRgmAYLe-clipboard.webp)

### Effect of it

- Assume there are 2 line segments defined by $(-5, Z)$ and $(5, Z)$
- $Z$ ranges from $10$ to $1000$ (distance from aperture to the real-world object)
- $f = 1$

```python
# predefined params
X1 = -5
X2 = 5
Z = np.linspace(10, 1000, 990)
f = 1

# two lines
x1 = -(f * X1) / Z
x2 = -(f * X2) / Z

# plot the distance between two lines as Z increases
plt.plot(Z, np.abs(x1 - x2))
plt.show()

```

![clipboard.png](/blog/image-formation/4xf3vZMg-clipboard.webp)

> [!IMPORTANT]
> 2 lines get closer to each other when the distance between the aperture and the real-world coordinate increases
>
>![clipboard.png](/blog/image-formation/3jM0c-Y8-clipboard.webp)
