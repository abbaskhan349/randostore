import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, PlusCircle, ShoppingCart } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to RandoStore</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Your one-stop shop for random items! Browse our collection, add your own items, or check out what's in your
        cart.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        <Link href="/items" className="w-full">
          <Button variant="outline" className="w-full h-32 flex flex-col gap-2">
            <ShoppingBag size={24} />
            <span>Browse Items</span>
          </Button>
        </Link>

        <Link href="/add-items" className="w-full">
          <Button variant="outline" className="w-full h-32 flex flex-col gap-2">
            <PlusCircle size={24} />
            <span>Add New Item</span>
          </Button>
        </Link>

        <Link href="/checkout" className="w-full">
          <Button variant="outline" className="w-full h-32 flex flex-col gap-2">
            <ShoppingCart size={24} />
            <span>View Cart</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

