"use client"
import { useState, useEffect, useCallback } from "react"
import { getItems } from "@/lib/api"
import ItemCard from "@/components/ItemCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SortAsc, SortDesc } from "lucide-react"

export default function ItemsPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null)

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getItems()
      setItems(data)
    } catch (error) {
      console.error("Failed to fetch items:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItems()
    const intervalId = setInterval(fetchItems, 30000)

    return () => clearInterval(intervalId)
  }, [fetchItems])

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortOrder) return 0

    const priceA = Number.parseFloat(a.price)
    const priceB = Number.parseFloat(b.price)

    return sortOrder === "asc" ? priceA - priceB : priceB - priceA
  })

  const toggleSort = () => {
    if (sortOrder === null) setSortOrder("asc")
    else if (sortOrder === "asc") setSortOrder("desc")
    else setSortOrder(null)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Browse Items</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button variant="outline" onClick={toggleSort} className="flex items-center gap-2">
          {sortOrder === "asc" ? (
            <>
              <SortAsc size={18} /> Price: Low to High
            </>
          ) : sortOrder === "desc" ? (
            <>
              <SortDesc size={18} /> Price: High to Low
            </>
          ) : (
            <>Sort by Price</>
          )}
        </Button>

        <Button onClick={fetchItems} variant="outline">
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : sortedItems.length === 0 ? (
        <p className="text-center text-gray-500 my-12">
          {searchTerm ? "No items match your search." : "No items available."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
