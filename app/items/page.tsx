import { getItems } from "@/lib/api"
import ItemCard from "@/components/ItemCard"

export default async function ItemsPage() {
  const items = await getItems()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Browse Items</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 my-12">No items available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
