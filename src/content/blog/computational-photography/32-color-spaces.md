---
categories:
- Computational Photography
- lectures
createdAt: '2025-10-20'
description: '**RGB** stands for **Red–Green–Blue**, an **additive color model** used
 in displays, cameras, and digital imaging.'
tags:
- lectures
- Computational Photography
title: 14. Color Spaces
---
# 3.2 Color Spaces

# Color Spaces Overview

## **1. RGB Color Space**

### **Definition**

**RGB** stands for **Red–Green–Blue**, an **additive color model** used in displays, cameras, and digital imaging.
Each pixel’s color is expressed as a combination of the three primary light intensities:

$$
\text{Color} = (R, G, B), \quad R,G,B \in [0, 255]
$$

### **Key Concepts**

- Based on **additive color mixing** — combining red, green, and blue light yields all visible colors.
- Examples:

 - $(255, 0, 0)$ → Red
 - $(0, 255, 0)$ → Green
 - $(0, 0, 255)$ → Blue
 - $(255, 255, 255)$ → White
 - $(0, 0, 0)$ → Black

### **Characteristics**

- **Device-dependent**: same RGB values can appear different across devices.
- **Not perceptually uniform**: brightness and color hue are mixed in the same space.

### **Applications**

- Image display, digital photography, computer graphics, rendering pipelines.

---

## **2. HSV Color Space**

### **Definition**

**HSV** (Hue–Saturation–Value) reformulates RGB into a model that aligns more closely with **human perception**.

$$
\text{Color} = (H, S, V)
$$

### **Components**

- **H (Hue):** type of color, represented as an angle on a color wheel $[0^\circ, 360^\circ)$

 - 0° = Red, 120° = Green, 240° = Blue

- **S (Saturation):** color intensity or purity $(0 \text{ = gray}, 1 \text{ = vivid})$
- **V (Value or Brightness):** lightness level $(0 \text{ = black}, 1 \text{ = full brightness})$

### **Conversion (conceptual)**

$$
V = \max(R, G, B)
$$

$$
S = \frac{V - \min(R, G, B)}{V}
$$

$$
H = f(R, G, B) \quad (\text{depends on which channel is maximum})
$$

### **Characteristics**

- Separates chromatic content (H, S) from brightness (V).
- More intuitive for selecting and adjusting colors.
- Not perceptually uniform — equal distances do not equal equal visual differences.

### **Applications**

- Color selection tools (e.g., Photoshop, color pickers)
- Image segmentation and object tracking (using hue thresholding)

---

## **3. YCbCr Color Space**

### **Definition**

**YCbCr** is a **luminance–chrominance** color model used primarily in **digital video, compression, and broadcasting**.
It separates brightness information from color information.

### **Components**

- **Y:** Luma (brightness)
- **Cb:** Blue-difference chroma component
- **Cr:** Red-difference chroma component

### **Transformation (BT.601 standard)**

$$
\begin{align*}
&\begin{bmatrix}
Y \ Cb \ Cr
\end{bmatrix} \\
&=
\begin{bmatrix}
0.299 & 0.587 & 0.114 \\
-0.169 & -0.331 & 0.5 \\
0.5 & -0.419 & -0.081
\end{bmatrix}
\begin{bmatrix}
R \ G \ B
\end{bmatrix}
+
\begin{bmatrix}
0 \ 128 \ 128
\end{bmatrix}
\end{align*}
$$

### **Key Concepts**

- $Y$ carries the **luminance** — most important to human vision.
- $Cb, Cr$ carry **chroma** — can be stored at lower resolution (chroma subsampling).
- Exploits the fact that human eyes are more sensitive to brightness than color detail.

### **Applications**

- JPEG and MPEG compression
- Broadcast television formats (e.g., YUV)
- Digital cameras and video codecs

---

## **4. CIELAB (Lab) Color Space**

### **Definition**

**CIELAB** (often just **Lab**) is a **perceptually uniform** color space defined by the **CIE** (International Commission on Illumination).
Equal distances in Lab roughly correspond to equal perceived color differences.

### **Components**

- **$L^*$:** Lightness (0 = black, 100 = white)
- **$a^*$:** Green–Red axis (negative = green, positive = red)
- **$b^*$:** Blue–Yellow axis (negative = blue, positive = yellow)

### **Transformation from CIEXYZ**

Given $(X, Y, Z)$ and reference white $(X_n, Y_n, Z_n)$:

$$
L^* = 116 f\left(\frac{Y}{Y_n}\right) - 16
$$

$$
a^* = 500 \left[f\left(\frac{X}{X_n}\right) - f\left(\frac{Y}{Y_n}\right)\right]
$$

$$
b^* = 200 \left[f\left(\frac{Y}{Y_n}\right) - f\left(\frac{Z}{Z_n}\right)\right]
$$

where

$$
f(t) =
\begin{cases}
t^{1/3}, & t > 0.008856 \
7.787t + \frac{16}{116}, & t \le 0.008856
\end{cases}
$$

### **Key Characteristics**

- **Perceptually uniform:** ΔE distances approximate perceived color differences.
- **Device-independent:** based on human color vision, not display technology.

### **Applications**

- Color correction and matching across devices
- Measuring color differences (ΔE)
- Printing, paint matching, and machine vision

---

## **Comparison Summary**

| Property | **RGB** | **HSV** | **YCbCr** | **CIELAB (Lab)** |
| ------------------------- | -------------------- | --------------------------- | --------------------- | ----------------------------- |
| **Model Type** | Additive light model | Perceptual cylindrical | Luminance–chrominance | Perceptually uniform |
| **Components** | R, G, B | H, S, V | Y, Cb, Cr | L*, a*, b\* |
| **Separates brightness?** | ❌ No | ✅ Partially (V) | ✅ Yes (Y) | ✅ Yes (L\*) |
| **Perceptual uniformity** | ❌ | ❌ | ❌ | ✅ |
| **Device independence** | ❌ | ❌ | ❌ | ✅ |
| **Common uses** | Displays, graphics | Color editing, segmentation | Compression, video | Color measurement, correction |
| **Human interpretation** | Low | High | Low | Very high |

---

## **Conceptual Summary**

- **RGB** → How screens _create_ color (device-based, additive).
- **HSV** → How humans _perceive and describe_ color intuitively.
- **YCbCr** → How images _store_ color efficiently for compression.
- **Lab** → How humans _compare and measure_ color perceptually.
