---
categories:
- System
createdAt: '2025-08-25'
description: '- Easy to store with bitsable elements'
tags:
- System
title: 2's Complement and Binary Operations
---

# 2's Complement and Binary Operations

## Why bits?

- Easy to store with bitsable elements
- Reliably transmitted on noisy and inaccurate wires
![Screenshot 2025-08-25 at 13.30.19](/blog/2s-complement-and-binary-operations/aZuLtY---Screenshot_2025-08-25_at_13.30.19.webp)

## Data Representations in C

| C Data Type | 32-bit | 64-bit | x86-64 |
| ------------- | ------ | ------ | ------ |
| `char` | 1 | 1 | 1 |
| `short` | 2 | 2 | 2 |
| `int` | 4 | 4 | 4 |
| `long` | 4 | 8 | 8 |
| `float` | 4 | 4 | 4 |
| `double` | 8 | 8 | 8 |
| `long double` | \_ | \_ | 10/16 |
| `pointer` | 4 | 8 | 8 |

## Boolean Operations

![Screenshot 2025-08-25 at 13.59.18](/blog/2s-complement-and-binary-operations/ILYk7QUj-Screenshot_2025-08-25_at_13.59.18.webp)

### In C

```c
c = a & b; // and
c = a | b; // or
c = a ^ b; // xor
c = ~a; // complement
```

### Representing and Manipulating Sets

- `01101001`: `{1, 2, 4, 7}`

### Shift Operations

