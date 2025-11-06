---
categories:
- System
createdAt: '2025-10-03'
description: '```'
tags:
- System
title: Makefile
---

# Makefile

## Assignment Operators

### Lazy Set

```
VARIABLE = value
```

- `VARIABLE` is recursively expanded whenever it is used

### Immediate Set

```
VARIABLE:= value
```

- `VARIABLE` is expanded once at declaration

### Lazy Set if Absent

```
VARIABLE?= value
```

- Setting of a variable only if it doesn't ahve a value
- value is always evaluated as follows:

```
ifeq($(origin VARIABLE), undefined)
 VARIABLE = value
endif
```

### Append

```
VARIABLE += value
```

- Appending the supplied value to theexisting value (or setting to that value if the variable didn't exist)
