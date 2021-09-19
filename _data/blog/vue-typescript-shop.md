---
template: BlogPost
type: experiment
path: /vue3-typescript-shop
date: 2021-09-19T16:28:00.000Z
title: Vue, Vuex and Typescript
metaDescription: Vue 3 with Typescript, Vuex, and Testing Library
thumbnail: https://res.cloudinary.com/pastelitos/image/upload/v1632062809/bruno/vue3-typescript-vuex.png
---
# Description

A project made with [Vue 3](https://v3.vuejs.org/), [Vuex 4](https://next.vuex.vuejs.org/), and [Typescript](https://www.typescriptlang.org).

Heavy use of new features as composition API, composable functions, and portals.

Unit testing with [Vue Testing Library](https://testing-library.com/docs/vue-testing-library/intro/).


# Online shop

The app runs a online shop which sells 3 products.

The current prices of the products are the following:

```
Code         | Name         |  Price
---------------------------------------
CAP          | Cap          |   5.00€
TSHIRT       | T-Shirt      |  20.00€
MUG          | Coffee Mug   |   7.50€
```

The shop offering these discounts:

- **2-for-1 promotions**: Buy two of the same product, get one free, applied to CAP items.
- **Bulk discounts**: Buying 3 or more of TSHIRT product, the price of that product is reduced 5%. E.g., if you buy 3 or more TSHIRT items, the price per unit should be 19.00€.

# See in action

Buy some mock products.

[https://shop-vue3-typescript-vuex.netlify.app](https://shop-vue3-typescript-vuex.netlify.app)

# Github

Check out the source code.

[https://github.com/brunogarcia/vue3-shop](https://github.com/brunogarcia/vue3-shop)
