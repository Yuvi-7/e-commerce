"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Landmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { clearCart } = useCart()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zip
    ) {
      toast.error("Please fill in all required shipping fields")
      setIsSubmitting(false)
      return
    }

    if (paymentMethod === "card" && (!formData.cardName || !formData.cardNumber || !formData.expiry || !formData.cvc)) {
      toast.error("Please fill in all required payment fields")
      setIsSubmitting(false)
      return
    }

    // Simulate order processing
    setTimeout(() => {
      clearCart()
      router.push("/thank-you")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code *</Label>
                <Input
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="Enter your ZIP code"
                  required
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="card">
                <CreditCard className="mr-2 h-4 w-4" />
                Credit Card
              </TabsTrigger>
              <TabsTrigger value="bank">
                <Landmark className="mr-2 h-4 w-4" />
                Bank Transfer
              </TabsTrigger>
            </TabsList>
            <TabsContent value="card" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card *</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  placeholder="Enter name on card"
                  required={paymentMethod === "card"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000"
                  required={paymentMethod === "card"}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date *</Label>
                  <Input
                    id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    required={paymentMethod === "card"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC *</Label>
                  <Input
                    id="cvc"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange}
                    placeholder="CVC"
                    required={paymentMethod === "card"}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="bank" className="space-y-4 mt-4">
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm font-medium">Bank Transfer Details</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Please use the following details to make a bank transfer:
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Bank Name:</span>
                    <span className="text-sm">NextBank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Account Name:</span>
                    <span className="text-sm">NextShop Inc.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Account Number:</span>
                    <span className="text-sm">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Routing Number:</span>
                    <span className="text-sm">987654321</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Please include your order number in the transfer reference.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="standard" value={shippingMethod} onValueChange={setShippingMethod}>
            <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="font-normal">
                  Standard Shipping (3-5 business days)
                </Label>
              </div>
              <span>$10.00</span>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="font-normal">
                  Express Shipping (1-2 business days)
                </Label>
              </div>
              <span>$25.00</span>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Place Order"}
      </Button>
    </form>
  )
}
