"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="container px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">Contact Us</h1>
          <p className="text-gray-600 md:text-xl max-w-2xl mx-auto">
            Reach out to our team via email. We'd love to hear from you!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 rounded-full bg-blue-50">
                  <Mail className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="font-bold">Email Us</h3>
                <p className="text-sm text-gray-600">For research inquiries and collaborations:</p>
              </div>

              <div className="space-y-2 text-center">
                <a href="mailto:jana.ayoub@mail.aub.edu" className="text-blue-700 hover:underline block">
                  jaa102@mail.aub.edu
                </a>
                <a href="mailto:tamara.fakih@mail.aub.edu" className="text-blue-700 hover:underline block">
                  tmf14@mail.aub.edu
                </a>
                <a href="mailto:tia.tarabay@mail.aub.edu" className="text-blue-700 hover:underline block">
                  twt00@mail.aub.edu
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
