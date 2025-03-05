"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ShoppingCart } from "lucide-react"
import { getCartItemCount } from "@/lib/cart"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setCartCount(getCartItemCount())

    const handleCartUpdate = () => {
      setCartCount(getCartItemCount())
    }

    window.addEventListener("cart-updated", handleCartUpdate)
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate)
    }
  }, [])

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link href="/">RandoStore</Link>
          </div>

          <div className="flex space-x-6 items-center">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/items" className="hover:underline">
              Items
            </Link>
            <Link href="/add-items" className="hover:underline">
              Add Item
            </Link>

            <Link href="/checkout">
              <Button variant="secondary" className="flex items-center gap-2">
                <ShoppingCart size={20} />
                <span>Cart</span>
                {isMounted && cartCount > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

