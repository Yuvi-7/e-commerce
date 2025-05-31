import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <MapPin className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Our Location</h3>
              <p className="text-muted-foreground">
                42/A, Senapati Marg,
                <br />
                Ground Floor, 42/A,
                <br />
                Saket, New Delhi - 110030
                <br />
                India
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Phone className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <p className="text-muted-foreground">
                Customer Service: +91 1800 123 4567
                <br />
                Sales Inquiries: +91 1800 765 4321
                <br />
                Support: +91 1800 987 6543
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Mail className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-muted-foreground">
                Customer Service: support@eshop.in
                <br />
                Sales Inquiries: sales@eshop.in
                <br />
                General Information: info@eshop.in
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Monday - Friday:</span>
            <span>10:00 AM - 7:00 PM IST</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday:</span>
            <span>10:00 AM - 5:00 PM IST</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday:</span>
            <span>Closed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
