import { ShopLayout } from "@/components/layouts/shop-layout"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"

export default function ContactPage() {
  return (
    <ShopLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </ShopLayout>
  )
}
