import { ShopLayout } from "@/components/layouts/shop-layout"
import { AccountTabs } from "@/components/account/account-tabs"

export default function AccountPage() {
  return (
    <ShopLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        <AccountTabs />
      </div>
    </ShopLayout>
  )
}
