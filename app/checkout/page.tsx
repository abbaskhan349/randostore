"use client"

import { useEffect, useState } from "react"
import { type CartItem, getCart, getCartTotal, updateCartItemQuantity, removeFromCart, clearCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Trash2, MinusCircle, PlusCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setCartItems(getCart())
    setTotal(getCartTotal())

    const handleCartUpdate = () => {
      setCartItems(getCart())
      setTotal(getCartTotal())
    }

    window.addEventListener("cart-updated", handleCartUpdate)
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate)
    }
  }, [])

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    updateCartItemQuantity(itemId, newQuantity)
  }

  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId)
  }

  const handleCheckout = () => {
    alert("Thank you for your purchase!")
    clearCart()
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-500 mb-6">Your cart is empty.</p>
        <Link href="/items">
          <Button>Browse Items</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-4">Item</th>
                <th className="text-center pb-4">Price</th>
                <th className="text-center pb-4">Quantity</th>
                <th className="text-right pb-4">Subtotal</th>
                <th className="text-right pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="relative h-16 w-16 mr-4">
                        <Image
                          src={item.img || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="text-center py-4">${item.price}</td>
                  <td className="text-center py-4">
                    <div className="flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <MinusCircle size={18} />
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <PlusCircle size={18} />
                      </Button>
                    </div>
                  </td>
                  <td className="text-right py-4">${(Number.parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                  <td className="text-right py-4">
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                      <Trash2 size={18} className="text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-between items-center">
            <div>
              <Button variant="outline" onClick={() => clearCart()}>
                Clear Cart
              </Button>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold mb-2">Total: ${total.toFixed(2)}</p>
              <Button onClick={handleCheckout}>Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

