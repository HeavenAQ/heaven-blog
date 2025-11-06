---
categories:
- Frontend
- React
createdAt: '2025-08-06'
description: '- Under the hood, JSX is transformed into plain JavaScript objectcs
 and you can''t return two objects from a function without wrapping them into an
 arr...'
tags:
- Web
- JavaScript
- React
- Development
- Frontend
title: Heads-up
---

# Heads-up

## Why do multiple JSX tags need to be wrapped

- Under the hood, JSX is transformed into plain JavaScript objectcs and you can't return two objects from a function without wrapping them into an array

## Using "double curlies": CSS and other objects in JSX

```ts
export default function TodoList() {
 return (
 <ul style={{
 backgroundColor: 'black',
 color: 'pink'
 }}
...
 </ul>
 )
}

```
