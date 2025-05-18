import { OrdersTable } from "@/components/admin/orders-table"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>
      <OrdersTable />
    </div>
  )
}
