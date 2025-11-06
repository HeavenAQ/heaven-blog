---
categories:
- Frontend
- React
createdAt: '2025-08-07'
description: '- `if` `&&` and `?:` operators can be used to render JSX conditionally.'
tags:
- Web
- JavaScript
- React
- Development
- Frontend
title: Conditional Rendering
---

# Conditional Rendering

- `if` `&&` and `?:` operators can be used to render JSX conditionally.

## Starter Code

```ts
function Item({ name, isPacked }) {
 return <li className="item">{name}</li>;
}

export default function PackingList() {
 return (
 <section>
 <h1>Sally Ride's Packing List</h1>
 <ul>
 <Item isPacked={true} name="Space suit" />
 <Item isPacked={true} name="Helmet with a golden leaf" />
 <Item isPacked={false} name="Photo of Tam" />
 </ul>
 </section>
 );
}
```

## Conditionally render `Item`

- ✅ item if its isPacked prop is `true`

```ts
function Item({ name, isPacked }) {
 if (isPacked) {
 return <li className="item">{name} ✅</li>;
 }
 return <li className="item">{name}</li>;
}
```

- returning nothing with `null`

```ts
function Item({ name, isPacked }) {
 if (isPacked) {
 return null;
 }
 return <li className="item">{name}</li>;
}
```

> [!WARNING]
> Returning `null` is rare and not recommended as the result of using null may surprise developers

## With logical `&&` operator

```ts
function Item({ name, isPacked }) {
 return (
 <li className="item">
 {name} {isPacked && "✅"}
 </li>
 );
}
```

> [!WARNING]
>
> - The LHS of `&&` cannot be a number
> - `0 && <p>New Messages</p>` is not a uplifting expression cuz `React` would just render `0`.
> - You need to ensure that the RHS is a boolean expression.
