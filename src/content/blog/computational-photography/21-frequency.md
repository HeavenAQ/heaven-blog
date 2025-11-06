---
categories:
- Computational Photography
- lectures
createdAt: '2025-09-01'
description: $$
tags:
- lectures
- Computational Photography
title: 2.1 Frequency
---

# 2.1 Frequency

## A sum of sines

### Building blocks:

$$
Asin(\omega x + \phi)
$$

## Frequency Spectra

### Example

$$
g(t) = sin(2\pi f t) + \frac{1}{3}sin(2\pi(3f)t)
$$

![clipboard.png](/blog/21-frequency/qoEGfNkz-clipboard.webp)

### How to construct a square wave

![clipboard.png](/blog/21-frequency/D2X4v5Gg-clipboard.webp)

- Add enough of these signals `at decreasing amplitudes` as you `increase` the `frequency` of this sinusoid. Then, the sum of signals converges to a `square wave`

 $$
 A\sum_{k = 1}^{\infty} \frac{1}{k} sin(2 \pi k t)
 $$

## Fourier Analysis in Images

![clipboard.png](/blog/21-frequency/0NDviGi4-clipboard.webp)

## Fourier Transform

- Fourier transform stores the `amplitude` and `phase` at `each frequency`

 - `Amplitude`: encodes the number of signals at a particular frequency
 - `Phase`: encodes spatial information

![clipboard.png](/blog/21-frequency/pAIUkPI8-clipboard.webp)

---

### 1. Amplitude Formula

$$
A = \pm \sqrt{R(\omega)^2 + I(\omega)^2}
$$

**where:**

- $R(\omega)$: the **real part** of a complex function (often a Fourier transform).

- $I(\omega)$: the **imaginary part**.

- $R(\omega) + iI(\omega)$: a complex number representing a signal at frequency $\omega$.

#### $\bullet$ Amplitude on Cosine Wave

```python
# Time vector
t = np.linspace(0, 2*np.pi, 500)

# Parameters
omega = 1.0 # frequency
phi = np.pi/4 # fixed phase

# Different amplitudes
A1 = 0.5
A2 = 1.0
A3 = 1.5

# Signals
y1 = A1 * np.cos(omega*t + phi)
y2 = A2 * np.cos(omega*t + phi)
y3 = A3 * np.cos(omega*t + phi)

# Plot
plt.figure(figsize=(8,5))
plt.plot(t, y1, label=r'$A = 0.5$', linewidth=2)
plt.plot(t, y2, label=r'$A = 1.0$', linewidth=2)
plt.plot(t, y3, label=r'$A = 1.5$', linewidth=2)
```

![clipboard.png](/blog/21-frequency/iAjjwpnS-clipboard.webp)

> [!NOTE]
> The amplitude (or **magnitude**) is just the length of this complex number in the complex plane. 
> **Pythagorean theorem:**
>
> $$
> |R + iI| = \sqrt{R^2 + I^2}
> $$

---

### 2. Phase Formula

$$
\phi = \tan^{-1}\!\left(\frac{I(\omega)}{R(\omega)}\right)
$$

- The **phase angle** describes how much the sinusoidal signal is shifted horizontally relative to a cosine (or sine).

- In the complex plane, the phase is the angle made by $(R(\omega), I(\omega))$ vector with the positive real axis.

#### $\bullet$ Shift on Cosine Wave

```python
# Time vector
t = np.linspace(0, 2*np.pi, 500)

# Parameters
A = 1.0 # amplitude
omega = 1.0 # frequency

# Different phases
phi1 = 0
phi2 = np.pi/4 # 45 degrees
phi3 = np.pi/2 # 90 degrees

# Signals
y1 = A * np.cos(omega*t + phi1)
y2 = A * np.cos(omega*t + phi2)
y3 = A * np.cos(omega*t + phi3)

# Plot
plt.figure(figsize=(8,5))
plt.plot(t, y1, label=r'$\phi = 0$', linewidth=2)
plt.plot(t, y2, label=r'$\phi = \pi/4$', linewidth=2)
plt.plot(t, y3, label=r'$\phi = \pi/2$', linewidth=2)
```

![clipboard.png](/blog/21-frequency/jXR2CDcp-clipboard.webp)

> [!NOTE]
> In practice, we often use `atan2(I, R)` instead of, because `atan2` takes into account which quadrant the point lies in (avoiding sign ambiguities).

---

### 3. Euler’s Formula

$$
e^{i\theta} = cos(\theta) + isin(\theta)
$$

- Exponentials with imaginary exponents represent **rotations** in the complex plane.

- The real part gives a `cosine`, and the imaginary part gives a `sine`.

So when we write:

$$
Ae^{i\phi} = R(\omega) + iI(\omega)
$$

- $A$: the amplitude (the radius in the complex plane),

- $\phi$: the phase (the angle).

