"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/account/profile-form"
import { AddressBook } from "@/components/account/address-book"
import { OrderHistory } from "@/components/account/order-history"
import { PaymentMethods } from "@/components/account/payment-methods"

export function AccountTabs() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid grid-cols-4 w-full max-w-2xl">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="addresses">Addresses</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileForm />
      </TabsContent>
      <TabsContent value="orders">
        <OrderHistory />
      </TabsContent>
      <TabsContent value="addresses">
        <AddressBook />
      </TabsContent>
      <TabsContent value="payment">
        <PaymentMethods />
      </TabsContent>
    </Tabs>
  )
}
