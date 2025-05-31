"use client"

import { useState, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useRouter, useSearchParams } from "next/navigation"

export type FilterState = {
  priceRange: [number, number]
  categories: string[]
  brands: string[]
  ratings: string[]
}

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize state from URL params
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 1000,
  ])
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",").filter(Boolean) || []
  )
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get("brands")?.split(",").filter(Boolean) || []
  )
  
  const [selectedRatings, setSelectedRatings] = useState<string[]>(
    searchParams.get("ratings")?.split(",").filter(Boolean) || []
  )

  // Categories from our real data
  const categories = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
    { id: "3", name: "Home & Kitchen" },
    { id: "4", name: "Sports & Outdoors" },
    { id: "5", name: "Furniture" },
  ]

  // Extract unique brands from our product data
  const brands = [
    { id: "apple", name: "Apple" },
    { id: "samsung", name: "Samsung" },
    { id: "sony", name: "Sony" },
    { id: "nike", name: "Nike" },
    { id: "adidas", name: "Adidas" },
  ]

  const ratings = [
    { id: "5", name: "5 Stars" },
    { id: "4", name: "4 Stars & Up" },
    { id: "3", name: "3 Stars & Up" },
    { id: "2", name: "2 Stars & Up" },
    { id: "1", name: "1 Star & Up" },
  ]

  // Update URL with current filter state
  const updateUrl = useCallback((newFilters: Partial<FilterState>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Update price range
    if (newFilters.priceRange) {
      params.set("minPrice", newFilters.priceRange[0].toString())
      params.set("maxPrice", newFilters.priceRange[1].toString())
    }
    
    // Update categories
    if (newFilters.categories) {
      if (newFilters.categories.length > 0) {
        params.set("categories", newFilters.categories.join(","))
      } else {
        params.delete("categories")
      }
    }
    
    // Update brands
    if (newFilters.brands) {
      if (newFilters.brands.length > 0) {
        params.set("brands", newFilters.brands.join(","))
      } else {
        params.delete("brands")
      }
    }
    
    // Update ratings
    if (newFilters.ratings) {
      if (newFilters.ratings.length > 0) {
        params.set("ratings", newFilters.ratings.join(","))
      } else {
        params.delete("ratings")
      }
    }
    
    router.push(`?${params.toString()}`)
  }, [searchParams, router])

  // Handle filter changes
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value)
    updateUrl({ priceRange: value })
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter(id => id !== categoryId)
    setSelectedCategories(newCategories)
    updateUrl({ categories: newCategories })
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    const newBrands = checked
      ? [...selectedBrands, brandId]
      : selectedBrands.filter(id => id !== brandId)
    setSelectedBrands(newBrands)
    updateUrl({ brands: newBrands })
  }

  const handleRatingChange = (ratingId: string, checked: boolean) => {
    const newRatings = checked
      ? [...selectedRatings, ratingId]
      : selectedRatings.filter(id => id !== ratingId)
    setSelectedRatings(newRatings)
    updateUrl({ ratings: newRatings })
  }

  const clearAllFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedRatings([])
    router.push(window.location.pathname)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={clearAllFilters}
        >
          Clear All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["price", "categories", "brands"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider 
                defaultValue={[0, 1000]} 
                max={1000} 
                step={10} 
                value={priceRange} 
                onValueChange={handlePriceChange}
              />
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={(checked) => 
                      handleBrandChange(brand.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`brand-${brand.id}`}>{brand.name}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ratings">
          <AccordionTrigger>Ratings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`rating-${rating.id}`}
                    checked={selectedRatings.includes(rating.id)}
                    onCheckedChange={(checked) => 
                      handleRatingChange(rating.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`rating-${rating.id}`}>{rating.name}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
