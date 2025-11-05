---
categories:
- Frontend
- Typescript
createdAt: '2024-05-27'
description: '- Remember when writing the callback function for `onClick`, the `MouseEvent`
 should be the `React''s type` instead of the `vanilla javascript` one'
tags:
- Web
- Typescript
- JavaScript
- Development
- Frontend
title: Common Mistakes
---

# Common Mistakes


# Here are some common mistakes that I made when writing typescript

## Type of MouseEvent

- Remember when writing the callback function for `onClick`, the `MouseEvent` should be the `React's type` instead of the `vanilla javascript` one

```tsx
const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
 e.preventDefault();
 cartContext?.addToCart({ product: item, quantity });
};
```

## How to add fade-in animation when items are scrolled into view

- use `observer` and the `IntersectionObserver`

```tsx
const MyItem() = () => {
 const observer = new IntersectionObserver(entries => {
 entries.map(entry => {
 entry.isIntersecting()
? entry.target.classList.add("animate-fade-up")
: entry.target.classList.remove("animate-fade-up")
 })
 })

 return (
 <div
 className="w-full h-full"
 ref={(node) => {
 node && observer.observe(node) // observe and make add/remove animation when the item is scrolled into/out of view
 }}
 >
 <div className="grid grid-cols-3">
 here is my item
 </div>
 </div>
 )
}

```

## How to create a swipe-to-delete row

- use `onPointerDown`
- get pointer's `x` movement and calculate how long it drags

```tsx
const ProductRow: React.FC<Prop> = ({ item }) => {
 // for calculating swiping position
 let downX: number;
 let fromX = 0;

 // when delete button is clicked
 const onClick = () => {
 cartContext.removeFromCart(item.product.id);
 };

 // handle pointer move (for showing delete button in small screen)
 const onPointerMove = (e: PointerEvent) => {
 const newX = e.clientX;
 if (rowRef && rowRef.current) {
 // move along with the pointer
 let toX = fromX + (newX - downX) * 2;
 if (toX <= -80) {
 toX = -80;
 } else if (toX >= 0) {
 toX = 0;
 }
 rowRef.current.style.transform = `translate(${toX}px)`;

 // sleep for a while and show/hide the delete button
 setTimeout(() => {
 if (toX < -20) {
 toX = -80;
 } else {
 toX = 0;
 }
 if (rowRef.current) {
 rowRef.current.style.transform = `translate(${toX}px)`;
 }
 }, 100);

 fromX = toX;
 }
 };

 return (
 <tr
 className="mb-4 h-32 transition-all duration-700 ease-in-out cursor-pointer relative"
 ref={rowRef}
 // when pointer
 onPointerDown={(e) => {
 downX = e.clientX;
 rowRef.current?.addEventListener("pointermove", onPointerMove);
 }}
 >
... <!-- More columns here-->
 <td
 // one extra column that to the right of the original row to show the delete button
 className="w-20 h-full bg-red-500 absolute right-0 text-white flex items-center justify-center hover:bg-red-300 translate-x-20"
 onClick={onClick}
 >
 
 </td>
 </tr>
 );
};
```