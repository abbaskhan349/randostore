"use client"

import type { Item } from "@/types/item"
import { Button } from "@/components/ui/button"
import { addToCart } from "@/lib/cart"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

interface ItemCardProps {
  item: Item
}

export default function ItemCard({ item }: ItemCardProps) {
  const handleAddToCart = () => {
    addToCart(item)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="relative h-48 w-full">
        <Image src={item.img || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600 mt-1">${item.price}</p>
        <Button onClick={handleAddToCart} className="mt-3 w-full">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  )
}

