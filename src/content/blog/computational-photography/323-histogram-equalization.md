---
categories:
- Computational Photography
- lectures
createdAt: '2025-10-10'
description: '- Reassign values so that the number of pixels with each values is more
 evenly distributed'
tags:
- lectures
- Computational Photography
title: 8. Histogram Equalization
---
# 3.2.3 Histogram Equalization

## Histogram Equalization

- Reassign values so that the number of pixels with each values is more evenly distributed

### Histogram

- a count of how many pixels with the same value

$$
h_i = \sum_{j \in pixels} 1 (p_j = i)
$$

### Cumulative histogram

- a count of number of pixels less than or equal to each value

$$
c_i = c_{i - 1} + h_i
$$

### Example

![Screenshot 2025-10-10 at 10.40.56](/blog/323-histogram-equalization/0CmFFFHZ-Screenshot_2025-10-10_at_10.40.56.webp)

## Histogram Equalization

![clipboard.png](/blog/323-histogram-equalization/9HRn4SRO-clipboard.webp)

- The original intensity is culstered on the left and right sides.
- After the equalization, the values are more evenly distributed.

### Algorithm

- Given image with pixel values $0 \le p_i \le 255, j = 0\dots N$

1. Compute cumulative histogram

$$
h(i) = \sum_{j \in pixels} 1(p_j = i) \\
c(i) = c(i - 1) + h(i)
$$

2. Blends between original image and image with equalized histogram

$$
f(i) = \alpha \frac{c(i)}{N} \cdot 255 + (1 - \alpha) \cdot i
$$

- $\alpha:$ balancing factor
- $\frac{c(i)}{N}:$ the percentile of the pixel

## Locally weighted histograms

- Compute cumulative histograms in non-overlapping M x M grid
- For each pixel, interpolate between the histograms from the four nearest grid cells

![Screenshot 2025-10-10 at 10.57.14](/blog/323-histogram-equalization/4s3eQ-gx-Screenshot_2025-10-10_at_10.57.14.webp)

![Screenshot 2025-10-10 at 10.58.55](/blog/323-histogram-equalization/rJm60bpU-Screenshot_2025-10-10_at_10.58.55.webp)
![Screenshot 2025-10-10 at 11.04.49](/blog/323-histogram-equalization/zyxd7qWm-Screenshot_2025-10-10_at_11.04.49.webp)

- The green dots show the result of the equalization without using the original value

![Screenshot 2025-10-10 at 11.06.39](/blog/323-histogram-equalization/7-I5TOYH-Screenshot_2025-10-10_at_11.06.39.webp)
- The red dots show the result of the equalization using the original value
> [!CAUTION]
>
> Gamma adjustment would not be great in this case, cuz we need to stretch the image out
