// import type { Item } from "@/types/item"

// const API_URL = "http://localhost:3000"

// export async function getItems(): Promise<Item[]> {
//   const response = await fetch(`${API_URL}/items`, { cache: "no-store" })

//   if (!response.ok) {
//     throw new Error("Failed to fetch items")
//   }

//   return response.json()
// }

// export async function getItem(id: number): Promise<Item> {
//   const response = await fetch(`${API_URL}/items/${id}`, { cache: "no-store" })

//   if (!response.ok) {
//     throw new Error("Failed to fetch item")
//   }

//   return response.json()
// }

// export async function addItem(item: Omit<Item, "id">): Promise<Item> {
//   const response = await fetch(`${API_URL}/items`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(item),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to add item")
//   }

//   return response.json()
// }

// export async function deleteItem(id: number): Promise<void> {
//   const response = await fetch(`${API_URL}/items/${id}`, {
//     method: "DELETE",
//   })

//   if (!response.ok) {
//     throw new Error("Failed to delete item")
//   }
// }



import type { Item } from "@/types/item"

const API_URL = "http://localhost:3000"

export async function getItems(): Promise<Item[]> {
  const response = await fetch(`${API_URL}/items`, {
    cache: "no-store",
    next: { revalidate: 0 }, // Ensure we always get fresh data
  })

  if (!response.ok) {
    throw new Error("Failed to fetch items")
  }

  return response.json()
}

export async function getItem(id: number): Promise<Item> {
  const response = await fetch(`${API_URL}/items/${id}`, {
    cache: "no-store",
    next: { revalidate: 0 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch item")
  }

  return response.json()
}

export async function addItem(item: Omit<Item, "id">): Promise<Item> {
  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })

  if (!response.ok) {
    throw new Error("Failed to add item")
  }

  return response.json()
}

export async function deleteItem(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete item")
  }
}
