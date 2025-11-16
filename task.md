# Cart Feature Implementation Plan

This document outlines the tasks required to implement the shopping cart feature for the Evergreen Plant Nursery website. The goal is to create a seamless, non-user-account-based cart experience using Pinia for state management, with data persisted in `localStorage`.

## 1. Project Setup & Pinia Configuration

- [ ] **Install Pinia and Persistence Plugin:** Add Pinia and `pinia-plugin-persistedstate` to the project to manage and save the cart state.
  ```bash
  pnpm add pinia @pinia/nuxt pinia-plugin-persistedstate
  ```

- [ ] **Configure Nuxt:** Update `nuxt.config.ts` to include the Pinia module.
  ```typescript
  export default defineNuxtConfig({
    modules: [
      '@pinia/nuxt',
      // ... other modules
    ],
  })
  ```

- [ ] **Create Pinia Plugin for Persistence:** Create a file `plugins/pinia.ts` to register the persistence plugin with Pinia.
  ```typescript
  import { defineNuxtPlugin } from '#app'
  import { createPinia } from 'pinia'
  import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

  export default defineNuxtPlugin((nuxtApp) => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    nuxtApp.vueApp.use(pinia)
  })
  ```

## 2. Cart Store Implementation

- [ ] **Define Types:** Create a `types/product.ts` file to define the structure for `Product` and `CartItem`.
  ```typescript
  // types/product.ts
  export interface Product {
    id: string;
    name: string;
    price: number;
    image: string; // URL to the image
    // Add other relevant product fields
  }

  export interface CartItem extends Product {
    quantity: number;
  }
  ```

- [ ] **Create Cart Store:** Create a new file `store/cart.ts` to manage the cart's state and actions.
  - [ ] **State:** Define the state with a `cartItems` array.
  - [ ] **Getters:**
    - `itemCount`: Calculates the total number of items in the cart.
    - `totalPrice`: Calculates the total price of all items.
    - `isInCart(productId)`: A function to check if a product is already in the cart.
  - [ ] **Actions:**
    - `addToCart(product)`: Adds a product to the cart or increments its quantity if it already exists.
    - `removeFromCart(productId)`: Removes an item completely from the cart.
    - `updateQuantity(productId, quantity)`: Updates the quantity of a specific item. Ensures quantity is at least 1.
    - `clearCart()`: Empties the cart.
  - [ ] **Enable Persistence:** Configure the store to use `localStorage` for persistence.

## 3. UI Integration

- [ ] **Product Components:**
  - [ ] On the product listing page and individual product pages, add an "Add to Cart" button (`UButton`).
  - [ ] The button's click handler should call the `addToCart` action from the Pinia store.
  - [ ] Provide visual feedback when an item is added (e.g., show a toast notification using Nuxt UI's `useToast`).

- [ ] **Navigation Bar:**
  - [ ] The cart icon in the main navigation (`components/layout/Header.vue` or similar) should navigate to the `/cart` page.
  - [ ] Display a badge (`UBadge`) on the cart icon showing the `itemCount` from the cart store. This should update in real-time.

## 4. Cart Page (`/cart`)

- [ ] **Create Page:** Create a new page file at `pages/cart.vue`.

- [ ] **Empty Cart View:**
  - [ ] If `itemCount` is 0, display a message like "Your cart is empty."
  - [ ] Use a `UCard` or `UAlert` component for the message.
  - [ ] Include a `UButton` that links back to the main products page.

- [ ] **Cart Items List:**
  - [ ] If the cart has items, loop through `cartItems` and display them.
  - [ ] Use a `UCard` for each item or a `UTable` to list all items.
  - [ ] For each item, display:
    - Product image (`UAvatar` or `img` tag).
    - Product name and price.
    - Quantity controls: A `UInput` of type number or `+` and `-` `UButton`s to call the `updateQuantity` action.
    - A "Remove" `UButton` (with a trash icon) to call the `removeFromCart` action.

- [ ] **Cart Summary:**
  - [ ] Display a summary section on the page (e.g., in a separate `UCard`).
  - [ ] Show the subtotal (`totalPrice` getter).
  - [ ] Add a placeholder for future delivery cost calculation.
  - [ ] Display the final total.
  - [ ] Support adding or removing quantity of items in the cart.
  - [ ] support removing items from the cart.

- [ ] **Checkout Action:**
  - [ ] Add a "Checkout" `UButton` that is prominent.
  - [ ] Add a checkout form with name, phone number, location (dropdown of supported location), email (optional), payment method (upload payment proof or pay later), prefered contact method (where to reach out if needed, whatsapp, tiktok, etc)
  - [ ] when payment proof is selected it should show an image of a QR code which they can use to pay and then have an image upload field for the screenshot of their payment
  
- [ ] **Order API**
  - [ ] create nuxt API to handle an order submission, should validate the user input and show appropriate error messages
  - [ ] the order should be created as a pocketbase collection with the right data

## 5. Styling and User Experience

- [ ] **Responsiveness:** Ensure the cart page is mobile-first and looks good on all screen sizes, adhering to the PRD's requirement for older users (clear layout, large touch targets).
- [ ] **Component Usage:** Strictly use Nuxt UI components for buttons, cards, inputs, etc., to maintain a consistent design.
- [ ] **Custom Styling:** Use Tailwind CSS utility classes for any custom styling needs.
- [ ] **User Feedback:** Implement toast notifications (`useToast`) for actions like adding, updating, or removing items from the cart to provide clear feedback to the user.
