import { ShopLayout } from "@/components/layouts/shop-layout"

export default function AboutPage() {
  return (
    <ShopLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-lg mb-4">
              Welcome to eShop, your one-stop destination for high-quality products at affordable prices. We started
              our journey in 2020 with a simple mission: to provide customers with exceptional products and an
              outstanding shopping experience.
            </p>
            <p className="text-lg mb-4">
              Our team is dedicated to curating a selection of products that meet our high standards for quality,
              functionality, and value. We believe that shopping should be easy, enjoyable, and accessible to everyone.
            </p>
            <p className="text-lg">
              At eShop, we're not just selling products; we're building relationships with our customers. Your
              satisfaction is our top priority, and we're constantly working to improve our offerings and services based
              on your feedback.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/images/about/store-front.jpg"
              alt="About Us - eShop Store"
              className="rounded-lg shadow-md"
              width={600}
              height={400}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Quality</h3>
            <p>
              We carefully select each product in our inventory to ensure it meets our high standards for durability,
              functionality, and design.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Customer Service</h3>
            <p>
              We believe in building lasting relationships with our customers through responsive, helpful, and friendly
              service.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p>
              We're constantly looking for new products and technologies that can improve our customers' lives and
              shopping experience.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Priya Sharma",
              position: "CEO & Founder",
              image: "/images/team/priya-sharma.jpg",
            },
            {
              name: "Amit Patel",
              position: "CTO",
              image: "/images/team/amit-patel.jpg",
            },
            {
              name: "Neha Gupta",
              position: "Head of Marketing",
              image: "/images/team/neha-gupta.jpg",
            },
            {
              name: "Vikram Singh",
              position: "Customer Service Manager",
              image: "/images/team/vikram-singh.jpg",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="rounded-full mx-auto mb-4 w-[150px] h-[150px] object-cover border-2 border-muted shadow-lg"
                width={150}
                height={150}
              />
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-muted-foreground">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </ShopLayout>
  )
}
