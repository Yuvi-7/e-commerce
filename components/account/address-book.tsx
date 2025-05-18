"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

export function AddressBook() {
  // Dummy address data
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      name: "John Doe",
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "San Francisco",
      state: "CA",
      postalCode: "94103",
      country: "United States",
      phone: "(555) 123-4567",
      isDefault: true,
    },
    {
      id: "2",
      name: "John Doe",
      line1: "456 Market Street",
      line2: "",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "United States",
      phone: "(555) 987-6543",
      isDefault: false,
    },
  ])

  const handleDelete = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id))
    toast.success("Address deleted successfully")
  }

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    )
    toast.success("Default address updated")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Addresses</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card key={address.id}>
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
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(address.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
              {!address.isDefault && (
                <Button variant="ghost" size="sm" onClick={() => handleSetDefault(address.id)}>
                  Set as Default
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
