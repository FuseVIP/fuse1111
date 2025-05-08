"use client"

import type React from "react"

import { useState } from "react"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedSection } from "@/components/animated-section"
import { Save, X } from "lucide-react"

interface BusinessFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function BusinessForm({ initialData, onSubmit, onCancel }: BusinessFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    business_address: initialData?.business_address || "",
    contact_phone: initialData?.contact_phone || "",
    contact_email: initialData?.contact_email || "",
    contact_name: initialData?.contact_name || "",
    website: initialData?.website || "",
    logo_url: initialData?.logo_url || "",
    premium_discount: initialData?.premium_discount || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const categories = [
    "Retail",
    "Food & Beverage",
    "Healthcare",
    "Technology",
    "Finance",
    "Education",
    "Entertainment",
    "Hospitality",
    "Manufacturing",
    "Real Estate",
    "Other",
  ]

  return (
    <AnimatedSection>
      <AnimatedCard className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">{initialData ? "Edit Business" : "Register Your Business"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF]"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF]"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Business Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF]"
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="business_address" className="block text-sm font-medium text-gray-700 mb-1">
              Business Address *
            </label>
            <input
              type="text"
              id="business_address"
              name="business_address"
              value={formData.business_address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="contact_name" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Name *
              </label>
              <input
                type="text"
                id="contact_name"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF]"
              />
            </div>
            <div>
              <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone *
              </label>
              <input
                type="tel"
                id="contact_phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF]"
              />
            </div>
            <div>
              <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email *
              </label>
              <input
                type="email"
                id="contact_email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF]"
              />
            </div>
            <div>
              <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                type="url"
                id="logo_url"
                name="logo_url"
                value={formData.logo_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF]"
              />
            </div>
            <div>
              <label htmlFor="premium_discount" className="block text-sm font-medium text-gray-700 mb-1">
                Premium Discount (%)
              </label>
              <input
                type="number"
                id="premium_discount"
                name="premium_discount"
                value={formData.premium_discount}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A56FF]"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 flex items-center"
            >
              <X className="h-4 w-4 mr-2" /> Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-[#3A56FF] text-white rounded-md flex items-center">
              <Save className="h-4 w-4 mr-2" /> {initialData ? "Update" : "Register"}
            </button>
          </div>
        </form>
      </AnimatedCard>
    </AnimatedSection>
  )
}
