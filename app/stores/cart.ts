import { defineStore } from 'pinia'
import type { CartItem } from '../../shared/types/cart.types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as CartItem[],
  }),

  getters: {
    itemCount: (state): number => {
      return state.cartItems.reduce((count, item) => count + item.quantity, 0)
    },
    totalPrice: (state): number => {
      return state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      )
    },
    isInCart: (state) => {
      return (productId: string): boolean =>
        state.cartItems.some(item => item.id === productId)
    },
  },

  actions: {
    addToCart(product: Omit<CartItem, 'quantity'>) {
      const existingItem = this.cartItems.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      }
      else {
        this.cartItems.push({ ...product, quantity: 1 })
      }
    },

    removeFromCart(productId: string) {
      const index = this.cartItems.findIndex(item => item.id === productId)
      if (index !== -1) {
        this.cartItems.splice(index, 1)
      }
    },

    updateQuantity(productId: string, quantity: number) {
      if (quantity < 1) {
        return
      }
      const item = this.cartItems.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },

    clearCart() {
      this.cartItems = []
    },
  },

  persist: true,
})
