import type { Item } from "@/types/item"

// Cart item with quantity
export interface CartItem extends Item {
  quantity: number
}

// Get cart from localStorage
export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return []
  }

  const cart = localStorage.getItem("cart")
  return cart ? JSON.parse(cart) : []
}

// Add item to cart
export function addToCart(item: Item): void {
  if (typeof window === "undefined") {
    return
  }

  const cart = getCart()
  const existingItem = cart.find((cartItem) => cartItem.id === item.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...item, quantity: 1 })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  // Dispatch custom event for components to listen to
  window.dispatchEvent(new Event("cart-updated"))
}

// Remove item from cart
export function removeFromCart(itemId: number): void {
  if (typeof window === "undefined") {
    return
  }

  const cart = getCart()
  const updatedCart = cart.filter((item) => item.id !== itemId)

  localStorage.setItem("cart", JSON.stringify(updatedCart))
  window.dispatchEvent(new Event("cart-updated"))
}

// Update item quantity in cart
export function updateCartItemQuantity(itemId: number, quantity: number): void {
  if (typeof window === "undefined") {
    return
  }

  const cart = getCart()
  const item = cart.find((item) => item.id === itemId)

  if (item) {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }

    item.quantity = quantity
    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cart-updated"))
  }
}

// Clear cart
export function clearCart(): void {
  if (typeof window === "undefined") {
    return
  }

  localStorage.setItem("cart", JSON.stringify([]))
  window.dispatchEvent(new Event("cart-updated"))
}

// Get cart total
export function getCartTotal(): number {
  const cart = getCart()
  return cart.reduce((total, item) => total + Number.parseFloat(item.price) * item.quantity, 0)
}

// Get cart item count
export function getCartItemCount(): number {
  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
}

