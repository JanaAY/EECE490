"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <main className="container px-4 md:px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">Contact Us</h1>
          <p className="text-gray-600 md:text-xl max-w-2xl mx-auto">
            Have questions about our research or interested in collaboration? We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 rounded-full bg-blue-50">
                  <Mail className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="font-bold">Email Us</h3>
                <p className="text-sm text-gray-600">For general inquiries and research collaboration</p>
                <a href="mailto:contact@drresearch.org" className="text-blue-700 hover:underline">
                  contact@drresearch.org
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 rounded-full bg-blue-50">
                  <Phone className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="font-bold">Call Us</h3>
                <p className="text-sm text-gray-600">Monday to Friday, 9am to 5pm EST</p>
                <a href="tel:+1-555-123-4567" className="text-blue-700 hover:underline">
                  +1 (555) 123-4567
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 rounded-full bg-blue-50">
                  <MapPin className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="font-bold">Visit Us</h3>
                <p className="text-sm text-gray-600">Research Center Location</p>
                <address className="text-sm not-italic text-gray-600">
                  123 Medical Campus Drive
                  <br />
                  Boston, MA 02115
                  <br />
                  United States
                </address>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                <h3 className="font-medium text-green-800">Message Sent Successfully!</h3>
                <p className="text-green-700 text-sm mt-1">
                  Thank you for contacting us. We'll respond to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Research Collaboration"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto bg-blue-700 hover:bg-blue-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
