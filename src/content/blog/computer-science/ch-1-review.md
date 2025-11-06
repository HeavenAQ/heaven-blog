---
categories:
- Compiler
createdAt: '2024-05-30'
description: '*7 steps*'
tags:
- Compiler
title: CH-1 Review
---

# CH-1 Review


## What is compiling process?
*7 steps*

1. **Lexical Analysis**
2. **Syntactical Analysis**
3. **Interpretation**
4. **Machine Independent Optimization**
5. **Storage Assignment**
6. **Code Generation**
7. **Assembly Output**

> [!IMPORTANT]
> - Steps 1 - 4 are machine independent _**Analysis**_ 
> - Steps 5 - 7 are machine dependent _**Synthesis**_

### Syntactical Analysis

- Use parsing tree to analyze the order of the expression
- Decide the order of execution

> [!IMPORTANT]
> **Order of execution:**
> - operator precedence
> - association

### Semantic Analysis

- Type checking 
- Type conversion


> [!NOTE]
> **Cross Compiler**
> 
> It is a kind of compiler that produces object codes compilers on other machines to compile

## Analysis

- Break source code into pieces
- generate intermediate code as the representation of the source code

## Synthesis

- Based on the intermediate code, generate the target code

## Syntax Tree

- e.g. `position:= initial + rate * 60`

```bash
:=
 / \
 / \
position +
 / \
 / \
 initial *
 / \
 / \
 rate 60
```

## How does a program get compiled and executed?

1. Preprocessing
2. Compiling
3. Assembling
4. Linking
5. Loading

## Phase of Analysis

### Lexical Analysis

- Parse the source code into tokens
- e.g. `position:= initial + rate * 60` -> `position`, `:=`, `initial`, `+`, `rate`, `*`, `60`

### Hierarchical Analysis

- Tokens are put together into a nested structure with collective meanings

### Semantic Analysis

- Perform certain checks to ensure the components put together are meaningful

![Screenshot 2024-05-30 at 17.16.03](/blog/ch-1-review/2gQjnmfX-IHK-cDSXc-Screenshot_2024-05-30_at_17.16.03.webp)
