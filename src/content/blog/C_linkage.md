---
title: 'C Variable Scope'
description: "Let's talk about how C handles variable scope"
pubDate: '2023-04-09'
heroImage: '/placeholder-hero.jpg'
---

# Storage Class

## auto

_automatically return the memory_

-   An auto variable has automatic storage duration, block scope and no linkage

## static

_limits the scope of a variable_

-   a `static` variable is initialized only once, prior to program execution
-   A `static` variable declared inside a function is shared by all calls function, including recursive calls.
-   A function may return a pointer to a `static` variable.

> **Note:**  
> `static` variables have `0` as default values.  
> `auto` variables do not have default values.

```c
static int i; // no access to i in other files

void f1(void){
  //has access to i
}

void f2(void){
  //has access to i
}
```

-   use `static` for reasons of efficiency:

```c
char digit_to_hex_char(int digit){
  static const char hex[] = "123456789ABCDEF";
  return hex;
}
```

## extern

_tells the compiler the definition is somewhere else_

-   **NOT** a _definition_ since it does not allocate memory space

```c
extern int i; // not a definition
extern int i = 0; // definition

// the following two declarations are as effective
extern int i = 0;
int i = 0;

extern int i; // static storage duration, file scope, ? linkage
void f(void){
  extern int i; // static stroage duration, block scope, ? linkage
}
```

-   if the variable is previously declared as `static`, the linkage will be internal
-   otherwise, `external`

---

## register

_tells the compiler the variable will be frequently used. put it in register_

-   the `register` storage class is legal only for variables declared in a block
-   a `register` variable has the same storage duration, scope, and linkage as an auto variable.
-   since registers don't have addresses, it's illegal to use the `&` operator to take the address of a `register` variable

> **NOTE:**
>
> -   Nowadays, compiler could usually do a better job when it optimizes your program
> -   Still, you can use register to prevent the value changed by pointer

```c
extern const unsigned long int a[10];
const	char month[];
```

# Every variable in a C program has three properties:

-   Storage
-   Scope
-   Linkage

# Storage Duration

-   **Automatic storage duration**
    -   Memory for variable is allocated when the surrounding block isexecuted and deallocated when the block terminal
-   **Static storage duration**

> NOTE:
> When you declare a `static variable` inside a function, you change the storage duration of the variable

# Scope

-   Local Scope
-   File Scope

# Linkage

-   **External Linkage**
    -   the entire program
    -   over several files
-   **Internal Linkage**
    -   within a single file
-   **No Linkage**
    -   within a function (local var)

```c
int i; // static storage duration, file scope, external linkage

void f(void){
  int j; // automatic storage duration, block scope, no linkage
}
```

> **NOTE:**
>
> -   Variables declared _inside a block_ have
>     _automatic storage duration, block scope and no
>     linkage_
> -   Variables declared _outside a block_ have _static
>     storage duration, file scope, and external linkage_

# Summary

```c
int a;
extern int b;
static int c;

void f(int d, register int e){
  auto int g;
  int h;
  static int i;
  extern int j;
  register int k;
}
```

| Name | Storage Duration | Scope | Linkage  |
| :--: | :--------------: | :---: | :------: |
|  a   |      static      | file  | external |
|  b   |      static      | file  |   `*`    |
|  c   |      static      | file  | internal |
|  d   |    automatic     | block |   none   |
|  e   |    automatic     | block |   none   |
|  g   |    automatic     | block |   none   |
|  h   |    automatic     | block |   none   |
|  i   |      static      | block |   none   |
|  j   |      static      | block |   `*`    |
|  k   |    automatic     | block |   none   |

> **NOTE:**  
> `*` means that the definition of the variable is somewhere else. Therefore, there linkages are unknown here.

# Type Qualifiers

## const

-   the following code is **invalid** since the length of an array needs defining during the compile time.
-   Use macro in this case

```c
const int n = 10;
int a[n]; // WRONG
```

## volatile

_do not optimize a variable_

-   tells the compiler that the variable may change unexpectedly, since it may changed due to factors outside the control of the program
    _e.g._
    -   hardware registers
    -   memory-mapped I/O
    -   other types of memory-mapped hardware

```c
// if not using the word volatile, the compiler may kill the procedure of checking whether the flag is set.

volatile int flag;

void do_something() {
    while (!flag) {
        // Wait for flag to be set
    }
    // Do something once flag has been set
}
```

## restrict

_pointer is not aliased_

-   tells compiler that an object is the only that a pointer can points to
-   compiler will know that the pointer is not aliased.

    -   _aliased_: two pointers pointing to the same object

    ```c
    int x = 0;
    int *p1 = &x;
    int *p2 = &x;
    ```

-   tells the compiler to do optimization
-   **However** compiler will not check whether a pointer is aliased or not. You need to ensure that yourself.

```c
void copy_data(int *restrict dst, const int *restrict src, size_t n) {
    for (size_t i = 0; i < n; i++) {
        dst[i] = src[i];
    }
}
```

# Declarators

```c
// an array of 10 pointers
int *ap[10];

// an array of pointers to function taking nothing returning pointer to int
int *(*x[10])(void);

// an pointer to function taking int returning nothing
void (*pf)(int val);
```

# Inline Functions

-   Normal Function
    -   jump to the first instruction in the function
    -   the overhead may be huge
    -

# C can't

-   return arrays
-   return functions
-   return array of functions
