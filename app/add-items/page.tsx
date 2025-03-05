"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { addItem } from "@/lib/api"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Upload } from "lucide-react"

export default function AddItemPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [img, setImg] = useState("./img/placeholder.svg?height=300&width=300")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {                   // Check file size (limit to 5MB)
      setError("Image size should be less than 5MB")
      return
    }

    if (!file.type.startsWith("image/")) {                 // Check file type
      setError("Please upload an image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setImagePreview(result)
      setImg(result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // =================             Enhanced validation to check image, name, price
    if (!name.trim()) {
      setError("Name is required")
      return
    }

    if (!price.trim()) {
      setError("Price is required")
      return
    }

    if (isNaN(Number.parseFloat(price))) {
      setError("Price must be a valid number")
      return
    }

    if (Number.parseFloat(price) <= 0) {
      setError("Price must be greater than zero")
      return
    }

    if (!imagePreview && img === "./img/placeholder.svg?height=300&width=300") {
      setError("Please upload an image for the item")
      return
    }

    try {
      setIsSubmitting(true)
      await addItem({ name, price, img })
      router.push("/items")
      router.refresh()
    } catch (err) {
      setError("Failed to add item. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Item</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Item Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter item name"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Item Image</label>

          <div className="mt-1 flex flex-col items-center">
            <div className="mb-4 relative h-48 w-full border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center overflow-hidden">
              {imagePreview ? (
                <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
              ) : (
                <div className="text-center p-4">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-500">Click to upload an image</p>
                </div>
              )}
            </div>

            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />

            <Button type="button" variant="outline" onClick={triggerFileInput} className="w-full">
              {imagePreview ? "Change Image" : "Upload Image"}
            </Button>
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Item"}
          </Button>
        </div>
      </form>
    </div>
  )
}
