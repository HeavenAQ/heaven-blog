---
categories:
- Frontend
- React
createdAt: '2024-05-27'
description: '- Create a folder named `contexts` in the `src` folder.'
tags:
- Web
- JavaScript
- React
- Development
- Frontend
title: How to use useContext correctly in React
---

# How to use useContext correctly in React


## File Path

- Create a folder named `contexts` in the `src` folder.

```bash
.
 src
 App.tsx
 api
 components
 *contexts
 CartContext.tsx
```

## Create a context

- Create a new file named `CartContext.tsx` in the `contexts` folder.

```tsx
import { createContext, useContext, useState, useEffect } from 'react';

// define a interface for cart item (or import it from else where)
interface CartItem {
 id: number;
 name: string;
 quantity: number;
}

// define a context type for creating cart context
interface CartContextType {
 cart: CartItem[]
 addCartItem: (item: CartItem) => void
}

// create context (Initially, this would be null since it will be initialized in the provider function)
// WARNING: DO NOT export this since other file will use `useCart` to access this context
const CartContext = createContext<CartContextType|null>(null)

export const useCart = () => {
 const cartContext = useContext(CartContext)
 if (cartContext === null) {
 throw new Error("useCart must be used under provider")
 }
 return cartContext
}

// An interface that allows React.ReactNode to be passed inside context provider
interface CartProviderProps {
 children: React.ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
 const [cart, setCart] = useState<CartItem[]>(() => {
 // try to get item from localStorage
 const prevCart = localStorage.getItem('cart')
 return prevCart? JSON.parse(prevCart): []
 })

 // update cart in localStorage if it gets updated
 useEffect(() => {
 // remember things is localStorage should be a string
 localStorage.setItem('cart', JSON.stringify(cart))
 }, [cart])

 const addCartItem = (item: CartItem) => {
 // Remember the value of cart can be accessed as setCart's argument
 setCart(prevItem => [...prevItem, item])
 }

 return (
 // remember to passed and destruct them into value
 // Do not pass the data and methods as props directly
 <CartContext.Provider value={{
 cart,
 addCartItem
 }}>
 {children}
 <CartContext.Provider>
 )
}
```