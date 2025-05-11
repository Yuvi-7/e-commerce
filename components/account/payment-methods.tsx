"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

export function PaymentMethods() {
  // Dummy payment methods data
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "1",
      type: "Credit Card",
      brand: "Visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    },
    {
      id: "2",
      type: "Credit Card",
      brand: "Mastercard",
      last4: "5555",
      expMonth: 8,
      expYear: 2026,
      isDefault: false,
    },
  ])

  const handleDelete = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
    toast.success("Payment method deleted successfully")
  }

  const handleSetDefault = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
    toast.success("Default payment method updated")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Payment Methods</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                {method.brand} •••• {method.last4}
                {method.isDefault && (
                  <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p>
                  Expires {method.expMonth}/{method.expYear}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(method.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
              {!method.isDefault && (
                <Button variant="ghost" size="sm" onClick={() => handleSetDefault(method.id)}>
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
