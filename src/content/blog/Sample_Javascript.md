---
title: 'Javascript'
description: 'Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.'
pubDate: 'Jul 01 2022'
heroImage: '/placeholder-hero.jpg'
updatedDate: 'Jul 03 2022'
categories: ['Programming', 'JavaScript']
tags: ['this', 'methods', 'arrow functions', 'event listeners']
---

## This keyword

_points to the owner of a function_

-   the value of it is **not static**
-   it depends on how the function is called

---

#### Methods

_this = object that is calling the method_

```javascript
const jonas = {
    name: 'Jonas',
    year: 1989,
    calcAge: function () {
        return this.year - 1911
    }
}
jonas.calcAge() // 1989 - 1911;
```

#### Simple Function Call

_this = undefined (use strict)_

```js
function hiThere() {
    const age = 10
    console.log(this.age) //undefined
}
```

#### Arrow Function

_this = the outer lexical scope of the function (lexical this)_

```js
const calcAge = () => {
    console.log(this)
}
calcAge() //window (in browser)
```

#### Event Listener

_this = DOM element that the handler is attached to_

> NOTE
> This does NOT point to the function itself, or the variable evironment.