> [!TIP]
> The derivation is shown in [Euler's Formula](inkdrop://note/GJYsjN3w)

---

## Integration and Fourier Transform

> [!IMPORTANT]
> Imaginary number $i$ is presented with $j$ due to mathematical convention

### $\bullet$ General Form

$$
H(\omega) = \mathcal{F}\{h(x)\} = Ae^{j\phi}
$$

- $\mathcal{F}$: Fourier Transform
- $H(\omega)$: **frequency domain**

### $\bullet$ Continuous Fourier Transform (CFT)

_used when $h(x)$ is a **continuous signal**_

$$
H(\omega) = \int_{-\infty}^{\infty} h(x)e^{-j\omega x} dx
$$

- projects the singal onto complex exponentials $e^{-j\omega x}$
- At each frequency $\omega$, it computes **the amount of that frequency** is present in the singal

### $\bullet$ Discrete Fourier Transform (DFT)

_used when $h(x)$ is a **discrete signal**_

$$
H(k) = \frac{1}{N}\sum^{N-1}_{x=0} h(x)e^{-j\frac{2\pi}{N}kx}
$$

where:

- $N$: the number of samples
- $k$: frequency index (integer)
 - $k = -N/2 \dots N/2$
- $e^{-j\frac{2\pi}{N}kx}$ cycles through different frequencies, checking how much of each frequency is present

---

## The Convolution Theorem

1. The Fourier transform of the convolution of two functions is the same as the product of their Fourier transforms

 $$
 \mathcal{F}[g * h] = \mathcal{F}[g] \cdot \mathcal{F}[h]
 $$

2. The inverse Fourier transform of the product of two Fourier transforms is the convolution of the two inverse Fourier transforms

 $$
 \mathcal{F}^{-1}[gh] = \mathcal{F}^{-1}[g] * \mathcal{F}^{-1}[h]
 $$

> [!IMPORTANT]
>
> - **Convolution** in the _spatial domain_ is the same as the **Multiplication** in the _frequency domain_
> - FFT (Fast Fourier Transform) can convert between the spatial domain and frequency domain in $O(N \cdot logN)$ with $N$ being the number of pixels

## Properties of Fourier Transform

- **Linearity**

 $$
 \mathcal{F}[ax(t) + by(t)] = a\mathcal{F}[x(t)] + b\mathcal{F}[y(t)]
 $$

- Fourier transform of a real signal is symmetric about the origin
- The energy of the signal is the same as the energy of its Fourier transform
 - You don't lose information when you convert back and forth between spatial and frequency domains

![clipboard.png](/blog/21-frequency/u2SRMeYq-clipboard.webp)

## Image Frequency Examples

- Frequency $\rightarrow$ changes

![clipboard.png](/blog/21-frequency/COuw2kMn-clipboard.webp)

- Moving horizontally and vertically crosses a lot of edges.

![clipboard.png](/blog/21-frequency/APkVpvbR-clipboard.webp)

- Frequencies are spread evrywhere $\rightarrow$ more rounded

> [!NOTE]
> For city images it's more common to have star shapes, while natural images are tend to be rounded shapes.

![clipboard.png](/blog/21-frequency/z3_TihJ2-clipboard.webp)
![clipboard.png](/blog/21-frequency/SkS8y9vG-clipboard.webp)

## Comparison of filters

![clipboard.png](/blog/21-frequency/vOA66GDJ-clipboard.webp)
![clipboard.png](/blog/21-frequency/Qctyllww-clipboard.webp)

- Gaussian filter $\rightarrow$ selecting for lower frequencies

![clipboard.png](/blog/21-frequency/aYTQc6XK-clipboard.webp)
![clipboard.png](/blog/21-frequency/LgmEZk_i-clipboard.webp)

- Box filter:
 - preserve both low and high frequencies
 - The disjointed range of higher frequencies is also preserved, so it doesn't prove as good of a smoothing effect as a Gaussian

### Mixing Images

![clipboard.png](/blog/21-frequency/mulYhfYR-clipboard.webp)
![clipboard.png](/blog/21-frequency/u7IVZQe8-clipboard.webp)

## Sampling

- Why does a lower resolution image still make sense to use?
 - Images are typically smooth, and sampling cuts off high frequencies, which are not that many in a image
 - We can thus shrink an image without losing a lot of information

![clipboard.png](/blog/21-frequency/8g1eJZo--clipboard.webp)

## Aliasing Problem

- Sub-sampling may be dangerous as **characteristic errors may appear**

![clipboard.png](/blog/21-frequency/GMP0C9k6-clipboard.webp)

- We create an artifact that's not in the original signal

## Nyquist-Shannon Sampling Theorem

- When sampling a signal at discrete intervals, the sampling frequency must be $\ge 2 \times f_{max}$
 - $f{max}$: max frequency of the input signal
- This allows a reconstruction of the original image

![clipboard.png](/blog/21-frequency/SYa6zb4x-clipboard.webp)

### Solution (Anti-aliasing)

- Sample more often
- Get rid of all frequencies that are greater than half of the new sampling frequencies
 - lose some high frequencies information but it's better than aliasing

$$
Image \underbrace\rightarrow_{\text{gaussian filter}} \text{Low-pass filtered Image} \underbrace\rightarrow_{\text{sample}} \text{Low-res Image}
$$

```python
import numpy as np
from scipy.ndimage import gaussian_filter

# 1. Start with image(h, w)
# Let's assume `image` is a NumPy array of shape (h, w)

# 2. Apply low-pass filter (Gaussian blur)
im_blur = gaussian_filter(image, sigma=1) # fspecial('gaussian', 7, 1) ≈ Gaussian with σ=1

# 3. Sample every other pixel
im_small = im_blur[::2,::2]
```

![clipboard.png](/blog/21-frequency/hv55AzC7-clipboard.webp)

![clipboard.png](/blog/21-frequency/RPr_XOUA-clipboard.webp)
![clipboard.png](/blog/21-frequency/7DU9D04D-clipboard.webp)

## Hybrid Image in FFT

![clipboard.png](/blog/21-frequency/chvj_cql-clipboard.webp)

- When we're **close to the image**, the **higher frequencies dominate** our perception, so we observe them much more readily
- When we're **further away**, high frequencies are smoothed out and we can only observe the **low passed image**
