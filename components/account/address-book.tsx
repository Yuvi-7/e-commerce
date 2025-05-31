"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Plus, Trash2, Package } from "lucide-react"
import { toast } from "sonner"
import { AddressFormDialog } from "./address-form-dialog"
import Link from "next/link"

interface Address {
  _id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try {
      const response = await fetch("/api/addresses")
      if (!response.ok) throw new Error("Failed to fetch addresses")
      const data = await response.json()
      setAddresses(data)
    } catch (error) {
      console.error("Error fetching addresses:", error)
      toast.error("Failed to load addresses")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/addresses/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete address")
      setAddresses(addresses.filter((address) => address._id !== id))
      toast.success("Address deleted successfully")
    } catch (error) {
      console.error("Error deleting address:", error)
      toast.error("Failed to delete address")
    }
  }

  const handleSetDefault = async (id: string) => {
    try {
      const response = await fetch(`/api/addresses/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDefault: true }),
      })
      if (!response.ok) throw new Error("Failed to update address")
      setAddresses(
        addresses.map((address) => ({
          ...address,
          isDefault: address._id === id,
        })),
      )
      toast.success("Default address updated")
    } catch (error) {
      console.error("Error updating address:", error)
      toast.error("Failed to update default address")
    }
  }

  if (loading) {
    return <div>Loading addresses...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Addresses</h2>
        <AddressFormDialog onAddressAdded={fetchAddresses} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card key={address._id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                {address.name}
                {address.isDefault && (
                  <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
                <p className="pt-1">{address.phone}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleDelete(address._id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/account/orders">
                    <Package className="mr-2 h-4 w-4" />
                    View Orders
                  </Link>
                </Button>
              </div>
              {!address.isDefault && (
                <Button variant="ghost" size="sm" onClick={() => handleSetDefault(address._id)}>
                  Set as Default
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="text-center py-6">
          <p className="text-muted-foreground">You haven't added any addresses yet.</p>
        </div>
      )}
    </div>
  )
}
